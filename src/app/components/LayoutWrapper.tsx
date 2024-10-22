import { ReactNode } from 'react';
import NavBar from "@/app/components/Navbar";
// import Footer from "@/app/components/Footer";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="
      grid grid-rows-[20px_1fr] items-center justify-items-center
      min-h-screen p-8 pb-20 gap-16 sm:p-20
      font-[family-name:var(--font-geist-sans)]
    ">
      <NavBar />
      { children }
      {/* <Footer /> */}

      {/* Some extra components such as modals can be placed in this component. */}
    </div>
  )
}

export default LayoutWrapper