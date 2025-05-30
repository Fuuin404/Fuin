import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/general/Navbar";
import { AuthProvider } from "@/components/general/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Define Inter as the sans-serif font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Define JetBrains Mono as the monospace font
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Define Press Start 2P for the logo
const pressStart2P = Press_Start_2P({
  weight: "400", // Only available weight
  variable: "--font-press-start-2p",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FUIN",
  description: "Generating a techosystem for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${jetBrainsMono.variable} ${pressStart2P.variable} antialiased`}
          style={{ backgroundColor: "#F7F6F2" }}
        >
          <Navbar />
          <div className="m-8">{children}</div>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </AuthProvider>
  );
}
