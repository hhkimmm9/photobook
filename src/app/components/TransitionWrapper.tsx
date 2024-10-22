"use client";

import { PageTransition } from "@steveeeie/react-page-transition";
import { usePathname } from "next/navigation";
import { ReactNode } from 'react';

const TransitionWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <PageTransition
      preset="roomToBottom"
      transitionKey={pathname}
      enterAnimation={""}
      exitAnimation={""}
    >
      <div className="
        row-start-2 flex flex-col gap-8
        items-center sm:items-start
      ">
        { children }
      </div>
    </PageTransition>
  )
}

export default TransitionWrapper