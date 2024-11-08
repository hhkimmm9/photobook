import { ReactNode } from "react"
import Header from "@/app/(components)/(layouts)/Header"
// import Footer from "@/app/components/Footer"

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    // grid items-center justify-items-center min-h-screen 
    <div className="
      min-h-screen bg-stone-100
      font-[family-name:var(--font-geist-sans)]
    ">
      <Header />

      <div className="
        min-h-[calc(100vh-7rem)] mt-16 p-6
        md:p-12 lg:px-80 2xl:px-96
      ">{ children }</div>

      {/* <Footer /> */}

      {/* Some extra components such as modals can be placed in this component. */}
    </div>
  )
}

export default LayoutWrapper