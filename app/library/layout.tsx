"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Searchbar from "../components/searchbar";
import Sidebar from "../components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <Searchbar />
        <div className="flex flex-col">
          
        {children}
        <Sidebar />
        </div>
        
        
      </body>
    </html>
  );
}
