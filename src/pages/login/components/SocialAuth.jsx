import React from 'react';

import Icon from '../../../components/AppIcon';

import SocialLoginButtons from 'components/ui/SocialLoginButtons';





const SocialAuth = ({ onSocialLogin, loading }) => {
  return <SocialLoginButtons onSocialLogin={onSocialLogin} loading={loading} />;
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'github',
      name: 'Github',
      icon: 'Square',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            type="button"
            onClick={() => handleSocialLogin(provider?.id)}
            disabled={loading}
            className={`social-button ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Icon 
              name={provider?.icon} 
              size={20} 
              color={provider?.id === 'google' ? '#4285f4' : 'currentColor'} 
            />
            <span>Continue with {provider?.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-200">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-200">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SocialAuth;