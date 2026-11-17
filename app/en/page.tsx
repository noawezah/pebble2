import CafeSite from "@/components/cafe-site";
import { cafeAlternates } from "@/lib/cafe-routes";
import { getCafeContent } from "@/lib/content";

export const metadata = { alternates: cafeAlternates("en", "home") };

export const revalidate = 60;
export default async function Home() {
  return <CafeSite content={await getCafeContent()} locale="en" />;
}
