import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/global.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className="w-full h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="flex flex-col w-full h-full">
        <div className="relative w-full flex flex-col">
          <Header />

          <main className="relative shrink-0 grow basis-auto mx-auto pt-6 pb-16 px-4 w-full max-w-6xl flex flex-col justify-start items-center">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <script async src="https://analytics.eu.umami.is/script.js" data-website-id="b6e36293-961b-43eb-af79-d7da00f27707"></script>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: "memos - Easily capture and share your great thoughts",
  description: "A privacy-first, lightweight note-taking service. Easily capture and share your great thoughts.",
  openGraph: {
    title: "memos - Easily capture and share your great thoughts. Open Source and Free forever",
    description: "A privacy-first, lightweight note-taking service. Easily capture and share your great thoughts.",
    type: "website",
    url: "https://www.usememos.com",
  },
  twitter: {
    card: "summary",
  },
};

export default RootLayout;
