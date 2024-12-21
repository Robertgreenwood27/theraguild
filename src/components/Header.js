import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
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
                className="w-auto h-auto transform hover:scale-105 transition duration-300"
              />
            </a>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 text-lg">
            {user && (
              <li>
                <Link href="/addSpecies" passHref legacyBehavior>
                  <a className="text-zinc-100 hover:text-red-500 transition duration-300">
                    Add New Species
                  </a>
                </Link>
              </li>
            )}
            <li>
              <Link href="/species" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-red-500 transition duration-300">
                  Species
                </a>
              </Link>
            </li>
            <li>
              <Link href="/community" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-red-500 transition duration-300">
                  Community
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-red-500 transition duration-300">
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref legacyBehavior>
                <a className="text-zinc-100 hover:text-red-500 transition duration-300">
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="auth mt-8">
          {user ? (
            <>
              <span className="text-white mr-4">
                Welcome, {user.email}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-black text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <a className="bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-black text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
    </header>
  );
};

export default Header;