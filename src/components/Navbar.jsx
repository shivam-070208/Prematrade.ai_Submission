"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session status on component mount
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check-auth');
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Navigation Links Array (Mapping Links Object)
  const navLinks = [
    { name: 'Home', to: '#home' },
    { name: 'Explore', to: '#contact' },
    { name: 'Notifications', to: '#features' },
    { name: 'Messaging', to: '#about' },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const AuthButtons = () => (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-sm text-foreground hover:text-primary transition duration-300"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300 shadow-xs hover:shadow-none"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <nav className="w-full sticky top-0 z-50 transition-all h-fit ">
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

        {/* Profile Icon or Auth Buttons */}
        <div className="hidden sm:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative flex gap-2 items-center">
              <Link href={'/create-blog'} className='bg-background  px-2 py-2 border-foreground border rounded-full text-foreground '>
                + Create Blog
              </Link>
              <FaUserCircle size={32} className="text-muted-foreground hover:text-primary cursor-pointer transition duration-200" />
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Menu Icon (Hamburger) */}
        <div className="sm:hidden flex items-center">
          <button className="text-3xl text-muted-foreground cursor-pointer" onClick={toggleMenu}>
           { isMobileMenuOpen ? '✖' : '☰' }
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-b border-b-primary/60 flex flex-col items-center space-y-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              className="text-lg text-foreground hover:text-primary transition duration-200"
            >
              {link.name}
            </Link>
          ))}
          {!isAuthenticated ?(
            <>
              <Link
                href="/login"
                className="text-lg text-foreground hover:text-primary transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn-brutual text-lg "
              >
                Sign Up
              </Link>
            </>
          ):(
            <div className="relative flex  gap-2 items-center">
              <Link href={'#'} className='bg-background  px-2 py-2 border-foreground border rounded-full text-foreground '>
                + Create Blog
              </Link>
              <FaUserCircle size={32} className="text-muted-foreground hover:text-primary cursor-pointer transition duration-200" />
            </div>
            )}
        </div>
      )}
    </nav>
  );
}
