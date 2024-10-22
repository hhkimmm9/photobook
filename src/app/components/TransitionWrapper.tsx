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
      { children }
    </PageTransition>
  )
}

export default TransitionWrapper