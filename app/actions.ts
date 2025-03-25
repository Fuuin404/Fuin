"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/api/auth/register");

  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");

  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: url as string,
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  revalidatePath("/");
  return redirect("/dashboard");
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

  // Delete associated likes first
  await prisma.likes.deleteMany({
    where: { postId },
  });

  // Now delete the blog post
  await prisma.blogPost.delete({
    where: { id: postId },
  });

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
    where: {
      userId: user.id,
      postId: postId,
    },
  });

  if (existingLike) {
    await prisma.likes.delete({
      where: { id: existingLike.id },
    });
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
