import { BlogPostCard } from "@/components/general/BlogPostCard";
import { prisma } from "./utils/db";

export const revalidate = 3;

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 600)); // Uncomment for testing
  const data = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likes: true, // Fetch likes relation
    },
  });

  return data;
}

export default function Home() {
  return (
    <div className="mb-3">
      <h1
        className="text-2xl font-mono mb-4"
        style={{ fontFamily: "font-family: 'Lora', serif" }}
      >
        Latest Posts:
      </h1>
      {/* <Suspense fallback={<BlogPostsGrid />}> */}
      <BlogPosts />
      {/* </Suspense> */}
    </div>
  );
}

async function BlogPosts() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}
