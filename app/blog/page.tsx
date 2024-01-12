"use client";

import { Pagination } from "@nextui-org/react";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { useState } from "react";
import PostCard from "../components/PostCard";

const PAGE_SIZE = 5;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const paginatedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
  );

  const totalPageLength = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-xl p-8 flex flex-col gap-4 ">
      {/* <PostTags postTags={parseTag(allPosts)} /> */}
      <h2>{posts.length}개의 글이 있습니다.</h2>
      {paginatedPosts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
      <Pagination
        classNames={{
          base: "flex justify-center",
        }}
        isCompact
        showControls
        total={totalPageLength}
        page={currentPage}
        onChange={setCurrentPage}
        initialPage={1}
      />
    </div>
  );
}
