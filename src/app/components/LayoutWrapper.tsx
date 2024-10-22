import { ReactNode } from 'react';
import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="
      grid items-center justify-items-center
      min-h-screen bg-stone-100
      font-[family-name:var(--font-geist-sans)]
    ">
      <Header />

      <div className="
        w-full h-full mt-32 p-4 overflow-y-auto
      ">{ children }</div>

      {/* <Footer /> */}

      {/* Some extra components such as modals can be placed in this component. */}
    </div>
  )
}

export default LayoutWrapper