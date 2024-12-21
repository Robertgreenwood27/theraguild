import React from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar';

const EnhancedHero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-900">
      <Image
        src="/hero-tarantula.jpg"
        alt="Beautiful Tarantula"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute z-0 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 z-10"></div>
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white font-display">
          Welcome to ArachneGuild
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-zinc-300 font-sans">
          Discover the world's most comprehensive tarantula database
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;
