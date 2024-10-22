"use client";

import { usePathname } from 'next/navigation';

const Page = () => {
  const pathname = usePathname()
  
  return (
    <div>{ pathname }</div>
  );
};

export default Page