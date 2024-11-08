import Image from "next/image";

const Header = () => {
  return (
    <header className="
      fixed top-0 z-10 w-full h-16
      backdrop-blur bg-opacity-70 bg-white
      flex items-center justify-center
    ">
      <Image src="/images/logo.png" alt="Logo - Harrison's Photobook"
        width={300} height={168}
        className="object-contain h-full"
      />
    </header>
  );
};

export default Header;