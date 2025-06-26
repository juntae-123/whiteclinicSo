import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderPage from "@/components/header/Header";
import FooterPage from "@/components/footer/Footer";
import Sticky from "@/components/main/subcomponents/Sticky";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "화이트클리닉 - 전문 가전세척 서비스",
  description: "에어컨, 세탁기 전문 세척 서비스. 화이트클리닉에서 깨끗하고 안전한 가전세척을 경험하세요.",
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
        <HeaderPage />

        {children}
        <Sticky />
        <FooterPage />
      </body>
    </html>
  );
}
