import { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ResponsiveNextImage } from "@/components/ui/Image";
import { Description, Title } from "@/components/ui/Typography";
import { stripUrl, truncateString } from "@/utils/helpers";
import { Media } from "payload-types";

import { getProjects } from "../../../_features/projects/actions";

export const metadata: Metadata = {
  title: "withPayload.com - explore payload plugins and starters",
  description: "explore payload plugins and starters",
};

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <div>
      <div className="border-b bg-gray-100 py-16">
        <Container size="lg" className="">
          <div className="space-y-4 m-auto text-center">
            <Title className="text-4xl">
              Explore resources for PayloadCMS{" "}
            </Title>
            <Description>
              Discover starter kits and plugins and other useful stuff for
              PayloadCMS.
            </Description>
          </div>
        </Container>
      </div>
      <div className="py-16">
        <Container size="lg">
          <div className="space-y-10 overflow-x-hidden">
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {projects.docs.map((project) => {
                const title =
                  project.title || stripUrl(project.websiteUrl || "");
                const categoriesLabelsArray = project.categories?.map(
                  (category) =>
                    typeof category === "string"
                      ? category
                      : category.label || category.name,
                );

                return (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-block"
                  >
                    <Card className="!p-0 h-full flex flex-col">
                      <div className="border-b">
                        <ResponsiveNextImage
                          src={(project.thumbnail as Media)?.url ?? ""}
                          className="aspect-video rounded-t-lg"
                        />
                      </div>

                      <div className="space-y-2 p-4">
                        <div className="flex flex-wrap gap-2">
                          {categoriesLabelsArray?.map((category) => (
                            <Badge size="sm" key={category}>
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          {project.faviconUrl && (
                            <ResponsiveNextImage
                              src={project.faviconUrl}
                              className="max-w-6 max-h-6 rounded-full border"
                            />
                          )}

                          <Title className="text-lg">{title}</Title>
                        </div>

                        <Description className="text-sm">
                          {truncateString(project.description ?? "", 80)}
                        </Description>

                        {project?.createdBy && (
                          <div className="text-xs text-gray-500 mt-auto">
                            By {project.createdBy}
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProjectsPage;
