// pages/404.js
import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
      <Image src="/404.png" alt="Web Developer Tangled in Webbing" fill style={{ objectFit: 'cover' }} quality={100} />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl text-white mb-8">
            Oops! Looks like our web developer got a little tangled up in this one.
          </p>
          <p className="text-xl text-white mb-8">
            Don&apos;t worry, we&apos;ll help untangle this sticky situation and get you back on track!
          </p>
          <Link href="/" legacyBehavior>
            <a className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Return to Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;