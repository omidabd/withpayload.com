import { cache } from "react";

import { getPayload } from "@/utils/payload";

interface GetProjectsProps {
  selectedCategories?: string[];
  sortBy?: string;
}

export const getProjects = cache(
  async ({ sortBy = "createdAt" }: GetProjectsProps = {}) => {
    const payload = await getPayload();

    return await payload.find({
      collection: "projects",
      where: {
        title: {
          not_equals: null,
        },
        description: {
          not_equals: null,
        },
        content: {
          not_equals: null,
        },
        createdBy: {
          not_equals: null,
        },
        thumbnail: {
          not_equals: null,
        },
      },
      sort: sortBy,
    });
  },
);

export const getProjectsCategories = cache(async () => {
  const payload = await getPayload();
  return await payload.find({ collection: "projectsCategories" });
});

export const getProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload();

  return await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
});
