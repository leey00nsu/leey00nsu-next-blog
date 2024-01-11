import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "../components/PostCard";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="mx-auto max-w-xl p-8 flex flex-col gap-4">
      {/* <PostTags postTags={parseTag(allPosts)} /> */}
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
