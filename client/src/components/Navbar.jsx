import React from 'react';
import { FaHome, FaSearch, FaUser, FaPhone } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-extrabold text-3xl tracking-wide">AI-Fitness Coach</div>
        <div className="flex space-x-4">
          <a href="/" className="text-white flex items-center font-semibold hover:text-gray-300 active:text-gray-500">
            <FaHome className="mr-2" /> Home
          </a>
          <a href="/search" className="text-white flex items-center font-semibold hover:text-gray-300 active:text-gray-500">
            <FaSearch className="mr-2" /> Search
          </a>
          <a href="/profile" className="text-white flex items-center font-semibold hover:text-gray-300 active:text-gray-500">
            <FaUser className="mr-2" /> Profile
          </a>
          <a href="/contact" className="text-white flex items-center font-semibold hover:text-gray-300 active:text-gray-500">
            <FaPhone className="mr-2" /> Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
