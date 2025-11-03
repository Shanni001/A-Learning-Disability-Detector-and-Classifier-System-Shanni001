import React from 'react';

const AuthenticationContainer = ({ children, screenType = 'login' }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-educational mb-4">
            <svg
              className="w-8 h-8 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3h18v4H3V3zm0 6h18v4H3V9zm0 6h18v4H3v-4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="5" r="1" fill="currentColor" />
              <circle cx="7" cy="11" r="1" fill="currentColor" />
              <circle cx="7" cy="17" r="1" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            AngazaLearn Learning Portal
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {screenType === 'login' ?'Welcome back! Please sign in to continue.' :'Create your account to start learning.'
            }
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card rounded-lg shadow-educational p-6 border border-border">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 Abacus Learning Portal. Empowering education in Kenya.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationContainer;

