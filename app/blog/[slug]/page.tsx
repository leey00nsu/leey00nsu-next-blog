import parseImagePath from "@/lib/parseImagePath";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  return { title: post.title };
};

const mdxComponents = (url: string) => {
  return {
    Image: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <Image
        alt={props.alt ?? ""}
        width={Number(props.width ?? 0)}
        height={Number(props.height ?? 0)}
        className={props.width ? "h-auto" : "h-auto w-full"}
        src={parseImagePath(url, props.src ?? "")}
      />
    ),
  };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);
  const MDXComponents = mdxComponents(post.url);

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
      </div>
      <div className="prose prose-slate dark:prose-invert ">
        <MDXContent components={MDXComponents} />
      </div>
    </article>
  );
};

export default PostLayout;
