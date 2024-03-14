import AppLayout from "@/components/AppLayout";
import "@/app/globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <AppLayout children={children} />
    </>
  );
}
