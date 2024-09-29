import fs from "fs";
import path from "path";

import { initPosts, initPostsTags } from "@/_features/blog/initData";
import { Payload } from "payload";

export const seedBlog = async (payload: Payload) => {
  const mediaImagePaths = [
    path.join(process.cwd(), "src", "_features", "blog", "media", "image1.jpg"),
    path.join(process.cwd(), "src", "_features", "blog", "media", "image2.jpg"),
    path.join(process.cwd(), "src", "_features", "blog", "media", "image3.jpg"),
  ];

  const mediaImages = await Promise.all(
    mediaImagePaths.map(async (imagePath) => {
      const fileBuffer = fs.readFileSync(imagePath);
      const fileName = path.basename(imagePath);
      const fileNameWithoutExtension = path.parse(fileName).name;
      return await payload.create({
        collection: "media",
        data: {
          title: fileNameWithoutExtension,
        },
        file: {
          data: fileBuffer,
          name: fileName,
          mimetype: "image/jpeg",
          size: fileBuffer.byteLength,
        },
      });
    }),
  );

  const postsTags = await Promise.all(
    initPostsTags.map(async (tag) => {
      return await payload.create({
        collection: "postsTags",
        data: tag,
      });
    }),
  );

  const hasUsers = await payload.find({
    collection: "users",
    limit: 1,
    where: {
      role: {
        equals: "admin",
      },
    },
  });

  await Promise.all(
    initPosts.map(async (post, index) => {
      await payload.create({
        collection: "posts",
        data: {
          ...post,
          author: hasUsers.docs[0].id,
          featuredImage: mediaImages[index].id,
          tags: [postsTags[index].id],
        },
      });
    }),
  );
};
