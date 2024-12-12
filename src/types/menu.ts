import { LucideIcon } from 'lucide-react';
import type { Module } from './index';

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

export interface MenuItem {
  id: Module | string;
  icon: LucideIcon;
  label: string;
  path: string;
  isExternal?: boolean;
  color?: string;
  subItems?: SubMenuItem[];
}