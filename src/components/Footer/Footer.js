import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Tam02112003' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nguyenminhtam021103' },
    { name: 'Email', url: 'mailto:ngminhtam02112003@gmail.com' }
  ];

  return (
    <footer className="bg-black/50 backdrop-blur-xl py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              NMT Portfolio
            </motion.h3>
            <p className="text-gray-400">
              Building the future through code, one project at a time.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NMT Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;