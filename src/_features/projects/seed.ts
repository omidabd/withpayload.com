import fs from "fs";
import path from "path";

import {
  initProjectsCategories,
  initProjectsData,
} from "@/_features/projects/initData";
import { Payload } from "payload";

export const seedProjects = async (payload: Payload) => {
  const thumbnailImagePaths = [
    path.join(
      process.cwd(),
      "src",
      "_features",
      "projects",
      "media",
      "payload-tailwind-blog-starter.jpg",
    ),
    path.join(
      process.cwd(),
      "src",
      "_features",
      "projects",
      "media",
      "payload-livog-saas.jpg",
    ),
    path.join(
      process.cwd(),
      "src",
      "_features",
      "projects",
      "media",
      "payload-authjs-plugin.jpg",
    ),
  ];

  const thumbnailImages = await Promise.all(
    thumbnailImagePaths.map(async (imagePath, index) => {
      const fileBuffer = fs.readFileSync(imagePath);
      return await payload.create({
        collection: "media",
        data: {
          title: `Thumbnail ${index + 1} image`,
        },
        file: {
          data: fileBuffer,
          name: `thumbnail-${index + 1}-image.jpg`,
          mimetype: "image/jpeg",
          size: fileBuffer.byteLength,
        },
      });
    }),
  );
  const projectCategories = await Promise.all(
    initProjectsCategories.map(async (projectCategory) => {
      return await payload.create({
        collection: "projectsCategories",
        data: projectCategory,
      });
    }),
  );

  await Promise.all(
    initProjectsData.map(async (project, index) => {
      const initCategories = projectCategories
        .filter((category) => project.categories?.includes(category.name))
        .map((category) => category.id);

      await payload.create({
        collection: "projects",
        data: {
          ...project,
          thumbnail: thumbnailImages[index].id,
          categories: initCategories,
        },
      });
    }),
  );
};
