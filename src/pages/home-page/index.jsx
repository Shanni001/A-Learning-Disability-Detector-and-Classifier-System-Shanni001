import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import UserPathways from './components/UserPathways';
import SuccessStories from './components/SuccessStories';
import TrustSignals from './components/TrustSignals';
import EducationalPreview from './components/EducationalPreview';
import CallToAction from './components/CallToAction';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'LearnAssess Pro - Understanding Unlocks Potential';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Transform learning challenges into strengths with our science-backed assessment platform. Every learner deserves clarity, support, and a pathway to success.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Transform learning challenges into strengths with our science-backed assessment platform. Every learner deserves clarity, support, and a pathway to success.';
      document.getElementsByTagName('head')?.[0]?.appendChild(meta);
    }

    // Intersection Observer for trust reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all trust-reveal elements
    const trustElements = document.querySelectorAll('.trust-reveal');
    trustElements?.forEach((el) => observer?.observe(el));

    // Cleanup
    return () => {
      trustElements?.forEach((el) => observer?.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section - Primary entry point with value proposition */}
        <HeroSection />
        
        {/* User Pathways - Role-based entry points for different user types */}
        <UserPathways />
        
        {/* Success Stories - Social proof with filtering by user type */}
        <SuccessStories />
        
        {/* Trust Signals - Certifications, partnerships, and validation */}
        <TrustSignals />
        
        {/* Educational Preview - Knowledge Center content preview */}
        <EducationalPreview />
        
        {/* Call to Action - Final conversion push with process steps */}
        <CallToAction />
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">LearnAssess Pro</h3>
                  <p className="text-sm text-gray-400">Understanding unlocks potential</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming learning challenges into strengths through science-backed assessments and compassionate support.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/results-dashboard" className="hover:text-white transition-colors">Assessment</a></li>
                <li><a href="/resource-center" className="hover:text-white transition-colors">Resources</a></li>
                <li><a href="/community-hub" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="/support-center" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Learning Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>support@learnassess.pro</li>
                <li>1-800-LEARN-PRO</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date()?.getFullYear()} LearnAssess Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;