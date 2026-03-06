'use client';

import { useEffect, useState } from 'react';

export function ThemeDiagnostic() {
  const [info, setInfo] = useState<{
    htmlClass: string;
    htmlDataTheme: string | null;
    localStorage: string | null;
  }>({ htmlClass: '', htmlDataTheme: null, localStorage: null });

  useEffect(() => {
    const updateInfo = () => {
      setInfo({
        htmlClass: document.documentElement.className,
        htmlDataTheme: document.documentElement.getAttribute('data-theme'),
        localStorage: localStorage.getItem('theme'),
      });
    };
    
    updateInfo();
    
    // Update every second to catch changes
    const interval = setInterval(updateInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Theme Debug:</div>
      <div>HTML class: "{info.htmlClass}"</div>
      <div>data-theme: "{info.htmlDataTheme}"</div>
      <div>localStorage: "{info.localStorage}"</div>
    </div>
  );
}
