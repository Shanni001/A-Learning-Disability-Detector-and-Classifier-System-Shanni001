import React from 'react';
import Icon from 'components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-educational mb-6">
        <Icon 
          name="Calculator" 
          size={32} 
          className="text-primary-foreground" 
        />
      </div>
      
      <h1 className="text-3xl font-semibold text-foreground mb-2">
        Welcome Back
      </h1>
      
      <p className="text-muted-foreground text-base max-w-md mx-auto">
        Sign in to your Abacus Learning Portal account to continue your educational journey
      </p>
    </div>
  );
};

export default WelcomeHeader;