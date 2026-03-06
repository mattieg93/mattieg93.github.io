"use client";

import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/theme-context';

export function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}