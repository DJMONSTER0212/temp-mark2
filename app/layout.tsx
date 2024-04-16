import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Analysis Portal",
  description: "Portal for students to view there progress and other reports"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastContainer />
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
