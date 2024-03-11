// pages/about.js
import HeaderTwo from '@/components/HeaderTwo';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <>
    <HeaderTwo/>
    <div className="about-page">
      <section className="hero bg-zinc-900 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ArachneGuild</h1>
          <p className="text-xl text-zinc-600 mb-8">
            Discover the world of tarantulas with ArachneGuild, the premier platform for tarantula enthusiasts worldwide.
          </p>
        </div>
      </section>

      <section className="mission py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-zinc-600 mb-8">
            At ArachneGuild, our mission is to provide a comprehensive resource for tarantula enthusiasts of all levels. We strive to educate, inspire, and connect individuals who share a passion for these fascinating creatures. Our platform aims to promote the responsible care, conservation, and appreciation of tarantulas worldwide.
          </p>
        </div>
      </section>

      <section className="founder bg-zinc-900 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">The Founder</h2>
          <div className="founder-profile flex flex-col md:flex-row items-center">
            <Image
              src="/founder.jpg"
              alt="Founder"
              width={300}
              height={300}
              className="rounded-full mb-4 md:mb-0 md:mr-8"
            />
            <div>
              <h3 className="text-xl font-bold">Robbie Greenwood</h3>
              <p className="text-zinc-600">Founder & CEO</p>
              <p className="text-zinc-600 mt-4">
                As a passionate tarantula enthusiast, I founded ArachneGuild to create a platform that brings together tarantula lovers from around the world. My goal is to foster a community where knowledge is shared, experiences are celebrated, and the beauty of these incredible creatures is appreciated by all.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="community py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Community</h2>
          <p className="text-xl text-zinc-600 mb-8">
            At ArachneGuild, our community is the heart and soul of our platform. Our members are the true tarantula experts, sharing their knowledge, experiences, and passion with others. From beginners to seasoned enthusiasts, everyone has a place in our welcoming and inclusive community.
          </p>
          <p className="text-xl text-zinc-600">
            We believe in the power of collaboration and the collective wisdom of our community. Together, we strive to advance the understanding and appreciation of tarantulas, promote responsible care practices, and support conservation efforts.
          </p>
        </div>
      </section>

      <section className="values py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <p className="text-zinc-600">
                We believe in the power of education to promote responsible tarantula care and conservation.
              </p>
            </div>
            <div className="value">
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-zinc-600">
                We foster a welcoming and inclusive community where enthusiasts can connect, share knowledge, and support each other.
              </p>
            </div>
            <div className="value">
              <h3 className="text-xl font-bold mb-4">Conservation</h3>
              <p className="text-zinc-600">
                We are committed to promoting the conservation of tarantulas and their habitats through awareness and responsible practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutPage;