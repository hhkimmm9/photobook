import { Dancing_Script } from 'next/font/google';
import Link from "next/link";

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Header = () => {
  return (
    <header className="
      fixed top-0 z-10 w-full h-16
      backdrop-blur bg-opacity-70 bg-white
      flex items-center justify-center
    ">
      <Link href="/" className={`${dancingScript.className} text-3xl`}>
        Harrison&apos;s Photobook
      </Link>
    </header>
  );
};

export default Header;