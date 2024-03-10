import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="cta-section bg-blue-600 py-16">
      <div className="container mx-auto text-center">
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
    </section>
  );
};

export default CtaSection;
