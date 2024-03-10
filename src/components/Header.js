// components/Header.js
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="logo mb-8">
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image
                src="/logo.png"
                alt="TheraGuild Logo"
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
                <a className="text-gray-600 hover:text-gray-900">About</a>
              </Link>
            </li>
            <li>
              <Link href="/species" passHref legacyBehavior>
                <a className="text-gray-600 hover:text-gray-900">Species</a>
              </Link>
            </li>
            <li>
              <Link href="/community" passHref legacyBehavior>
                <a className="text-gray-600 hover:text-gray-900">Community</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref legacyBehavior>
                <a className="text-gray-600 hover:text-gray-900">Contact</a>
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
    </header>
  );
};

export default Header;
