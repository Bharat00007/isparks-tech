import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import isparksLogo from '@/assets/isparks-logo-new.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', isRoute: false },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'IT services', href: '#services', isRoute: false },
    { name: 'Blogs', href: '/blogs', isRoute: true },
    { name: 'Contact us', href: '#contact', isRoute: false },
  ];

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      e.preventDefault();
      window.location.href = '/' + href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_-10px_hsl(207_90%_30%/0.15)]' 
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={isparksLogo} 
              alt="iSparks Technologies" 
              className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative z-10">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="nav-link text-sm cursor-pointer select-none"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link text-sm cursor-pointer select-none"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={(e) => handleHashClick(e, link.href)}
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'max-h-80 opacity-100 py-4' : 'max-h-0 opacity-0'
          } border-t border-border/50`}
        >
          {navLinks.map((link, index) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className={`block py-3 nav-link text-sm cursor-pointer transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className={`block py-3 nav-link text-sm cursor-pointer transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms' }}
                onClick={(e) => {
                  handleHashClick(e, link.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            )
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
