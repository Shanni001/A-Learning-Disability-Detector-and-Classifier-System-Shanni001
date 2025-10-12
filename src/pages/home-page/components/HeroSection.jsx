import React from 'react';

import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-200 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-gentle-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                <Icon name="Sparkles" size={16} className="mr-2" />
                Trusted by 50,000+ Families
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Understanding
                <span className="text-primary block">Unlocks Potential</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl empathy-typography">
                Transform learning challenges into strengths with our science-backed assessment platform. 
                Every learner deserves clarity, support, and a pathway to success.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="default" 
                size="lg" 
                className="warmth-transition hero-breathing"
                iconName="Brain"
                iconPosition="left"
              >
                Start Free Assessment
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 border-t border-border/50">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-green-600" />
                <span>Kenya Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Award" size={16} className="text-blue-600" />
                <span>Kenya Endorsed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} className="text-purple-600" />
                <span>98% Accuracy Rate</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-strong p-8 card-elevation">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Assessment Preview</h3>
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span>15 min</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="BookOpen" size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Reading Assessment</p>
                      <p className="text-sm text-muted-foreground">Comprehension & Processing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="Calculator" size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Math Skills</p>
                      <p className="text-sm text-muted-foreground">Number Sense & Logic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Icon name="Brain" size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Cognitive Processing</p>
                      <p className="text-sm text-muted-foreground">Memory & Attention</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">Ready to start</span>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-0 animate-progress-fill"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-success to-secondary rounded-full flex items-center justify-center shadow-medium">
              <Icon name="Zap" size={24} color="white" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-warning to-orange-500 rounded-full flex items-center justify-center shadow-medium">
              <Icon name="Star" size={16} color="white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;