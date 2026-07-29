import type { MetadataRoute } from "next";
import { listProjectSlugs } from "@/lib/projects-content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = listProjectSlugs().map((slug) => ({
    url: absoluteUrl(`/projects/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly" as const, priority: 1 },
    ...projects,
  ];
}
