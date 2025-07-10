'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };
  
  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold text-primary">Dede Godspower Oluwatomisin</Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-8">
              {links.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link 
                    href={link.href}
                    className={cn(
                      'relative inline-block py-2 text-base font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground/70'
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.span 
                        layoutId="navbar-underline"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex items-center ml-8 space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mr-2"
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <motion.div 
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className={cn(
          'fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-xl z-50 flex flex-col',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
            <X size={24} />
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col justify-center px-8">
          <ul className="space-y-6">
            {links.map(link => (
              <motion.li key={link.href} variants={menuItemVariants}>
                <Link 
                  href={link.href}
                  className={cn(
                    'text-xl font-medium transition-colors hover:text-primary flex items-center',
                    pathname === link.href ? 'text-primary' : 'text-foreground'
                  )}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          <motion.div 
            variants={menuItemVariants}
            className="mt-12 flex items-center space-x-4"
          >
            <Link href="https://github.com/GPower001" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
            </Link>
          </motion.div>
          
          <motion.div variants={menuItemVariants} className="mt-8">
            <Button asChild className="w-full">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}