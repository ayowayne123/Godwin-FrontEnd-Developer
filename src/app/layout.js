import "./globals.css";
import { Inter } from "next/font/google";
import { FilterProvider } from "@/context/search.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpaceX",
  description:
    "we design, manufacture and launch advanced rockets and spacecraft.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FilterProvider>{children} </FilterProvider>
      </body>
    </html>
  );
}
