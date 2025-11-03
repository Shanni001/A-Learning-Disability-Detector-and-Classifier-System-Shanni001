import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedSection = () => {
  const featuredResources = [
    {
      id: 1,
      title: "Complete ADHD Intervention Guide",
      description: "Comprehensive strategies for managing ADHD in classroom settings with practical implementation tips and real-world case studies.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      type: "Guide",
      difficulty: "Intermediate",
      duration: "45 min read",
      rating: 4.8,
      downloads: 2340,
      isNew: true,
      tags: ["ADHD", "Classroom Management", "Evidence-Based"]
    },
    {
      id: 2,
      title: "Nutrition & Learning Performance",
      description: "Research-backed nutritional strategies that support cognitive function and learning outcomes for children with learning differences.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=250&fit=crop",
      type: "Video Series",
      difficulty: "Beginner",
      duration: "3 hours",
      rating: 4.9,
      downloads: 1890,
      isNew: false,
      tags: ["Nutrition", "Cognitive Health", "Parent Guide"]
    },
    {
      id: 3,
      title: "Dyslexia Reading Techniques",
      description: "Multi-sensory reading approaches specifically designed for students with dyslexia, including phonics-based interventions.",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/book-1867171_1280.jpg?w=400&h=250&fit=crop",
      type: "Interactive Module",
      difficulty: "Advanced",
      duration: "2 hours",
      rating: 4.7,
      downloads: 1567,
      isNew: true,
      tags: ["Dyslexia", "Reading", "Multi-sensory"]
    }
  ];

  const quickStats = [
    { label: "Total Resources", value: "718", icon: "FileText", color: "text-primary" },
    { label: "Success Stories", value: "123", icon: "Heart", color: "text-empowerment-green" },
    { label: "Expert Contributors", value: "45", icon: "Users", color: "text-illumination-gold" },
    { label: "Languages", value: "2", icon: "Globe", color: "text-authority-purple" }
  ];

  return (
    <div className="bg-gradient-illumination text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Resource Center</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Curated library of evidence-based strategies, nutritional guidance, and educational materials 
            to support every child's learning journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {quickStats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat?.icon} size={24} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat?.value}</div>
              <div className="text-sm text-white/80">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources?.map((resource) => (
              <div key={resource?.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-fast empowerment-hover">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={resource?.image}
                    alt={resource?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {resource?.isNew && (
                      <span className="px-2 py-1 text-xs font-medium bg-empowerment-green text-white rounded-full">
                        New
                      </span>
                    )}
                    <span className="px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-full">
                      {resource?.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {resource?.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-3 line-clamp-2">
                    {resource?.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/70 mb-3">
                    <span>{resource?.duration}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-illumination-gold fill-current" />
                      <span>{resource?.rating}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Explore Resource
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 breathing-animation"
            iconName="Search"
            iconPosition="left"
          >
            Explore All Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;