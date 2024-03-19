import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const HeaderTwo = ({ noBackground = false }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Modify here for transparent background
  const headerStyle = noBackground ? { backgroundColor: 'transparent' } : {
    backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_URL}/cobwebsdark.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <header className={`py-4 ${noBackground ? '' : 'bg-black'} shadow-md relative`} style={headerStyle}>
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
        <div className="relative">
          <button className="text-zinc-100 focus:outline-none" onClick={toggleMenu}>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20">
              <Link href="/about" passHref legacyBehavior>
                <a className="block px-4 py-2 text-zinc-800 hover:bg-zinc-100">About</a>
              </Link>
              <Link href="/species" passHref legacyBehavior>
                <a className="block px-4 py-2 text-zinc-800 hover:bg-zinc-100">Species</a>
              </Link>
              <Link href="/community" passHref legacyBehavior>
                <a className="block px-4 py-2 text-zinc-800 hover:bg-zinc-100">Community</a>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <a className="block px-4 py-2 text-zinc-800 hover:bg-zinc-100">Contact</a>
              </Link>
              {user ? (
                <>
                  <span className="block px-4 py-2 text-zinc-800">Welcome, {user.displayName || user.email}!</span>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-zinc-800 hover:bg-zinc-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" passHref legacyBehavior>
                  <a className="block px-4 py-2 text-zinc-800 hover:bg-zinc-100">Login</a>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {!noBackground && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>}
    </header>
  );
};

export default HeaderTwo;
