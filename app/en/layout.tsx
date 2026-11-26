import CafeDocument, { cafeMetadata } from "@/app/cafe-document";

export const metadata = cafeMetadata.en;

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CafeDocument locale="en">{children}</CafeDocument>;
}
