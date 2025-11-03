import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import Icon from "../AppIcon";
import Button from "./Button";

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    
  ];

  const moreItems = [];

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
    if (onMenuToggle) onMenuToggle(!showMobileMenu);
  };

  const isActivePath = (path) => location?.pathname === path;

  // Navigation handlers
  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/registration");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-fast ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-soft border-b border-border"
            : "bg-white"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-fast"
                aria-label="Toggle menu"
              >
                <Icon
                  name={showMobileMenu ? "X" : "Menu"}
                  size={24}
                  className="text-foreground"
                />
              </button>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                        fill="currentColor"
                        className="animate-pulse"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        fill="rgba(255,255,255,0.3)"
                        className="animate-breathe"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-empowerment-green rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={10} className="text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-foreground tracking-tight">
                    Angaza<span className="text-empowerment-green">Learn</span>
                  </h1>
                  <p className="text-xs text-muted-foreground -mt-1">
                    Illuminating Every Child's Potential
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)} //  Use navigate instead of href
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
                    isActivePath(item.path)
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoginClick}
                className="hidden sm:flex items-center space-x-2"
              >
                <Icon name="User" size={16} />
                <span className="ml-1">Login</span>
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handleSignupClick}
                className="bg-gradient-primary hover:opacity-90 breathing-animation"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                <span>Sign Up</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          ></div>

          <div className="fixed top-16 left-0 right-0 bg-white border-b border-border shadow-elevated">
            <nav className="px-4 py-6 space-y-2">
              {[...navigationItems, ...moreItems].map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    handleMobileMenuToggle();
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-fast touch-target ${
                    isActivePath(item.path)
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
