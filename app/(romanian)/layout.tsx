import CafeDocument, { cafeMetadata } from "@/app/cafe-document";

export const metadata = cafeMetadata.ro;

export default function RomanianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CafeDocument locale="ro">{children}</CafeDocument>;
}
