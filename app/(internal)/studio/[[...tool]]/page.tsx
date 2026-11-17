import type { Metadata } from "next";
import Link from "next/link";
import Studio from "@/components/studio";
export const metadata: Metadata = {
  title: "PEBBLE — Content studio",
  robots: { index: false, follow: false },
};
export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset)
    return (
      <main className="page-pad section-space">
        <p className="eyebrow">PEBBLE / Content studio</p>
        <h1 className="section-title" style={{ margin: "32px 0" }}>
          Connect your Sanity project.
        </h1>
        <p>
          Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in
          the deployment environment, then restart or redeploy.
        </p>
        <p style={{ margin: "20px 0" }}>
          The café site currently uses the saved local content. The customer
          menu is maintained separately in the site’s menu data.
        </p>
        <Link className="button primary" href="/">
          Return to PEBBLE
        </Link>
      </main>
    );
  return <Studio projectId={projectId} dataset={dataset} />;
}
