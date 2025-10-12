import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EducationalPreview = () => {
  const [activeCategory, setActiveCategory] = useState('understanding');

  const categories = [
    {
      id: 'understanding',
      title: 'Understanding Learning Differences',
      icon: 'Brain',
      color: 'blue'
    },
    {
      id: 'assessment',
      title: 'Assessment Process',
      icon: 'ClipboardList',
      color: 'green'
    },
    {
      id: 'support',
      title: 'Support Strategies',
      icon: 'Heart',
      color: 'purple'
    },
    {
      id: 'resources',
      title: 'Educational Resources',
      icon: 'BookOpen',
      color: 'orange'
    }
  ];

  const content = {
    understanding: {
      articles: [
        {
          title: 'What Are Learning Disabilities?',
          excerpt: `Learning disabilities are neurological differences that affect how the brain processes information.\nThey are not related to intelligence or motivation.`,
          readTime: '5 min read',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
          tags: ['Basics', 'Overview']
        },
        {
          title: 'Signs to Watch For in Children',
          excerpt: `Early identification is key to providing effective support.\nLearn the common signs across different age groups.`,
          readTime: '7 min read',
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop',
          tags: ['Early Signs', 'Children']
        },
        {
          title: 'Types of Learning Differences',
          excerpt: `Dyslexia, dyscalculia, ADHD, and more.\nUnderstand the different types and their characteristics.`,
          readTime: '10 min read',
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
          tags: ['Types', 'Detailed']
        }
      ]
    },
    assessment: {
      articles: [
        {
          title: 'How Our Assessment Works',
          excerpt: `Our comprehensive assessment uses AI-powered analysis combined with evidence-based testing methods.\nGet accurate results in just 15 minutes.`,
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
          tags: ['Process', 'Technology']
        },
        {
          title: 'Preparing for Assessment',
          excerpt: `Tips to help your child feel comfortable and confident during the assessment process.\nCreate the best environment for accurate results.`,
          readTime: '4 min read',
          image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop',
          tags: ['Preparation', 'Tips']
        },
        {
          title: 'Understanding Your Results',
          excerpt: `Learn how to interpret your assessment report and understand what the findings mean for your child\'s learning journey.`,readTime: '8 min read',image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
          tags: ['Results', 'Interpretation']
        }
      ]
    },
    support: {
      articles: [
        {
          title: 'Classroom Accommodations Guide',
          excerpt: `Practical strategies teachers can implement to support students with learning differences.\nEvidence-based approaches that work.`,
          readTime: '12 min read',image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop',
          tags: ['Accommodations', 'Teachers']
        },
        {
          title: 'Home Support Strategies',
          excerpt: `How parents can create a supportive learning environment at home.\nPractical tips for homework and study time.`,
          readTime: '9 min read',image: 'https://images.unsplash.com/photo-1516627145497-ae4099d4e6ed?w=300&h=200&fit=crop',
          tags: ['Home Support', 'Parents']
        },
        {
          title: 'Building Self-Advocacy Skills',
          excerpt: `Empower students to understand their needs and communicate effectively about their learning differences.`,
          readTime: '7 min read',image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
          tags: ['Self-Advocacy', 'Students']
        }
      ]
    },
    resources: {
      articles: [
        {
          title: 'Assistive Technology Tools',
          excerpt: `Discover digital tools and apps that can help students with learning differences succeed in school and beyond.`,
          readTime: '11 min read',image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
          tags: ['Technology', 'Tools']
        },
        {
          title: 'IEP and 504 Plan Guide',excerpt: `Navigate the special education process with confidence.\nUnderstand your rights and how to advocate effectively.`,readTime: '15 min read',image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop',
          tags: ['IEP', '504 Plans']
        },
        {
          title: 'Finding Professional Support',
          excerpt: `Connect with qualified specialists, therapists, and educational consultants in your area who can provide ongoing support.`,
          readTime: '6 min read',image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
          tags: ['Professionals', 'Support']
        }
      ]
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100 border-blue-200',
      green: 'text-green-600 bg-green-100 border-green-200',
      purple: 'text-purple-600 bg-purple-100 border-purple-200',
      orange: 'text-orange-600 bg-orange-100 border-orange-200'
    };
    return colors?.[color] || colors?.blue;
  };

  const activeContent = content?.[activeCategory];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Knowledge Center Preview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access research-backed articles, guides, and resources to support your learning journey.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories?.map((category) => {
            const isActive = activeCategory === category?.id;
            const colorClasses = getColorClasses(category?.color);
            
            return (
              <button
                key={category?.id}
                onClick={() => setActiveCategory(category?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? `${colorClasses} border shadow-soft` 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={category?.icon} size={20} />
                <span className="hidden sm:inline">{category?.title}</span>
                <span className="sm:hidden">{category?.title?.split(' ')?.[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activeContent?.articles?.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-soft card-elevation overflow-hidden animate-gentle-fade-in">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground">
                  {article?.readTime}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                    {article?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {article?.excerpt}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {article?.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={16}
                  >
                    Read Article
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Resource */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                  <Icon name="Star" size={16} className="mr-2" />
                  Featured Resource
                </div>
                
                <h3 className="text-2xl font-bold text-foreground">
                  Complete Parent's Guide to Learning Differences
                </h3>
                
                <p className="text-muted-foreground">
                  A comprehensive 50-page guide covering everything parents need to know about learning differences, 
                  from early identification to advocacy strategies. Written by leading experts in the field.
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>50 pages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Download" size={16} />
                  <span>PDF Format</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>10,000+ downloads</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  className="warmth-transition"
                >
                  Download Free Guide
                </Button>
                
                <Button 
                  variant="outline"
                  iconName="Eye"
                  iconPosition="left"
                >
                  Preview Content
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg shadow-strong p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Guide Contents</h4>
                    <Icon name="BookOpen" size={20} className="text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      'Understanding Learning Differences',
                      'Early Warning Signs by Age',
                      'Assessment Process Explained',
                      'School Advocacy Strategies',
                      'Home Support Techniques',
                      'Professional Resources Directory'
                    ]?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary text-xs font-medium">{index + 1}</span>
                        </div>
                        <span className="text-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Resource Center */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              Explore Our Complete Knowledge Center
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access hundreds of articles, guides, and resources created by leading experts in learning differences and special education.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resource-center">
              <Button 
                variant="default" 
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                className="warmth-transition"
              >
                Visit Resource Center
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              iconName="Bell"
              iconPosition="left"
            >
              Get Weekly Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalPreview;