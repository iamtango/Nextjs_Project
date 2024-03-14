"use client";

import { SessionProvider } from "next-auth/react";

const ClientProvider = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ClientProvider;
