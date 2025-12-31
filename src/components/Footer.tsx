import { Phone, Mail, MapPin } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={logo} 
                alt="Pulse Logo"
                className="h-12 w-auto filter invert"
              />
              
            </div>
            <p className="text-background/80 mb-4">
              Premium mineral water with custom labeling for restaurants across Pakistan.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <span>+92 300 2451981</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span>Pulseofficial@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} />
                <span>Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <div><a href="/#home" className="hover:text-white transition-colors">Home</a></div>
              <div><a href="/#about" className="hover:text-white transition-colors">About</a></div>
              <div><a href="/#products" className="hover:text-white transition-colors">Products</a></div>
              <div><a href="/contact" className="hover:text-white transition-colors">Contact</a></div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2025 Pulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;