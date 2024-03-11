import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">About ArachneGuild</h4>
            <p className="text-zinc-400">
              ArachneGuild is the premier platform for tarantula enthusiasts worldwide. We are dedicated to providing a comprehensive resource for learning about and connecting with these fascinating creatures.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="text-zinc-400 hover:text-white">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/species" legacyBehavior>
                  <a className="text-zinc-400 hover:text-white">Species</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="text-zinc-400 hover:text-white">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/faq" legacyBehavior>
                  <a className="text-zinc-400 hover:text-white">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
            <div className="social-icons flex space-x-4">
              <a href="https://facebook.com/ArachneGuild" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-2xl text-zinc-400 hover:text-white"></i>
              </a>
              <a href="https://twitter.com/ArachneGuild" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-2xl text-zinc-400 hover:text-white"></i>
              </a>
              <a href="https://instagram.com/ArachneGuild" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-2xl text-zinc-400 hover:text-white"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom mt-12 text-center">
          <p className="text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} ArachneGuild. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
