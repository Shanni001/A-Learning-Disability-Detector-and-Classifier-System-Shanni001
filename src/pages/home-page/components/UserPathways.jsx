import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserPathways = () => {
  const [activePathway, setActivePathway] = useState('parent');

  const pathways = [
    {
      id: 'parent',
      title: 'Concerned Parents',
      subtitle: 'Get answers and support for your child',
      description: `Discover if your child has learning differences and get actionable insights.\nConnect with resources, specialists, and a supportive community.`,
      icon: 'Heart',
      color: 'blue',
      features: [
        'Comprehensive 15-minute assessment',
        'Detailed report with recommendations',
        'Access to specialist directory',
        'Parent support community'
      ],
      cta: 'Start Assessment',
      ctaLink: '/results-dashboard'
    },
    {
      id: 'educator',
      title: 'Educational Professionals',
      subtitle: 'Empower your students with insights',
      description: `Identify learning challenges early and create effective accommodation plans.\nAccess professional tools and classroom resources.`,
      icon: 'GraduationCap',
      color: 'green',
      features: [
        'Bulk student assessments',
        'Classroom accommodation guides',
        'Progress tracking tools',
        'Professional development resources'
      ],
      cta: 'Explore Tools',
      ctaLink: '/resource-center'
    },
    {
      id: 'student',
      title: 'Students',
      subtitle: 'Understand your learning style',
      description: `Take control of your learning journey and discover your strengths.\nConnect with peers and build confidence.`,
      icon: 'User',
      color: 'purple',
      features: [
        'Self-paced assessment',
        'Strength-based results',
        'Peer community access',
        'Study strategy recommendations'
      ],
      cta: 'Discover Strengths',
      ctaLink: '/community-hub'
    },
    {
      id: 'clinician',
      title: 'Healthcare Providers',
      subtitle: 'Advanced diagnostic tools',
      description: `Access comprehensive assessment tools and detailed reporting.\nStreamline your diagnostic process with AI-powered insights.`,
      icon: 'Stethoscope',
      color: 'indigo',
      features: [
        'Clinical-grade assessments',
        'Detailed diagnostic reports',
        'Patient management system',
        'Research collaboration tools'
      ],
      cta: 'Professional Access',
      ctaLink: '/support-center'
    }
  ];

  const getColorClasses = (color, variant = 'default') => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        icon: 'bg-blue-100 text-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        icon: 'bg-green-100 text-green-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        icon: 'bg-purple-100 text-purple-600'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-600',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        icon: 'bg-indigo-100 text-indigo-600'
      }
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Choose Your Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every learner deserves clarity. Find your pathway to understanding and support.
          </p>
        </div>

        {/* Pathway Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {pathways?.map((pathway) => {
            const colors = getColorClasses(pathway?.color);
            const isActive = activePathway === pathway?.id;
            
            return (
              <button
                key={pathway?.id}
                onClick={() => setActivePathway(pathway?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? `${colors?.bg} ${colors?.text} ${colors?.border} border shadow-soft` 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={pathway?.icon} size={20} />
                <span>{pathway?.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Content */}
        {pathways?.map((pathway) => {
          if (activePathway !== pathway?.id) return null;
          
          const colors = getColorClasses(pathway?.color);
          
          return (
            <div key={pathway?.id} className="animate-gentle-fade-in">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 ${colors?.bg} ${colors?.text} rounded-full text-sm font-medium ${colors?.border} border`}>
                      <Icon name={pathway?.icon} size={16} />
                      <span>For {pathway?.title}</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground">
                      {pathway?.subtitle}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground whitespace-pre-line">
                      {pathway?.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {pathway?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 ${colors?.icon} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <Icon name="Check" size={14} />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={pathway?.ctaLink}>
                      <Button 
                        variant="default" 
                        size="lg"
                        className={`${colors?.button} text-white warmth-transition`}
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        {pathway?.cta}
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative">
                  <div className={`${colors?.bg} rounded-2xl p-8 card-elevation`}>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className={`w-16 h-16 ${colors?.icon} rounded-xl flex items-center justify-center`}>
                          <Icon name={pathway?.icon} size={32} />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Success Rate</p>
                          <p className={`text-2xl font-bold ${colors?.text}`}>98%</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-soft">
                          <span className="font-medium text-foreground">Assessment Time</span>
                          <span className={`${colors?.text} font-semibold`}>15 min</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-soft">
                          <span className="font-medium text-foreground">Report Delivery</span>
                          <span className={`${colors?.text} font-semibold`}>Instant</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-soft">
                          <span className="font-medium text-foreground">Support Access</span>
                          <span className={`${colors?.text} font-semibold`}>24/7</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center">
                          Join thousands who found clarity
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-success to-secondary text-white px-4 py-2 rounded-full text-sm font-medium shadow-medium">
                    Most Popular
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UserPathways;