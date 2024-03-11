import Image from 'next/image';
import Link from 'next/link';

const HeaderTwo = () => {
  return (
    <header className="py-4 bg-black shadow-md relative" style={{ backgroundImage: "url('cobwebsdark.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="logo">
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image
                src="/logo.png"
                alt="ArachneGuild Logo"
                width={150}
                height={50}
                className="w-auto h-auto"
              />
            </a>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link href="/about" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-zinc-300">About</a>
              </Link>
            </li>
            <li>
              <Link href="/species" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-zinc-300">Species</a>
              </Link>
            </li>
            <li>
              <Link href="/community" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-zinc-300">Community</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-zinc-300">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
    </header>
  );
};

export default HeaderTwo;
