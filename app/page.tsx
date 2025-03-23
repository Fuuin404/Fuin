import { BlogPostCard } from "@/components/general/BlogPostCard";
import { prisma } from "./utils/db";

export const revalidate = 3;

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 600));
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default function Home() {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-medium mb-4">Latest Posts</h1>

      {/* <Suspense fallback={<BlogPostsGrid />}> */}
      <BlogPosts />
      {/* </Suspense> */}
    </div>
  );
}

async function BlogPosts() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}
