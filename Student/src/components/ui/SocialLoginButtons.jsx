import React from 'react';

import Icon from '../AppIcon';

const SocialLoginButtons = ({ onSocialLogin, loading = false, mode = 'signin' }) => {
const buttonText = mode === 'signin' ? 'Sign in with' : 'Sign up with';

  const socialProviders = [
    {
      provider: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverColor: 'hover:bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      provider: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      hoverColor: 'hover:bg-gray-100',
      iconColor: 'text-gray-900'
    },
    {
      provider: 'github',
      name: 'Github',
      icon: 'Github',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2">
        {socialProviders?.map((social) => (
          <button
            key={social?.provider}
            type="button"
            onClick={() => onSocialLogin?.(social?.provider)}
            disabled={loading}
            className={`
              relative inline-flex items-center justify-center px-4 py-2 
              ${social?.bgColor} ${social?.borderColor} ${social?.hoverColor}
              border text-sm font-medium rounded-md 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
            `}
          >
            <Icon 
              name={social?.icon} 
              size={18} 
              className={`${social?.iconColor} ${loading ? 'opacity-50' : ''}`}
            />
            <span className="ml-2 text-gray-700 hidden sm:inline">
              {social?.name}
            </span>
            <span className="text-gray-700 sm:hidden">
              {buttonText} {social?.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLoginButtons;