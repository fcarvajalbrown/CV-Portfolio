import type { Metadata } from "next";
import { listProjectSlugs, readProjectFrontMatter } from "@/lib/projects-content";
import { publicPath } from "@/lib/publicPath";
import { SITE_AUTHOR, SITE_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";
import BackButton from "@/components/BackButton";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  const slugs = listProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

function resolveSlug(params?: Params["params"]) {
  return decodeURIComponent((params?.slug ?? "").toString());
}

export function generateMetadata({ params }: Params): Metadata {
  const meta = readProjectFrontMatter(resolveSlug(params));
  if (!meta) return { title: "Project not found" };

  const url = absoluteUrl(`/projects/${meta.slug}`);

  return {
    title: meta.title,
    description: meta.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: `${meta.title} — ${SITE_AUTHOR}`,
      description: meta.shortDescription,
      url,
      images: [
        {
          url: absoluteUrl(SITE_IMAGE.path),
          width: SITE_IMAGE.width,
          height: SITE_IMAGE.height,
          alt: meta.title,
        },
      ],
    },
  };
}

export default function ProjectDetail({ params }: Params) {
  const meta = readProjectFrontMatter(resolveSlug(params));
  if (!meta) return <div style={{ padding: 24 }}>Project not found.</div>;

  return (
    <main className="container">
      {
        //ToDO: Navbar
      }
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <BackButton fallback="/" />
        <h1 className="card__title" style={{ margin: 0 }}>{meta.title}</h1>
      </div>

      {
        //ToDO: Hero/Container
      }
      <div className="card">
        <div className="card__thumb">
          <img src={publicPath(meta.media?.hero?.ref) || publicPath("/images/placeholder.jpg")} alt={meta.title} />
        </div>
        <div className="card__body">
          <p className="card__meta">{meta.period}</p>
          {meta.tags?.length ? (
            <div className="tags tags--mb">
              {meta.tags.map((t, i) => <span key={i} className="pill gray">{t}</span>)}
            </div>
          ) : null}
          <p className="dim">{meta.shortDescription}</p>
        </div>
      </div>
    </main>
  );
}
