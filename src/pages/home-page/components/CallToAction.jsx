import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const benefits = [
    {
      icon: 'Clock',
      title: 'Quick & Easy',
      description: 'Complete assessment in just 15 minutes'
    },
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'HIPAA compliant with full data protection'
    },
    {
      icon: 'Target',
      title: 'Highly Accurate',
      description: '98% accuracy rate validated by professionals'
    },
    {
      icon: 'Users',
      title: 'Expert Support',
      description: '24/7 access to learning specialists'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Take Assessment',
      description: 'Complete our comprehensive 15-minute evaluation',
      icon: 'ClipboardList'
    },
    {
      number: '2',
      title: 'Get Results',
      description: 'Receive detailed insights and recommendations',
      icon: 'BarChart3'
    },
    {
      number: '3',
      title: 'Take Action',
      description: 'Access resources and connect with specialists',
      icon: 'ArrowRight'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium border border-success/20">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Start Your Journey Today
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Ready to Unlock Your
              <span className="text-primary block">Learning Potential?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of families who have found clarity and support through our comprehensive assessment platform. 
              Understanding your learning profile is the first step toward success.
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/results-dashboard">
              <Button 
                variant="default" 
                size="xl"
                className="warmth-transition hero-breathing"
                iconName="Brain"
                iconPosition="left"
              >
                Start Free Assessment
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="xl"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Talk to Specialist
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-blue-600" />
              <span>Results in 15 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-green-600" />
              <span>100% confidential</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits?.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-soft card-elevation text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{benefit?.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            How It Works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps?.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-6 shadow-soft card-elevation text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold">
                      {step?.number}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Icon name={step?.icon} size={16} color="white" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{step?.title}</h4>
                    <p className="text-muted-foreground">{step?.description}</p>
                  </div>
                </div>
                
                {/* Connector Arrow */}
                {index < steps?.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <Icon name="ArrowRight" size={24} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA with Urgency */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                Don't Wait - Early Identification Makes All the Difference
              </h3>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                The sooner learning differences are identified, the more effective interventions become. 
                Take the first step toward understanding and support today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/results-dashboard">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50"
                  iconName="Zap"
                  iconPosition="left"
                >
                  Start Assessment Now
                </Button>
              </Link>
              
              <Link to="/support-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Get Support
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>50,000+ families served</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} />
                <span>4.9/5 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;