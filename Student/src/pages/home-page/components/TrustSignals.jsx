import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      name: 'KenyaCompliant',
      description: 'Healthcare data protection certified',
      icon: 'Shield',
      color: 'green'
    },
    {
      name: 'APA Endorsed',
      description: 'American Psychological Association approved',
      icon: 'Award',
      color: 'blue'
    },
    {
      name: 'FERPA Compliant',
      description: 'Educational records privacy protected',
      icon: 'Lock',
      color: 'purple'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management certified',
      icon: 'CheckCircle',
      color: 'indigo'
    }
  ];

  const partnerships = [
    {
      name: 'Children\'s Hospital Network',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=120&h=60&fit=crop',
      type: 'Healthcare Partner'
    },
    {
      name: 'National Education Association',
      logo: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=120&h=60&fit=crop',
      type: 'Education Partner'
    },
    {
      name: 'Learning Disabilities Association',
      logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&h=60&fit=crop',
      type: 'Advocacy Partner'
    },
    {
      name: 'International Dyslexia Association',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&h=60&fit=crop',
      type: 'Research Partner'
    }
  ];

  const statistics = [
    {
      number: '50,000+',
      label: 'Families Served',
      icon: 'Users',
      description: 'Trusted by families nationwide'
    },
    {
      number: '98%',
      label: 'Accuracy Rate',
      icon: 'Target',
      description: 'Clinically validated results'
    },
    {
      number: '15 min',
      label: 'Assessment Time',
      icon: 'Clock',
      description: 'Quick and comprehensive'
    },
    {
      number: '24/7',
      label: 'Support Available',
      icon: 'Headphones',
      description: 'Always here to help'
    }
  ];

  const awards = [
    {
      title: 'Best EdTech Innovation 2024',
      organization: 'Education Technology Awards',
      year: '2024',
      icon: 'Trophy'
    },
    {
      title: 'Healthcare Innovation Excellence',
      organization: 'Digital Health Awards',
      year: '2024',
      icon: 'Medal'
    },
    {
      title: 'Accessibility Champion',
      organization: 'Inclusive Design Awards',
      year: '2023',
      icon: 'Heart'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100',
      indigo: 'text-indigo-600 bg-indigo-100'
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform meets the highest standards for security, accuracy, and clinical excellence.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics?.map((stat, index) => (
            <div key={index} className="text-center space-y-4 trust-reveal">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name={stat?.icon} size={32} className="text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{stat?.number}</p>
                <p className="font-semibold text-foreground">{stat?.label}</p>
                <p className="text-sm text-muted-foreground">{stat?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Security & Compliance Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-soft card-elevation text-center space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${getColorClasses(cert?.color)}`}>
                  <Icon name={cert?.icon} size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{cert?.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Industry Recognition
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {awards?.map((award, index) => (
              <div key={index} className="bg-gradient-to-br from-warning/10 to-orange-50 rounded-lg p-6 border border-warning/20 text-center space-y-4">
                <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto">
                  <Icon name={award?.icon} size={24} className="text-warning" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{award?.title}</h4>
                  <p className="text-sm text-muted-foreground">{award?.organization}</p>
                  <p className="text-xs text-warning font-medium">{award?.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div>
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Trusted Partners
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerships?.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-soft card-elevation text-center space-y-4">
                <div className="h-16 flex items-center justify-center">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="max-h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{partner?.name}</h4>
                  <p className="text-xs text-muted-foreground">{partner?.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Join the Trusted Community
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the platform that healthcare professionals, educators, and families trust for accurate learning assessments.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-green-600" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-blue-600" />
                <span>Clinically Validated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-purple-600" />
                <span>Trusted Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;