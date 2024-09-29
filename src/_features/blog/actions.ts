import { cache } from "react";

import { getPayload } from "@/utils/payload";
import { PostsTag } from "payload-types";

interface GetBlogPostsProps {
  selectedTags?: string[];
  sortBy?: string;
}

export const getPosts = async ({
  selectedTags,
  sortBy,
}: GetBlogPostsProps = {}) => {
  const payload = await getPayload();

  return await payload.find({
    collection: "posts",
    where: {
      ...(selectedTags &&
        selectedTags.length > 0 && {
          "tags.name": {
            in: selectedTags,
          },
        }),
    },
    sort: sortBy,
  });
};

export const getPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload();

  return await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
    },
    sort: "-createdAt",
    limit: 1,
  });
});

export const getAdjacentPosts = cache(
  async ({ currentPostId }: { currentPostId: string }) => {
    const payload = await getPayload();

    const allPosts = await payload.find({
      collection: "posts",
      sort: "-createdAt",
      limit: 3,
    });

    const currentPostIndex = allPosts.docs.findIndex(
      (post) => post.id === currentPostId,
    );

    return {
      previousPost:
        currentPostIndex > 0 ? allPosts.docs[currentPostIndex - 1] : null,
      nextPost:
        currentPostIndex < allPosts.docs.length - 1
          ? allPosts.docs[currentPostIndex + 1]
          : null,
    };
  },
);

export const getTags = cache(async (): Promise<{ docs: PostsTag[] }> => {
  const payload = await getPayload();

  const tags = await payload.find({
    collection: "postsTags",
  });

  return tags;
});
