import { isAdmin, isAnyone } from "@/utils/access";
import { formatSlug } from "@/utils/helpers";
import { CollectionConfig } from "payload";

const Projects: CollectionConfig = {
  slug: "projects",
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
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "content",
      type: "textarea",
    },
    {
      name: "websiteUrl",
      type: "text",
    },
    {
      name: "githubUrl",
      type: "text",
      required: true,
    },
    {
      name: "faviconUrl",
      type: "text",
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "projectsCategories",
      hasMany: true,
    },
    {
      name: "createdBy",
      type: "text",
    },
    {
      name: "fetchStatus",
      type: "select",
      options: ["NOT_FETCHED", "FETCHED", "ERROR"],
      defaultValue: "NOT_FETCHED",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
  ],
};

const ProjectsCategories: CollectionConfig = {
  slug: "projectsCategories",
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
      type: "join",
      collection: "projects",
      name: "projectsByCategory",
      on: "categories",
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

export const ProjectsCollections = [Projects, ProjectsCategories];
