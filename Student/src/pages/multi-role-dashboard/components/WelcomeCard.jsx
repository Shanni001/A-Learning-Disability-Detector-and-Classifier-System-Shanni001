import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeCard = ({ userProfile, currentRole }) => {
  const getWelcomeMessage = () => {
    const timeOfDay = new Date()?.getHours() < 12 ? 'morning' : new Date()?.getHours() < 18 ? 'afternoon' : 'evening';
    
    const name = userProfile?.full_name || "there";

    switch (currentRole) {
      case 'student':
        return {
           greeting: `Good ${timeOfDay}, ${name}!`,
         
          message: "Ready to discover your learning superpowers today?",
          //cta: "Start New Assessment",
          icon: "Sparkles"
        };
      case 'teacher':
        return {
          greeting: `Good ${timeOfDay}, ${userProfile.full_name}!`,
          message: "Let's help your students shine brighter today.",
          cta: "Create Assessment",
          icon: "BookOpen"
        };
      case 'parent':
        return {
          greeting: `Good ${timeOfDay}, ${userProfile?.name}!`,
          message: `Track ${userProfile?.childName || "your child"}'s learning journey and celebrate their progress.`,
          cta: "View Progress",
          icon: "Heart"
        };
      default:
        return {
          greeting: `Good ${timeOfDay}!`,
          message: "Welcome to AngazaLearn - illuminating every child's potential.",
          cta: "Get Started",
          icon: "Star"
        };
    }
  };

  const welcome = getWelcomeMessage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl shadow-soft">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={welcome?.icon} size={24} className="text-white animate-pulse" />
              <h2 className="text-xl font-bold">{welcome?.greeting}</h2>
            </div>
            <p className="text-white/90 mb-4 max-w-md">{welcome?.message}</p>
            
            <div className="flex items-center space-x-4">
            
              
              {currentRole === 'student' && (
                <div className="flex items-center space-x-2 text-white/80">
                  
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden sm:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="GraduationCap" size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
    </div>
  );
};

export default WelcomeCard;