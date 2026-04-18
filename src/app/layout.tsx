import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-personality-test.vercel.app"),
  title: "OpenClaw Profiler | AI Personality Test",
  description: "The MBTI-style test for LLMs and AI agents. Give the 60-question test to any AI and discover its 16 possible personality archetypes.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AI Profiler",
  },
  openGraph: {
    siteName: "AI Profiler",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
