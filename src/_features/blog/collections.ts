import { isAdmin, isAnyone } from "@/utils/access";
import { formatSlug } from "@/utils/helpers";
import { CollectionConfig } from "payload";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: "Author",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "postsTags",
      label: "Tags",
      hasMany: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Featured Image",
      admin: {
        position: "sidebar",
        description:
          "This image will be used as the featured image for the post",
      },
    },
  ],
};

const PostsTags: CollectionConfig = {
  slug: "postsTags",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
    },
    {
      name: "label",
      type: "text",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("name")],
      },
    },
  ],
};

export const BlogCollections = [Posts, PostsTags];
