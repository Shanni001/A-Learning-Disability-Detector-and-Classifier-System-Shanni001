import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FeaturedSection from './components/FeaturedSection';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import FilterSidebar from './components/FilterSidebar';
import ResourceGrid from './components/ResourceGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResourceCenter = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    disability: [],
    type: [],
    difficulty: [],
    ageGroup: [],
    language: []
  });

  // Mock resources data
  const mockResources = [
    {
      id: 1,
      title: "ADHD Classroom Management Strategies",
      description: "Evidence-based techniques for creating supportive learning environments for students with ADHD, including behavior modification strategies and environmental accommodations.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      type: "Guide",
      difficulty: "Intermediate",
      duration: "30 min read",
      ageGroup: "9-12 years",
      rating: 4.8,
      reviews: 234,
      downloads: 1567,
      tags: ["ADHD", "Classroom Management", "Behavior Support"],
      downloadable: true,
      isBookmarked: false,
      category: "intervention"
    },
    {
      id: 2,
      title: "Dyslexia Reading Intervention Toolkit",
      description: "Comprehensive collection of multi-sensory reading techniques, phonics-based activities, and assessment tools specifically designed for students with dyslexia.",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=400&h=250&fit=crop",
      type: "Worksheet",
      difficulty: "Advanced",
      duration: "2 hours",
      ageGroup: "6-8 years",
      rating: 4.9,
      reviews: 189,
      downloads: 2340,
      tags: ["Dyslexia", "Reading", "Multi-sensory", "Phonics"],
      downloadable: true,
      isBookmarked: true,
      category: "educational"
    },
    {
      id: 3,
      title: "Nutrition for Optimal Learning Performance",
      description: "Research-backed nutritional strategies that support cognitive function, attention, and learning outcomes for children with learning differences and ADHD.",
      image: "https://images.pixabay.com/photo/2017/05/11/19/44/fresh-fruits-2305192_1280.jpg?w=400&h=250&fit=crop",
      type: "Video",
      difficulty: "Beginner",
      duration: "45 min",
      ageGroup: "All ages",
      rating: 4.7,
      reviews: 156,
      downloads: 987,
      tags: ["Nutrition", "ADHD", "Cognitive Health", "Diet"],
      downloadable: false,
      isBookmarked: false,
      category: "nutrition"
    },
    {
      id: 4,
      title: "Dyscalculia Math Support Activities",
      description: "Visual and hands-on mathematical activities designed to help students with dyscalculia develop number sense and mathematical reasoning skills.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop",
      type: "Worksheet",
      difficulty: "Intermediate",
      duration: "1 hour",
      ageGroup: "9-12 years",
      rating: 4.6,
      reviews: 98,
      downloads: 756,
      tags: ["Dyscalculia", "Mathematics", "Visual Learning", "Number Sense"],
      downloadable: true,
      isBookmarked: false,
      category: "educational"
    },
    {
      id: 5,
      title: "Dysgraphia Writing Support Techniques",
      description: "Adaptive writing strategies, assistive technology recommendations, and fine motor skill development activities for students with dysgraphia.",
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?w=400&h=250&fit=crop",
      type: "Guide",
      difficulty: "Advanced",
      duration: "40 min read",
      ageGroup: "13-15 years",
      rating: 4.5,
      reviews: 67,
      downloads: 543,
      tags: ["Dysgraphia", "Writing", "Fine Motor", "Assistive Technology"],
      downloadable: true,
      isBookmarked: false,
      category: "intervention"
    },
    {
      id: 6,
      title: "Parent Success Story: Sarah's Journey",
      description: "Inspiring story of how early identification and intervention helped Sarah overcome dyslexia challenges and excel in her academic journey.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=250&fit=crop",
      type: "Article",
      difficulty: "Beginner",
      duration: "15 min read",
      ageGroup: "All ages",
      rating: 4.9,
      reviews: 234,
      downloads: 1234,
      tags: ["Success Story", "Dyslexia", "Parent Support", "Inspiration"],
      downloadable: false,
      isBookmarked: true,
      category: "community"
    },
    {
      id: 7,
      title: "Teacher Training: Inclusive Classroom Practices",
      description: "Professional development module covering universal design for learning, differentiated instruction, and creating inclusive environments for all learners.",
      image: "https://images.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg?w=400&h=250&fit=crop",
      type: "Video",
      difficulty: "Intermediate",
      duration: "90 min",
      ageGroup: "Adult Support",
      rating: 4.8,
      reviews: 145,
      downloads: 678,
      tags: ["Teacher Training", "Inclusive Education", "UDL", "Professional Development"],
      downloadable: false,
      isBookmarked: false,
      category: "professional"
    },
    {
      id: 8,
      title: "ADHD Assessment Checklist for Educators",
      description: "Comprehensive observation checklist to help teachers identify potential ADHD symptoms and document behaviors for professional evaluation.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      type: "Assessment",
      difficulty: "Intermediate",
      duration: "20 min",
      ageGroup: "6-18 years",
      rating: 4.7,
      reviews: 189,
      downloads: 1456,
      tags: ["ADHD", "Assessment", "Teacher Tools", "Observation"],
      downloadable: true,
      isBookmarked: false,
      category: "assessment"
    },
    {
      id: 9,
      title: "Omega-3 and Learning: Research Summary",
      description: "Comprehensive review of scientific research on omega-3 fatty acids and their impact on cognitive function, attention, and learning performance.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=250&fit=crop",
      type: "Article",
      difficulty: "Advanced",
      duration: "25 min read",
      ageGroup: "All ages",
      rating: 4.6,
      reviews: 87,
      downloads: 432,
      tags: ["Nutrition", "Omega-3", "Research", "Cognitive Health"],
      downloadable: true,
      isBookmarked: false,
      category: "nutrition"
    }
  ];

  const [resources, setResources] = useState(mockResources);
  const [filteredResources, setFilteredResources] = useState(mockResources);
  const [hasMore, setHasMore] = useState(true);

  // Filter resources based on active filters
  useEffect(() => {
    let filtered = resources;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(resource => resource?.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(resource =>
        resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply other filters
    Object.entries(filters)?.forEach(([key, values]) => {
      if (values?.length > 0) {
        filtered = filtered?.filter(resource => {
          switch (key) {
            case 'disability':
              return values?.some(value => 
                resource?.tags?.some(tag => tag?.toLowerCase()?.includes(value))
              );
            case 'type':
              return values?.includes(resource?.type?.toLowerCase());
            case 'difficulty':
              return values?.includes(resource?.difficulty?.toLowerCase());
            case 'ageGroup':
              return values?.includes(resource?.ageGroup?.toLowerCase()?.replace(' ', '-'));
            default:
              return true;
          }
        });
      }
    });

    setFilteredResources(filtered);
  }, [activeCategory, searchQuery, filters, resources]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, values) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      disability: [],
      type: [],
      difficulty: [],
      ageGroup: [],
      language: []
    });
    setSearchQuery('');
    setActiveCategory('all');
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more resources
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => {}} />
      {/* Featured Section */}
      <div className="pt-16">
        <FeaturedSection />
      </div>
      {/* Search Section */}
      <div className="bg-white py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar
            onSearch={handleSearch}
            onFilterToggle={toggleFilters}
            suggestions={[]}
          />
        </div>
      </div>
      {/* Category Navigation */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isCollapsed={!showFilters}
            onToggle={toggleFilters}
          />

          {/* Resource Grid */}
          <ResourceGrid
            resources={filteredResources}
            loading={loading}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </div>
      {/* Quick Access Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <Button
            variant="default"
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-primary shadow-elevated breathing-animation"
            aria-label="Quick help"
          >
            <Icon name="HelpCircle" size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white shadow-elevated"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Icon name="ArrowUp" size={20} />
          </Button>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Resource Center</h3>
                  <p className="text-sm text-muted-foreground">Empowering learning through evidence-based resources</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Our comprehensive library provides educators, parents, and professionals with the tools 
                and knowledge needed to support children with learning differences.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
                  Newsletter
                </Button>
                <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                  Community
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/assessment-portal" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  Assessment Portal
                </a>
                <a href="/progress-visualization" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  Progress Tracking
                </a>
                <a href="/school-integration-hub" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  School Integration
                </a>
                <a href="/report-analytics" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  Analytics
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  Help Center
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  Contact Us
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  Professional Consultation
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-fast">
                  Training Programs
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} AngazaLearn. Illuminating every child's potential through evidence-based support.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourceCenter;