// components/Hero.js
const Hero = () => {
    return (
      <section className="hero bg-zinc-900 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ArachneGuild</h1>
          <p className="text-xl text-zinc-600 mb-8">
            Discover, learn, and share knowledge about tarantulas with fellow enthusiasts worldwide.
          </p>
          <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
            Join the Community
          </a>
        </div>
      </section>
    );
  };
  
  export default Hero;