import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showHoverBox, setShowHoverBox] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
        setShowHoverBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Products", href: "/#products" },
  { name: "Features", href: "/#features" },
];

  const scrollToSection = (href: string) => {
  if (href === "/") {
    navigate("/");
    setIsMenuOpen(false);
    return;
  }

  if (href.startsWith("/#")) {
    const elementId = href.substring(2); // # کے بعد کا حصہ
    if (location.pathname !== "/") {
      navigate("/"); // پہلے homepage پر جاؤ
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // تھوڑا delay تاکہ page load ہو جائے
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
  setIsMenuOpen(false);
};

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsUserMenuOpen(false);
    setShowHoverBox(false);
    navigate("/");
  };

  const handleAvatarHover = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowHoverBox(true);
  };

  const handleAvatarLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isUserMenuOpen) {
        setShowHoverBox(false);
      }
    }, 300);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setShowHoverBox(false);
  };

  const getProfileImage = () => {
    if (!user?.profileImage) return null;
    
    if (typeof user.profileImage === 'string') {
      return user.profileImage;
    }
    
    if (typeof user.profileImage === 'object' && user.profileImage.url) {
      return user.profileImage.url;
    }
    
    return null;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo}
              alt="Pulse Logo - Blue triangle with white M"
              className="h-12 w-auto"
            />
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
            <Link to="/contact">
              <Button variant="outline" className="mr-4">Contact Us</Button>
            </Link>
            
            {/* User Menu */}
            {user ? (
              <div 
                className="relative"
                ref={userMenuRef}
                onMouseEnter={handleAvatarHover}
                onMouseLeave={handleAvatarLeave}
              >
                {/* Trigger Button */}
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    {getProfileImage() ? (
                      <img 
                        src={getProfileImage()} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-primary" />
                    )}
                  </div>
                </button>

                {/* Hover Mini Box */}
                {showHoverBox && !isUserMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-background border border-border rounded-lg shadow-lg p-3 text-sm z-50">
                    <p className="font-semibold text-primary mb-1">Mughal's Account</p>
                    <hr className="my-2 border-border" />
                    <p className="font-medium truncate">{user.userName}</p>
                    <p className="text-muted-foreground text-xs truncate">{user.email}</p>
                  </div>
                )}

                {/* Expanded Dropdown on Click */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-12 w-64 bg-background border border-border rounded-lg shadow-lg py-4 px-3 z-50">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mb-2">
                        {getProfileImage() ? (
                          <img 
                            src={getProfileImage()} 
                            alt="Profile" 
                            className="w-16 h-16 object-cover"
                          />
                        ) : (
                          <User size={28} className="text-primary" />
                        )}
                      </div>
                      <p className="font-semibold text-center">{user.userName}</p>
                      <p className="text-xs text-muted-foreground text-center mt-1">{user.email}</p>
                    </div>

                    <hr className="my-3 border-border" />

                    {/* Actions */}
                    <Link 
                      to="/profile" 
                      className="flex items-center px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors mb-1"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Profile Settings
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors text-red-600"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                {/* <Button className="btn-primary">Login</Button> */}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full mb-4">Contact Us</Button>
              </Link>
              
              {user ? (
                <div className="border-t border-border pt-4">
                  <div className="flex items-center space-x-3 mb-4 p-2 bg-accent rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                      {getProfileImage() ? (
                        <img 
                          src={getProfileImage()} 
                          alt="Profile" 
                          className="w-10 h-10 object-cover"
                        />
                      ) : (
                        <User size={18} className="text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{user.userName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings size={18} className="mr-2" />
                    Profile Settings
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="btn-primary w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;