import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const popularSearches = [
    "ADHD intervention strategies",
    "Dyslexia reading techniques",
    "Dyscalculia math support",
    "Dysgraphia writing exercises",
    "Nutrition for learning",
    "Classroom accommodations",
    "Parent support guides",
    "Assessment tools"
  ];

  const handleSearch = (searchQuery = query) => {
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    const suggestionsList = suggestions?.length > 0 ? suggestions : popularSearches;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestionsList?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedSuggestion >= 0) {
          const selectedQuery = suggestionsList?.[selectedSuggestion];
          setQuery(selectedQuery);
          handleSearch(selectedQuery);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={suggestionsRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e?.target?.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search resources, strategies, guides..."
          className="w-full pl-10 pr-24 py-3 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-fast"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onFilterToggle}
            className="h-8 w-8"
            aria-label="Toggle filters"
          >
            <Icon name="SlidersHorizontal" size={16} />
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={() => handleSearch()}
            className="h-8"
          >
            Search
          </Button>
        </div>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-elevated z-50 max-h-80 overflow-y-auto">
          {suggestions?.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Suggestions
              </div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-3 py-2 hover:bg-muted transition-colors duration-fast ${
                    selectedSuggestion === index ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Search" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Popular Searches
              </div>
              {popularSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className={`w-full text-left px-3 py-2 hover:bg-muted transition-colors duration-fast ${
                    selectedSuggestion === index ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{search}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;