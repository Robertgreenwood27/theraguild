import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="cta-section relative" style={{ backgroundImage: "url('cobwebsblue.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container mx-auto text-center py-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Join the ArachneGuild Community
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Become a part of the global tarantula enthusiast community. Sign up today and start connecting with fellow enthusiasts, learning about different species, and contributing to our growing knowledge base.
        </p>
        <div className="cta-buttons flex justify-center">
          <Link href="/signup" legacyBehavior>
            <a className="bg-white hover:bg-blue-100 text-blue-600 font-bold py-3 px-8 rounded-full mr-4">
              Sign Up
            </a>
          </Link>
          <Link href="/explore" legacyBehavior>
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full">
              Explore Species
            </a>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
    </section>
  );
};

export default CtaSection;
  