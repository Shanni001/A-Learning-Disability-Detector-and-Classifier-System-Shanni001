import React from 'react';

const FormNavigation = ({ currentScreen, onNavigate }) => {
  const navigationData = {
    login: {
      label: "Don\'t have an account? Create one",
      path: "/registration",
      context: "registration"
    },
    registration: {
      label: "Already have an account? Sign in",
      path: "/login", 
      context: "login"
    }
  };

  const navItem = navigationData?.[currentScreen];

  if (!navItem) return null;

  const handleNavigation = (e) => {
    e?.preventDefault();
    if (onNavigate) {
      onNavigate(navItem?.path, navItem?.context);
    }
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleNavigation}
        className="text-sm text-muted-foreground hover:text-primary transition-educational underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
      >
        {navItem?.label}
      </button>
    </div>
  );
};

export default FormNavigation;