
import { Baby, ChevronDown, Filter, Menu, Search, X, ShoppingBag, Sparkles, Brain, Info } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import ActivityCard from './components/ActivityCard';
import ActivityDetail from './components/ActivityDetail';
import ShoppingList from './components/ShoppingList';
import BundleView from './components/BundleView';
import ExecutiveFunctionInfo from './components/ExecutiveFunctionInfo';
import SafetyModal from './components/SafetyModal';
import { AGE_FILTERS, INITIAL_ACTIVITIES, ACTIVITY_BUNDLES } from './constants';
import { Activity, ViewMode } from './types';

// App component manages the main navigation and state of the TinySteps application.
const App: React.FC = () => {
  const [activities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [viewMode, setViewMode] = useState<ViewMode>('LIST');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAgeFilterOpen, setIsAgeFilterOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Filter activities based on search query and selected age range.
  const filteredItems = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = 
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        activity.objective.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAge = selectedAge === 'All' || activity.filter_tag === selectedAge;
      return matchesSearch && matchesAge;
    });
  }, [activities, searchQuery, selectedAge]);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setViewMode('DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedActivity(null);
    setViewMode('LIST');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans pb-16">
      <SafetyModal isOpen={isSafetyModalOpen} onClose={() => setIsSafetyModalOpen(false)} />
      
      {/* Side Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] flex">
          <div 
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-72 h-full bg-white border-r border-slate-100 shadow-2xl p-8 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#007AFF] rounded-xl text-white">
                  <Baby size={20} />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900">TinySteps</h3>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              <button 
                onClick={() => { setViewMode('LIST'); setIsMenuOpen(false); }}
                className={`w-full text-left py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${viewMode === 'LIST' ? 'bg-blue-50 text-[#007AFF]' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Activities
              </button>
              <button 
                onClick={() => { setViewMode('SHOPPING'); setIsMenuOpen(false); }}
                className={`w-full text-left py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${viewMode === 'SHOPPING' ? 'bg-blue-50 text-[#007AFF]' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Shopping List
              </button>
              <button 
                onClick={() => { setViewMode('BUNDLES'); setIsMenuOpen(false); }}
                className={`w-full text-left py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${viewMode === 'BUNDLES' ? 'bg-blue-50 text-[#007AFF]' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Activity Bundles
              </button>
              <button 
                onClick={() => { setViewMode('SCIENCE'); setIsMenuOpen(false); }}
                className={`w-full text-left py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${viewMode === 'SCIENCE' ? 'bg-blue-50 text-[#007AFF]' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                The Science
              </button>
            </nav>
            
            <button 
              onClick={() => { setIsSafetyModalOpen(true); setIsMenuOpen(false); }}
              className="mt-auto flex items-center gap-2 py-4 px-4 text-slate-400 hover:text-slate-600 transition-colors text-[10px] font-bold uppercase tracking-widest"
            >
              <Info size={16} />
              About Our Philosophy
            </button>
          </div>
        </div>
      )}

      {viewMode === 'LIST' && (
        <>
          <header className="sticky top-0 z-30 bg-white border-b border-slate-100 h-16">
            <div className="max-w-4xl mx-auto px-[21px] h-full flex items-center justify-between gap-4">
              <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-500 hover:text-slate-900 transition-all shrink-0">
                <Menu size={24} strokeWidth={2.5} />
              </button>

              <div className="flex-grow max-w-md relative hidden sm:block">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <button
                    onClick={() => setIsAgeFilterOpen(!isAgeFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm hover:border-slate-300 transition-all"
                  >
                    <Filter size={14} className="text-[#007AFF]" />
                    <span className="hidden xs:inline">{selectedAge === 'All' ? 'All Ages' : selectedAge}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isAgeFilterOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isAgeFilterOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setIsAgeFilterOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-30 py-3 animate-in fade-in zoom-in-95 duration-200">
                        {AGE_FILTERS.map((age) => (
                          <button
                            key={age}
                            onClick={() => {
                              setSelectedAge(age);
                              setIsAgeFilterOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors ${
                              selectedAge === age ? 'text-[#007AFF] bg-blue-50/50' : 'text-slate-400'
                            }`}
                          >
                            {age === 'All' ? 'All Ages' : age}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-[21px] pt-6 pb-32">
            <div className="sm:hidden mb-6 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map(activity => (
                <ActivityCard key={activity.id} activity={activity} onClick={handleActivityClick} />
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium italic">No activities found matching your criteria.</p>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {viewMode === 'DETAIL' && selectedActivity && (
        <ActivityDetail 
          activity={selectedActivity} 
          onBack={handleBackToList}
          activities={activities}
          onSelectActivity={handleActivityClick}
        />
      )}

      {viewMode === 'SHOPPING' && (
        <ShoppingList 
          activities={activities} 
          onBack={handleBackToList}
          selectedAge={selectedAge}
          onAgeChange={setSelectedAge}
        />
      )}

      {viewMode === 'BUNDLES' && (
        <BundleView 
          bundles={ACTIVITY_BUNDLES} 
          activities={activities} 
          onActivityClick={handleActivityClick}
          onBack={handleBackToList}
        />
      )}

      {viewMode === 'SCIENCE' && (
        <ExecutiveFunctionInfo onBack={handleBackToList} />
      )}
    </div>
  );
};

export default App;
