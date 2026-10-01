import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-900/50">
      <div
        className="h-full bg-gradient-to-l from-blue-500 via-purple-500 to-amber-500 transition-all duration-150 shadow-lg shadow-blue-500/30"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
