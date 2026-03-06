"use client";

import { useEffect } from "react";
import { useTheme } from '@/contexts/theme-context';

export function ThemeDebug() {
  const { theme } = useTheme();
  
  useEffect(() => {
    console.log('Current theme:', theme);
    console.log('HTML element data-theme:', document.documentElement.getAttribute('data-theme'));
    console.log('HTML element classList:', Array.from(document.documentElement.classList));
  }, [theme]);
  
  return null;
}