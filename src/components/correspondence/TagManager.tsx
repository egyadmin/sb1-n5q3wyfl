import React, { useState, useEffect } from 'react';
import { X, Plus, Tag as TagIcon, Search } from 'lucide-react';

interface TagManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  suggestedTags?: string[];
}

export default function TagManager({ tags, onTagsChange, suggestedTags = [] }: TagManagerProps) {
  const [newTag, setNewTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const defaultSuggestedTags = [
    'عاجل',
    'مهم',
    'متابعة',
    'تم الرد',
    'قيد المعالجة',
    'مكتمل',
    'مؤجل',
    'للعلم',
    'للمراجعة',
    'للاعتماد'
  ];

  const allSuggestedTags = [...new Set([...suggestedTags, ...defaultSuggestedTags])];

  const filteredSuggestions = allSuggestedTags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !tags.includes(tag)
  );

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
      setNewTag('');
      setSearchTerm('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag) {
      e.preventDefault();
      handleAddTag(newTag);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.tag-manager')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4 tag-manager">
      <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 animate-fadeIn"
          >
            <TagIcon className="w-4 h-4 ml-1" />
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newTag}
              onChange={(e) => {
                setNewTag(e.target.value);
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder="أضف تصنيف..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <TagIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            type="button"
            onClick={() => handleAddTag(newTag)}
            disabled={!newTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            <div className="p-2 border-b sticky top-0 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="بحث في التصنيفات..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="p-2">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleAddTag(suggestion)}
                  className="w-full text-right px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <TagIcon className="w-4 h-4 text-gray-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}