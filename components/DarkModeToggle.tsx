import { useEffect } from 'react';

export default function DarkModeToggle() {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  const toggle = () => {
    document.documentElement.classList.toggle('dark');
  };
  return (
    <button onClick={toggle} className="ml-4 px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      Toggle Dark Mode
    </button>
  );
} 