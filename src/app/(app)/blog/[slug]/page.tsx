import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

import "next/navigation";

import { Metadata } from "next/types";

import { getAdjacentPosts, getPostBySlug } from "@/_features/blog/actions";
import { getGlobalSettings } from "@/_features/globals/actions";
import { RichTextRenderer } from "@/cms/RichTextRenderer";
import { DetailEntityHeader } from "@/components/DetailEntityHeader";
import { Badge, Container } from "@/components/ui";
import { APP_URL } from "@/constants";
import { getMetadata } from "@/utils/getMetadata";
import { formatDate } from "@/utils/helpers";

import { TableOfContents } from "./TableOfContents";

const MID_DOT = "·";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { seo } = await getGlobalSettings();
  const { slug } = await params;
  const {
    docs: [post],
  } = await getPostBySlug({ slug });

  if (!post) {
    return {};
  }

  const title = `${post.title} - ${seo?.metaTitle}`;
  const description = post.description || "";
  const imageUrl =
    (post.featuredImage &&
      typeof post.featuredImage === "object" &&
      "url" in post.featuredImage &&
      `${APP_URL}${post.featuredImage.url}`) ||
    undefined;

  const url = `${APP_URL}/${slug}`;

  return getMetadata({
    title,
    description,
    imageUrl,
    url,
  });
}

const BlogPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const {
    docs: [post],
  } = await getPostBySlug({ slug: slug as string });

  if (!post) {
    return notFound();
  }

  const { previousPost, nextPost } = await getAdjacentPosts({
    currentPostId: post.id.toString(),
  });

  const headings = post.content?.root?.children
    .filter((node: any) => node.type === "heading")
    .map((heading: any, index: number) => heading.children[0].text);

  const featuredImageUrl =
    post.featuredImage &&
    typeof post.featuredImage === "object" &&
    "url" in post.featuredImage &&
    `${post.featuredImage.url}`;

  return (
    <article className="space-y-10">
      <DetailEntityHeader
        breadCrumbItems={[{ href: "/", label: "Home" }, { label: post.title }]}
        title={post.title}
        description={post.description || ""}
      >
        <div className="flex space-x-2 text-gray-600">
          <span>
            {typeof post.author === "string"
              ? post.author
              : post.author.firstName}
          </span>
          <span aria-hidden="true" className="mx-2 hidden xs:block">
            {MID_DOT}
          </span>
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </div>
      </DetailEntityHeader>

      <Container className="md:flex md:gap-14 md:space-x-0 py-12 md:justify-between">
        <aside className="space-y-12 py-6 md:sticky md:top-16 md:h-screen md:overflow-y-auto md:w-1/4 hidden md:block">
          <div className="flex items-center space-x-4">
            {typeof post.author !== "string" &&
              (post.author.avatar ? (
                <Image
                  src={
                    typeof post.author.avatar === "string"
                      ? post.author.avatar
                      : post.author.avatar.url || ""
                  }
                  alt={post.author.firstName || "Author"}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover block aspect-square"
                />
              ) : (
                <div className="size-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  {post.author?.firstName
                    ?.split(" ")
                    .slice(0, 2)
                    .map((word: any) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>
              ))}

            <h3 className="text-base font-semibold">
              {typeof post.author === "string"
                ? post.author
                : post.author.firstName}
            </h3>
          </div>

          <div className="space-y-4">
            {previousPost && (
              <div>
                <div className="text-sm text-gray-500">Previous article</div>
                <Link
                  href={`/${previousPost.slug}`}
                  className="block hover:underline font-medium"
                >
                  {previousPost.title}
                </Link>
              </div>
            )}
            {nextPost && (
              <div>
                <div className="text-sm text-gray-500">Next article</div>
                <Link
                  href={`/${nextPost.slug}`}
                  className="block hover:underline font-medium"
                >
                  {nextPost.title}
                </Link>
              </div>
            )}
          </div>

          <TableOfContents headings={headings ?? []} />
        </aside>
        <div className="md:w-3/4 space-y-10 py-6">
          {featuredImageUrl && (
            <div className="relative w-full aspect-video">
              <Image
                src={featuredImageUrl}
                alt={post.title}
                fill
                className="object-cover rounded-lg shadow-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none article-content">
            <RichTextRenderer content={post.content} />
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => {
              if (typeof tag === "string") {
                return <Badge key={tag}>{tag}</Badge>;
              }
              return <Badge key={tag.id}>{tag.label || tag.name}</Badge>;
            })}
          </div>
        </div>
      </Container>
    </article>
  );
};

export default BlogPage;
