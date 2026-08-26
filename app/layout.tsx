import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Virtunex — Learn. Build. Level Up.",
    template: "%s | Virtunex",
  },
  description:
    "Virtunex provides gamified tech learning, mentor-led internships and real-world project experience for engineering students.",
  applicationName: "Virtunex",
  metadataBase: new URL("https://virtunex.com"),
  keywords: [
    "Virtunex",
    "IT services",
    "software development",
    "cloud",
    "AI",
    "internship",
    "VTU recognized",
    "mentor-led",
    "real-world projects",
  ],
  authors: [{ name: "Virtunex" }],
  creator: "Virtunex",
  publisher: "Virtunex",
  category: "technology",
  openGraph: {
    type: "website",
    url: "/",
    title: "Virtunex — Learn. Build. Level Up.",
    description:
      "Gamified learning paths for programming, full-stack development and AI/ML, plus real-world internships.",
    siteName: "Virtunex",
    images: [
      {
        url: "/virtunex.png",
        width: 1200,
        height: 630,
        alt: "Virtunex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtunex — Learn. Build. Level Up.",
    description:
      "Gamified learning paths for programming, full-stack development and AI/ML, plus real-world internships.",
    images: ["/virtunex.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/virtunex.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
