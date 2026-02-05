import { Phone, Mail, MapPin } from 'lucide-react';
import isparksLogo from '@/assets/isparks-logo.png';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div className="lg:col-span-1">
              <img 
                src={isparksLogo} 
                alt="iSparks Technologies" 
                className="h-12 mb-4"
              />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Empowering enterprises with AI-enabled, future-ready IT solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['Home', 'About', 'IT Services', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
                Our Services
              </h4>
              <ul className="space-y-3">
                {['AI Chatbot', 'Doc-AI Extraction', 'Website Development', 'Semiconductor Testing', 'App Development'].map((service) => (
                  <li key={service}>
                    <span className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-300 cursor-default">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <a href="tel:+6591850551" className="text-foreground font-medium text-sm hover:text-primary transition-colors">
                      +65 9185 0551
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <a href="mailto:sales@isparkstech.com" className="text-foreground font-medium text-sm hover:text-primary transition-colors break-all">
                      sales@isparkstech.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Address</p>
                    <span className="text-foreground font-medium text-sm">
                      50 Tagore Lane #05-06 (IJ),<br />
                      Entrepreneur Centre, Singapore
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} iSparks Technologies. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
