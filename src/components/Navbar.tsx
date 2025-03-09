
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      closeMenu();
      setIsSearchOpen(false);
      // Navigate to search results page with query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-10 text-2xl font-bold tracking-tight"
          >
            SweetTreats
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-foreground/80 hover:text-foreground transition-colors duration-200",
                location.pathname === "/" && "font-medium text-foreground"
              )}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "text-foreground/80 hover:text-foreground transition-colors duration-200",
                location.pathname === "/products" && "font-medium text-foreground"
              )}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-foreground/80 hover:text-foreground transition-colors duration-200",
                location.pathname === "/about" && "font-medium text-foreground"
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-foreground/80 hover:text-foreground transition-colors duration-200",
                location.pathname === "/contact" && "font-medium text-foreground"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={toggleSearch}
              className="btn-icon relative z-10"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart Button */}
            <Link 
              to="/cart" 
              className="btn-icon relative z-10"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="btn-icon md:hidden relative z-10"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-6">
          <nav className="flex flex-col space-y-6 text-lg">
            <Link 
              to="/" 
              className={cn(
                "hover:text-accent transition-colors duration-200 py-2",
                location.pathname === "/" && "font-medium text-accent"
              )}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "hover:text-accent transition-colors duration-200 py-2",
                location.pathname === "/products" && "font-medium text-accent"
              )}
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "hover:text-accent transition-colors duration-200 py-2",
                location.pathname === "/about" && "font-medium text-accent"
              )}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "hover:text-accent transition-colors duration-200 py-2",
                location.pathname === "/contact" && "font-medium text-accent"
              )}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transform transition-all duration-300 ease-in-out",
          isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-end p-6">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="btn-icon"
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>
        <div className="container mx-auto px-4 pt-10">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full h-14 px-6 rounded-full bg-white border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-icon bg-accent text-white"
                aria-label="Submit search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
