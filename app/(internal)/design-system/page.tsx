import type { Metadata } from "next";
import DesignSystem from "@/components/design-system";

export const metadata: Metadata = {
  title: "PEBBLE — Visual system",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <DesignSystem />;
}
