"use client";

import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import Chat from "./Components/Ui/Chat"; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessagesProvider } from '@/context/messages';

// Correct Google Font imports
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Create a single QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <MessagesProvider>
            <Chat />
            {children}
          </MessagesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
