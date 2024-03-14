import Signin from "@/components/Signin";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // return <Signin user={session?.user} />;
  return <Signin />;
}
