import React, { useMemo, useState } from 'react';
import { AppMode, ModeConfig } from '../types';
import { MODES } from '../constants';
import { 
  Terminal, 
  Wand2, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Camera, 
  Palette, 
  Scissors, 
  Smile, 
  Briefcase, 
  BrainCircuit, 
  LayoutGrid,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Studio Utama': <Camera size={18} />,
  'Studio Pelukis': <Palette size={18} />,
  'Studio Pengeditan': <Scissors size={18} />,
  'Lifestyle': <Smile size={18} />,
  'Bisnis & Seni': <Briefcase size={18} />,
  'AI Tools': <BrainCircuit size={18} />,
};

const Sidebar: React.FC<SidebarProps> = ({ activeMode, setActiveMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Studio Utama': true,
    'Studio Pelukis': false,
    'Studio Pengeditan': false,
    'Lifestyle': false,
    'Bisnis & Seni': false,
    'AI Tools': false,
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredModes = useMemo(() => {
    if (!searchQuery) return MODES;
    return MODES.filter(mode => 
      mode.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mode.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedModes = useMemo(() => {
    return filteredModes.reduce((acc, mode) => {
      acc[mode.category] = acc[mode.category] || [];
      acc[mode.category].push(mode);
      return acc;
    }, {} as Record<string, ModeConfig[]>);
  }, [filteredModes]);

  const isSearching = searchQuery.length > 0;

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
             <Wand2 className="text-white" size={16} />
        </div>
        <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">
            Radhya
            </h1>
            <span className="text-[10px] font-bold text-indigo-600 tracking-wide uppercase">Studio AI</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="Find a tool..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
            />
        </div>
      </div>

      {/* Mode List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1 pb-4">
        {Object.keys(groupedModes).length === 0 ? (
            <div className="text-center py-10 text-gray-400">
                <p className="text-sm">No tools found matching "{searchQuery}"</p>
            </div>
        ) : (
            Object.entries(groupedModes).map(([category, modes]) => {
                const isOpen = isSearching || expandedCategories[category];
                const Icon = CATEGORY_ICONS[category] || <LayoutGrid size={18} />;
                
                return (
                  <div key={category} className="mb-1">
                    <button 
                        onClick={() => !isSearching && toggleCategory(category)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg transition-colors select-none ${isSearching ? 'cursor-default' : 'hover:bg-gray-50 cursor-pointer'} ${isOpen ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                        <div className="flex items-center gap-2.5">
                            <span className={isOpen ? 'text-indigo-600' : 'text-gray-400'}>{Icon}</span>
                            <span>{category}</span>
                        </div>
                        {!isSearching && (
                            <span className="text-gray-400">
                                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </span>
                        )}
                    </button>

                    {isOpen && (
                        <div className="mt-1 space-y-0.5 relative">
                          {/* Vertical line connector */}
                          <div className="absolute left-[1.15rem] top-0 bottom-2 w-px bg-gray-200/70" />
                          
                          {modes.map(mode => (
                            <button
                              key={mode.id}
                              onClick={() => setActiveMode(mode.id)}
                              className={`w-full text-left pl-10 pr-3 py-2 rounded-md transition-all duration-200 relative group text-sm font-medium ${
                                activeMode === mode.id
                                  ? 'bg-indigo-50 text-indigo-700'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                                <span className="truncate block">{mode.label}</span>
                                {activeMode === mode.id && (
                                    <div className="absolute left-[1.1rem] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600 ring-2 ring-white" />
                                )}
                            </button>
                          ))}
                        </div>
                    )}
                  </div>
                );
            })
        )}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-center bg-gray-50/50">
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
            <Sparkles size={12} className="text-indigo-500" />
            <span>Powered by Gemini & Imagen</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;