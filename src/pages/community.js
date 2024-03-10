// pages/community.js
import Link from 'next/link';
import { useState } from 'react';

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Tarantula: A Beginner\'s Experience',
      author: 'John Doe',
      date: 'May 15, 2023',
      content: 'I recently got my first tarantula, a Brachypelma hamorii. It was an exciting and rewarding experience...',
    },
    {
      id: 2,
      title: 'The Importance of Proper Tarantula Enclosures',
      author: 'Jane Smith',
      date: 'May 10, 2023',
      content: 'Providing the right enclosure for your tarantula is crucial for their well-being. In this post, I\'ll share some tips...',
    },
    // Add more post objects as needed
  ]);
  return (
    <div className="community-page">
      <section className="hero bg-zinc-900 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">ArachneGuild Community</h1>
          <p className="text-xl text-zinc-300 mb-8">
            Connect with fellow tarantula enthusiasts, share your experiences, and learn from the community.
          </p>
        </div>
      </section>

      <section className="featured-posts py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="post-card bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-zinc-600 mb-4">
                  By {post.author} | {post.date}
                </p>
                <p className="text-zinc-800">{post.content}</p>
                <Link href={`/community/post/${post.id}`} className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" legacyBehavior>
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="discussions py-16 bg-zinc-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Latest Discussions</h2>
          {/* Add discussion component */}
        </div>
      </section>

      <section className="contribute py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contribute to the Community</h2>
          <p className="text-xl text-zinc-600 mb-8">
            Share your knowledge, experiences, and stories with the ArachneGuild community.
          </p>
          <Link href="/community/create-post" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full" legacyBehavior>
            Create a Post
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;