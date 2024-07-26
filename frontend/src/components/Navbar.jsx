import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleScroll = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <FadeIn direction="down" delay={0.1} fullWidth zIndex={10}>
      <div className="relative flex flex-row w-full h-[10vh] min-h-[60px] bg-[#05140D] items-center justify-between px-4 md:px-5 lg:px-10">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <X className="h-8 w-8 text-white" /> : <Menu className="h-8 w-8 text-white" />}
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-row items-center justify-center cursor-pointer">
          <img className="md:h-[50px] h-[30px] md:pr-2" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721187808/srktgdcijec0zqmlgvbh.png" alt="Logo" />
          <h1 className="md:text-4xl text-3xl font-semibold text-white cursor-pointer">Finvest</h1>
        </Link>

        {/* Navigation Links */}
        <ul className={`fixed md:static flex flex-col md:flex-row items-center justify-between top-[10vh] md:top-0 left-0 md:left-auto w-[100vw] md:w-auto bg-[#05140D] md:bg-transparent transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:transform-none md:translate-x-0 z-[50]`}>
          <li className="text-lg text-white p-4 cursor-pointer" onClick={closeMenu}>
          <Link to="/">
          Home
          </Link>
          </li>
          <Link to="/dashboard">
          <li className="text-lg text-white p-4 cursor-pointer" onClick={closeMenu}>Dashboard</li>

          </Link>

          <li className="text-lg text-white p-4 cursor-pointer" onClick={closeMenu}>
          <Link to="/posts">
          Posts
          </Link></li>
          <li className="text-lg text-white p-4 cursor-pointer" onClick={closeMenu}>
          <Link to="/projects">
          Projects
          </Link>
          </li>
          
        </ul>

        {/* Login / Sign Up Button */}
        <Link to="/signup">
          <Button variant="custom" size="lg" className="md:block m-0">
            Sign Up
          </Button>
        </Link>

      </div>
    </FadeIn>
  );
}

export default Navbar;
