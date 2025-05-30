"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/api/auth/register");

  const title = formData.get("title");
  const content = formData.get("content");
  const imageUrl = formData.get("imageUrl");
  const videoUrlInput = formData.get("videoUrl") as string | null;
  const sketchEmbedCode = formData.get("sketchEmbedCode") as string | null;

  // Transform Flickr video URL to proxy URL
  let videoUrl: string | null = null;
  if (videoUrlInput && videoUrlInput.includes("live.staticflickr.com/video")) {
    const match = videoUrlInput.match(
      /\/video\/([^\/]+)\/([^\/]+)\/[^\/]+\.mp4/
    );
    const videoId = match ? match[1] : null;
    const flickrHash = match ? match[2] : null;
    const queryParams = videoUrlInput.split("?")[1] || "";
    if (videoId && flickrHash) {
      videoUrl = `/api/video/video/${videoId}?hash=${flickrHash}&${queryParams}`;
      console.log("Transformed videoUrl:", videoUrl);
    } else {
      console.error("Failed to extract videoId or hash from:", videoUrlInput);
    }
  }

  // Extract iframe src from sketchEmbedCode if provided
  const sketchUrl = sketchEmbedCode
    ? extractSrcFromIframe(sketchEmbedCode)
    : null;

  // Optionally handle case where no valid sketch URL is extracted
  if (!sketchUrl && sketchEmbedCode) {
    throw new Error(
      "Invalid iframe code. Please provide a valid p5.js embed code."
    );
  }

  // Create the blog post in the database
  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: imageUrl as string,
      videoUrl, // Store the proxy URL or null
      sketchUrl: sketchUrl || "", // If no sketch, store an empty string
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  revalidatePath("/");
  return redirect("/dashboard");
}

// Extracts src="..." from the iframe HTML string
function extractSrcFromIframe(iframeCode: string): string | null {
  if (!iframeCode) return null;
  const match = iframeCode.match(/src="([^"]+)"/);
  return match ? match[1] : null;
}

export async function deletePost(postId: string) {
  const { getUser } = getKindeServerSession();
  let user;
  try {
    user = await getUser();
    console.log("User fetched for deletion:", user?.id);
  } catch (error) {
    console.error("Error fetching user in deletePost:", error);
    throw new Error("Authentication failed");
  }

  if (!user) {
    console.error("No user found for post:", postId);
    throw new Error("Unauthorized");
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    console.error("Post not found:", postId);
    throw new Error("Post not found");
  }
  if (post.authorId !== user.id) {
    console.error("User not authorized to delete post:", postId);
    throw new Error("Not authorized");
  }

  await prisma.likes.deleteMany({ where: { postId } });
  await prisma.blogPost.delete({ where: { id: postId } });

  revalidatePath("/dashboard");
}

export async function toggleLike(postId: string) {
  const { getUser } = getKindeServerSession();
  let user;
  try {
    user = await getUser();
  } catch (error) {
    console.error("Error fetching user in toggleLike:", error);
    throw new Error("Authentication failed");
  }

  if (!user) throw new Error("Unauthorized");

  const existingLike = await prisma.likes.findFirst({
    where: { userId: user.id, postId },
  });

  if (existingLike) {
    await prisma.likes.delete({ where: { id: existingLike.id } });
  } else {
    await prisma.likes.create({
      data: {
        userId: user.id,
        postId,
      },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath(`/post/${postId}`);
}
