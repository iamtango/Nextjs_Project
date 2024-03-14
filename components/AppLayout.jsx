import Footer from "./Footer";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <>
      <div className="min-h-full ">
        <Navbar />

        <div className="py-4 ">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-0 ">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
