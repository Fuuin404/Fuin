import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Changed imports
import "./globals.css";
import { Navbar } from "@/components/general/Navbar";
import { AuthProvider } from "@/components/general/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Define Inter as the sans-serif font
const inter = Inter({
  variable: "--font-inter", // Changed variable name
  subsets: ["latin"],
});

// Define JetBrains Mono as the monospace font
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono", // Changed variable name
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
          className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
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
