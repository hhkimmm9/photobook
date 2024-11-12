import Link from "next/link";

const Header = () => {
  return (
    <header className="
      fixed top-0 z-10 w-full h-16
      backdrop-blur bg-opacity-70 bg-white
      flex items-center justify-center
    ">
      <Link href="/" className="text-3xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Harrison&apos;s Photobook
      </Link>
    </header>
  );
};

export default Header;