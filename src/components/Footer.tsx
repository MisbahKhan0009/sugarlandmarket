
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              SweetTreats
            </Link>
            <p className="mt-4 text-muted-foreground">
              Handcrafted sweet delights made with premium ingredients and love.
              Bringing joy to your special moments since 2010.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-icon text-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-icon text-foreground hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-icon text-foreground hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products?category=cake" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Cakes
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=yogurt" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Yogurts
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=pastry" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Pastries
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=sweets" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Sweets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  123 Bakery Street, Sweet City, SC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                <a 
                  href="tel:+1-234-567-8900" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  (234) 567-8900
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                <a 
                  href="mailto:hello@sweettreats.com" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  hello@sweettreats.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} SweetTreats. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/shipping" 
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
