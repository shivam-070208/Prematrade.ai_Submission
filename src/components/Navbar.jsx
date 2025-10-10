"use client"
import Link from 'next/link';
import React, { useState } from 'react';

import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons.

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Links Array (Mapping Links Object)
  const navLinks = [
    { name: 'Home', to: '#home' },
    { name: 'Explore', to: '#contact' },
    { name: 'Notifications', to: '#features' },
    { name: 'Messaging', to: '#about' },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="w-full sticky top-0 z-50  ">
      {/* Main Container */}
      <div className="  px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-3xl font-semibold text-primary cursor-pointer  transition duration-300">
          Sketcher
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden sm:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              className="text-sm text-foreground hover:text-primary transition duration-300 ease-in-out transform hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Profile Icon */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="relative">
            <FaUserCircle size={32} className="text-muted-foreground hover:text-primary cursor-pointer transition duration-200" />
            {/* Profile Dropdown (Example: Placeholder for profile menu) */}
          </div>
        </div>

        {/* Mobile Menu Icon (Hamburger) */}
        <div className="sm:hidden flex items-center">
          <button className="text-3xl text-muted" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden  flex flex-col items-center space-y-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              className="text-lg text-foreground hover:text-primary transition duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
