import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "./../../components/general/BlogPostCard";

export const dynamic = "force-dynamic";

async function getData(userId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 600));
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function DashboardRoute() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const data = await getData(user.id);

  return (
    <div>
      <div className="flex items-center justify-left mb-4 gap-8">
        <h1 className="text-3xl font-medium">Your Posts</h1>
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "hover:text-red-500",
          })}
          href="/dashboard/create"
        >
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
