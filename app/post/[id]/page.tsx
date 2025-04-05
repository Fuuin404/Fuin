// app/post/[id]/page.tsx
import { prisma } from "@/app/utils/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { LikeButton } from "@/components/general/LikeButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DeletePostButton from "./DeletePostButton";
import { MarkdownContent } from "@/components/general/MarkdownContent";

async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: { id },
    include: { likes: true },
  });

  if (!data) return notFound();
  return data;
}

type Params = Promise<{ id: string }>;

export default async function IdPage({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getData(id);
  console.log("Markdown content:", data.content); // Logs the content for debugging
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link
        className={buttonVariants({
          variant: "secondary",
          className: "hover:text-red-500",
        })}
        href="/dashboard"
      >
        Back to Posts
      </Link>
      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-medium tracking-tight mb-4">
          {data.title}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage || "/default-avatar.jpg"}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(data.createdAt)}
          </p>
        </div>
      </div>
      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl || "/default-image.jpg"}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <Card>
        <CardContent className="pt-6">
          <MarkdownContent content={data.content} />
          {/* Add the iframe to display the p5.js sketch */}
          {data.sketchUrl && (
            <div className="mt-6">
              <iframe
                src={data.sketchUrl}
                width="100%"
                height="500"
                frameBorder="0"
                title="p5.js Sketch"
                allow="fullscreen"
              ></iframe>
            </div>
          )}
          <div className="mt-4 flex items-center space-x-2">
            <LikeButton postId={data.id} initialLikes={data.likes} />
            {user && user.id === data.authorId && (
              <DeletePostButton postId={data.id} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
