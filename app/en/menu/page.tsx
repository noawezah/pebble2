import type { Metadata } from "next";
import CafeMenu from "@/components/cafe-menu";
import { cafeAlternates } from "@/lib/cafe-routes";

export const metadata: Metadata = {
  title: "Menu — PEBBLE",
  description: "Specialty coffee, drinks and cocktails at PEBBLE in Bucharest.",
  alternates: cafeAlternates("en", "menu"),
};

export default function MenuPage() {
  return <CafeMenu locale="en" />;
}
