import { Post } from "@/.contentlayer/generated";
import parseDate from "@/app/lib/parseDate";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import parseTag from "../lib/parseTag";
import PostTags from "./PostTags";

const PostCard = (post: Post) => {
  return (
    <Link href={post.url} className="w-full hover:scale-105 transition">
      <Card className="py-4 w-full">
        <CardBody className="flex flex-col gap-2">
          <time dateTime={post.date} className="block text-xs text-gray-600">
            {parseDate(post.date)}
          </time>
          <h2 className="text-xl">{post.title}</h2>

          <h3 className="text-sm text-gray-600">{post.description}</h3>
          <PostTags postTags={parseTag([post])} />
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostCard;
