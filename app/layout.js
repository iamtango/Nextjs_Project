import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./provider/ClientProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Service Desk",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log("session In Layout page ->", session);
  return (
    <html lang="en">
      <body>
        <ClientProvider session={session}>{children}</ClientProvider>
      </body>
    </html>
  );
}