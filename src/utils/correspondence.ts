import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { Correspondence } from '../types';

export const generateCorrespondenceId = (type: 'incoming' | 'outgoing'): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${type === 'incoming' ? 'IN' : 'OUT'}-${year}-${random}`;
};

export const formatDate = (date: string, includeTime: boolean = false): string => {
  const dateObj = new Date(date);
  return format(dateObj, includeTime ? 'PPp' : 'PP', { locale: ar });
};

export const addTrackingEvent = (
  correspondence: Correspondence,
  location: string,
  action: string,
  user: string
): Correspondence => {
  const now = new Date().toISOString();
  
  return {
    ...correspondence,
    tracking: {
      currentLocation: location,
      history: [
        {
          location,
          date: now,
          action,
          user
        },
        ...(correspondence.tracking?.history || [])
      ]
    }
  };
};

export const filterCorrespondence = (
  items: Correspondence[],
  searchTerm: string,
  filters: {
    status?: string;
    priority?: string;
    dateRange?: { start: string; end: string };
  }
): Correspondence[] => {
  return items.filter(item => {
    const matchesSearch = 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || filters.status === 'all' || item.status === filters.status;
    const matchesPriority = !filters.priority || filters.priority === 'all' || item.priority === filters.priority;
    
    let matchesDateRange = true;
    if (filters.dateRange) {
      const itemDate = new Date(item.date);
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      matchesDateRange = itemDate >= start && itemDate <= end;
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });
};