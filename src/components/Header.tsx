'use client'; // This directive marks the component as a Client Component

import { useState, useEffect } from 'react';
import { FaGithub, FaSun, FaMoon } from 'react-icons/fa';
import Image from 'next/image';
import Navbar from './navbar/Navbar';
import MobileNav from './navbar/MobileNav';

interface HeaderProps {
  setSection: (section: string) => void;
}

export default function Header({ setSection }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <header
      className={`flex justify-between items-center p-4 space-x-4 sticky top-0 border-b-4 border-rust-orange transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-opacity-70 bg-transparent' : 'bg-white dark:bg-black'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center sm:hidden">
          <MobileNav setSection={setSection} />
        </div>
        <span
          onClick={() => setSection('home')}
          className="text-2xl font-bold cursor-pointer hidden sm:block"
        >
          Rustcrab
        </span>
        <div className="hidden sm:block">
          <Navbar setSection={setSection} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://app.daily.dev/squads/rustdevs" target="_blank" rel="noopener noreferrer" className="text-2xl" title="Rustdevs on daily.dev">
          <Image src="/icons/daily.dev-icon.png" alt="daily.dev" width={24} height={24} />
        </a>
        <a href="https://github.com/FrancescoXX/rustcrab" target="_blank" rel="noopener noreferrer" className="text-2xl" title="GitHub repository">
          <FaGithub />
        </a>
        <button onClick={toggleDarkMode} className="text-2xl" title="Dark/Light mode">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}
