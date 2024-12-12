import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Assets from '../../components/assets/Assets';
import { LanguageProvider } from '../../contexts/LanguageContext';

describe('Assets Component', () => {
  const renderAssets = () => {
    return render(
      <LanguageProvider>
        <Assets />
      </LanguageProvider>
    );
  };

  it('renders the assets page with all required elements', () => {
    renderAssets();
    
    // Check for main heading
    expect(screen.getByText(/الأصول/i)).toBeInTheDocument();
    
    // Check for action buttons
    expect(screen.getByText(/إضافة أصل/i)).toBeInTheDocument();
    expect(screen.getByText(/تصدير/i)).toBeInTheDocument();
    
    // Check for search input
    expect(screen.getByPlaceholderText(/بحث/i)).toBeInTheDocument();
    
    // Check for status filter
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('opens asset form when add button is clicked', () => {
    renderAssets();
    
    const addButton = screen.getByText(/إضافة أصل/i);
    fireEvent.click(addButton);
    
    expect(screen.getByText(/إضافة أصل جديد/i)).toBeInTheDocument();
  });

  it('filters assets when search term is entered', () => {
    renderAssets();
    
    const searchInput = screen.getByPlaceholderText(/بحث/i);
    fireEvent.change(searchInput, { target: { value: 'رافعة' } });
    
    // Add assertions for filtered results
  });

  it('sorts assets when sort button is clicked', () => {
    renderAssets();
    
    const sortButton = screen.getByText(/ترتيب/i);
    fireEvent.click(sortButton);
    
    // Add assertions for sorted results
  });

  it('exports assets when export button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    renderAssets();
    
    const exportButton = screen.getByText(/تصدير/i);
    fireEvent.click(exportButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Exporting assets');
  });
});