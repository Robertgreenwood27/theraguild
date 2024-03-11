import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-8 relative" style={{ backgroundImage: "url('cobwebsdark.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container mx-auto flex flex-col items-center relative z-10">
        <div className="logo mb-8">
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image
                src="/logo.png"
                alt="ArachneGuild Logo"
                width={400}
                height={150}
                className="w-auto h-auto"
              />
            </a>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 text-lg">
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
        <div className="auth mt-8">
          <Link href="/login" passHref legacyBehavior>
            <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
              Login
            </a>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
    </header>
  );
};

export default Header;
