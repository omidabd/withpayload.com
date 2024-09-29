import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectBySlug, getProjects } from "@/_features/projects/actions";
import { DetailEntityHeader } from "@/components/DetailEntityHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ResponsiveNextImage } from "@/components/ui/Image";
import { LinkButton } from "@/components/ui/LinkButton";
import { formatDate, stripUrl } from "@/utils/helpers";
import { IconClock, IconHash, IconUser } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const dynamicParams = true;

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  const projects = await getProjects();
  const paths = projects.docs.map((project) => ({
    params: {
      slug: project.slug,
    },
  }));

  return paths;
}

type Params = Promise<{ slug: string }>;

const ProjectPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const { docs } = await getProjectBySlug({ slug });

  if (!docs.length) {
    return notFound();
  }

  const project = docs[0];

  const title = project.title || stripUrl(project?.websiteUrl || "");
  const breadCrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: title },
  ];

  const projectDetails = [
    {
      key: "Created by",
      value: project?.createdBy,
      icon: IconUser,
      href: `https://github.com/${project?.createdBy}`,
    },
    {
      key: "Created At",
      value: formatDate(project.createdAt),
      icon: IconClock,
    },
    {
      key: "Categories",
      value: (project.categories ?? [])
        .map((c: any) => (typeof c === "string" ? c : c.name))
        .join(", "),
      icon: IconHash,
    },
  ];

  return (
    <div className="space-y-12">
      <DetailEntityHeader
        breadCrumbItems={breadCrumbItems}
        title={title}
        description={project.description || ""}
      />

      <Container className="md:flex md:gap-8 md:justify-between space-y-8 md:space-y-0">
        <div className="space-y-12 md:sticky md:top-16 md:h-screen md:overflow-y-auto md:w-1/3 pt-4">
          <Card className="!p-0">
            <div className="space-y-4 p-4">
              <div className="font-display text-base font-medium tracking-micro">
                Project details:
              </div>
              {projectDetails.map((item) => {
                return (
                  <div key={item.key} className="flex space-x-2 text-sm">
                    <item.icon className="w-4 h-4" />
                    <div className="text-gray-700 font-medium">{item.key}:</div>
                    {typeof item.value === "string" && (
                      <div className="text-black font-semibold">
                        {item.href ? (
                          <Link href={item.href} className="hover:underline">
                            {item.value}
                          </Link>
                        ) : (
                          item.value
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t">
              <div className="p-4 space-y-4">
                <LinkButton
                  isExternalLink
                  href={project.githubUrl}
                  variant="secondary"
                  size="sm"
                  className="font-medium w-full"
                >
                  View on GitHub
                </LinkButton>
                {project?.websiteUrl && (
                  <LinkButton
                    isExternalLink
                    href={project.websiteUrl}
                    variant="default"
                    size="sm"
                    className="font-medium w-full"
                  >
                    View on Website
                  </LinkButton>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="md:w-2/3 lg:w-3/4 space-y-10 pt-4">
          {typeof project.thumbnail === "object" &&
            project.thumbnail !== null &&
            "url" in project.thumbnail && (
              <ResponsiveNextImage
                src={project.thumbnail.url ?? ""}
                alt="Project thumbnail"
                className="rounded-lg border"
              />
            )}

          {project?.content && (
            <ReactMarkdown
              className="prose leading-relaxed"
              rehypePlugins={[rehypeRaw]}
            >
              {project.content}
            </ReactMarkdown>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProjectPage;
