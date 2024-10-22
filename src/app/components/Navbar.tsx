import Link from "next/link";

const Navbar = () => {
  return (
    <header className="
      row-start-1
      flex gap-6 flex-wrap items-center justify-center
      overflow-x-auto
    ">
      <ul className="p-2 flex gap-6">
        <li className="whitespace-nowrap">
          <Link href="/cotb-camping-fall-2024" scroll={false}
            className="
          ">COTB Camping Fall 2024</Link>
        </li>
        <li className="whitespace-nowrap">
          <Link href="#">album 2</Link>
        </li>
        <li className="whitespace-nowrap">
          <Link href="#">album 3</Link>
        </li>
      </ul>
    </header>
  )
}

export default Navbar