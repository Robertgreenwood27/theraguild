// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SignUp from '@/components/auth/SignUp';
import HeaderTwo from '@/components/HeaderTwo';

export default function SignUpPage() {
  return (
    <>
      <HeaderTwo />
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900">
        <div className="bg-black p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h1>
          <SignUp />
          <div className="mt-4 text-center text-white">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}