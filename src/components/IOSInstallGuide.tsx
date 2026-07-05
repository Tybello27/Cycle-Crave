import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';

export const IOSInstallGuide: React.FC = () => {
  const [showIOSBanner, setShowIOSBanner] = useState(false);

  useEffect(() => {
    // Detect iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    
    // Check if dismissed before
    const dismissed = localStorage.getItem('cyclecrave.ios_dismissed');

    if (isIOS && !isStandalone && !dismissed) {
      setShowIOSBanner(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowIOSBanner(false);
    localStorage.setItem('cyclecrave.ios_dismissed', 'true');
  };

  if (!showIOSBanner) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto bg-slate-900/95 text-white p-4 rounded-3xl shadow-2xl border border-pink-500/30 backdrop-blur-md animate-slideUp">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌸</span>
          <div>
            <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wider">
              Install CycleCrave on iPhone
            </h4>
            <p className="text-xs font-semibold text-slate-100">
              Get full screen offline period & craving tracking!
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-around text-center text-[11px] text-slate-300">
        <div className="flex flex-col items-center gap-1">
          <Share className="w-4 h-4 text-pink-400" />
          <span>1. Tap Share</span>
        </div>
        <span>➔</span>
        <div className="flex flex-col items-center gap-1">
          <PlusSquare className="w-4 h-4 text-pink-400" />
          <span>2. Add to Home Screen</span>
        </div>
      </div>
    </div>
  );
};
