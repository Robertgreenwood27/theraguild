import { useState } from 'react'; // Import useState hook
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase authentication methods
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [user, setUser] = useState(null); // Use local state to manage user authentication status

  // Firebase authentication initialization
  const auth = getAuth();

  // Firebase authentication state change listener
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <header
      className="py-8 relative"
      style={{
        backgroundImage: "url('cobwebsdark.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
          {user ? (
            <>
              <span className="text-white mr-4">Welcome, {user.displayName || user.email}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
    </header>
  );
};

export default Header;
