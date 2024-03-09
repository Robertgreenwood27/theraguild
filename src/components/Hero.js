// components/Hero.js
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="hero bg-zinc-900 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="hero-content mb-8 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to TheraGuild
          </h1>
          <p className="text-xl mb-8">
            Discover the fascinating world of tarantulas with TheraGuild, the ultimate platform for tarantula enthusiasts worldwide. Connect with fellow enthusiasts, learn about different species, and contribute to our growing knowledge base.
          </p>
          <div className="hero-cta">
            <a
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full"
            >
              Join the Community
            </a>
          </div>
        </div>
        <div className="hero-image md:w-1/2">
          <Image
            src="/hero-tarantula.jpg"
            alt="Tarantula"
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;