import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [filter, setFilter] = useState('all');

  const stories = [
    {
      id: 1,
      type: 'parent',
      name: 'Sarah Martinez',
      role: 'Mother of Emma (Age 8)',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      story: `Emma was struggling in school and we didn't know why. The teachers said she was just not trying hard enough, but I knew something else was going on.\n\nLearnAssess Pro helped us discover that Emma has dyslexia and ADHD. The detailed report gave us exactly what we needed to get her the right support at school.\n\nNow Emma is thriving with her accommodations and she's so much happier. She even told me last week that she loves reading now!`,
      outcome: 'Emma improved her reading level by 2 grades in 6 months',
      location: 'Austin, TX',
      date: 'September 2024',
      rating: 5,
      tags: ['dyslexia', 'ADHD', 'elementary']
    },
    {
      id: 2,
      type: 'educator',
      name: 'Dr. Michael Chen',
      role: 'Special Education Coordinator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      story: `As a special education coordinator, I've used many assessment tools, but LearnAssess Pro stands out for its accuracy and ease of use.\n\nThe platform helped us identify learning differences in 15 students who had been overlooked by traditional methods. The detailed reports made it easy to create effective IEPs.\n\nWhat I love most is how the platform presents results in a strength-based way that empowers both students and families.`,
      outcome: '95% of identified students showed significant improvement',location: 'Portland, OR',date: 'August 2024',
      rating: 5,
      tags: ['professional', 'IEP', 'assessment']
    },
    {
      id: 3,
      type: 'student',name: 'Alex Thompson',role: 'High School Junior',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      story: `I always felt different from my classmates but didn't know why. Math was impossible for me, and I thought I was just stupid.\n\nTaking the LearnAssess Pro assessment changed everything. I learned I have dyscalculia, but also that I have strong visual-spatial skills.\n\nNow I use accommodations like extra time and a calculator, and I'm actually doing well in my classes. I'm even thinking about studying architecture in college!`,
      outcome: 'Improved math grades from D to B+ with accommodations',
      location: 'Denver, CO',
      date: 'October 2024',
      rating: 5,
      tags: ['dyscalculia', 'high-school', 'accommodations']
    },
    {
      id: 4,
      type: 'clinician',
      name: 'Dr. Jennifer Walsh',
      role: 'Pediatric Neuropsychologist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      story: `LearnAssess Pro has revolutionized my practice. The AI-powered insights complement my clinical expertise perfectly.\n\nThe platform's comprehensive assessment battery saves me hours of testing time while providing incredibly detailed results. My patients' families love the clear, actionable reports.\n\nI've seen a 40% increase in early intervention success rates since incorporating this platform into my practice.`,
      outcome: '40% increase in early intervention success rates',location: 'Boston, MA',date: 'September 2024',
      rating: 5,
      tags: ['clinical', 'neuropsychology', 'early-intervention']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Stories', icon: 'Users' },
    { id: 'parent', label: 'Parents', icon: 'Heart' },
    { id: 'educator', label: 'Educators', icon: 'GraduationCap' },
    { id: 'student', label: 'Students', icon: 'User' },
    { id: 'clinician', label: 'Clinicians', icon: 'Stethoscope' }
  ];

  const filteredStories = filter === 'all' ? stories : stories?.filter(story => story?.type === filter);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % filteredStories?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [filteredStories?.length]);

  const currentStory = filteredStories?.[activeStory] || filteredStories?.[0];

  if (!currentStory) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how LearnAssess Pro has transformed lives and unlocked potential for thousands of learners.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters?.map((filterOption) => (
            <button
              key={filterOption?.id}
              onClick={() => {
                setFilter(filterOption?.id);
                setActiveStory(0);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === filterOption?.id
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={filterOption?.icon} size={16} />
              <span>{filterOption?.label}</span>
            </button>
          ))}
        </div>

        {/* Story Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div className="space-y-8 animate-gentle-fade-in">
            {/* Header */}
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Image
                  src={currentStory?.avatar}
                  alt={currentStory?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-white">
                  <Icon name="Check" size={12} color="white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground">{currentStory?.name}</h3>
                <p className="text-muted-foreground">{currentStory?.role}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{currentStory?.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{currentStory?.date}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(currentStory?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                ))}
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-4">
              <blockquote className="text-lg text-foreground leading-relaxed whitespace-pre-line italic">
                "{currentStory?.story}"
              </blockquote>
              
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-success">Outcome</p>
                    <p className="text-foreground">{currentStory?.outcome}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {currentStory?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Story Navigation */}
          <div className="space-y-8">
            {/* Story Carousel */}
            <div className="bg-white rounded-2xl p-8 shadow-strong card-elevation">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-foreground">Success Stories</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{activeStory + 1} of {filteredStories?.length}</span>
                  </div>
                </div>

                {/* Story Thumbnails */}
                <div className="space-y-3">
                  {filteredStories?.map((story, index) => (
                    <button
                      key={story?.id}
                      onClick={() => setActiveStory(index)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300 ${
                        index === activeStory
                          ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
                      }`}
                    >
                      <Image
                        src={story?.avatar}
                        alt={story?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{story?.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{story?.role}</p>
                      </div>
                      <Icon 
                        name="ChevronRight" 
                        size={16} 
                        className={`${index === activeStory ? 'text-primary' : 'text-muted-foreground'}`} 
                      />
                    </button>
                  ))}
                </div>

                {/* Progress Indicators */}
                <div className="flex space-x-2">
                  {filteredStories?.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeStory ? 'bg-primary flex-1' : 'bg-muted w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Ready to write your success story?</p>
              <Button 
                variant="default" 
                size="lg"
                className="warmth-transition"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Start Your Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;