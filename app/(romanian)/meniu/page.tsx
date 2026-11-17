import type { Metadata } from "next";
import CafeMenu from "@/components/cafe-menu";
import { cafeAlternates } from "@/lib/cafe-routes";

export const metadata: Metadata = {
  title: "Meniu — PEBBLE",
  description: "Cafea de specialitate, băuturi și cocktailuri la PEBBLE, București.",
  alternates: cafeAlternates("ro", "menu"),
};

export default function MenuPage() {
  return <CafeMenu locale="ro" />;
}
