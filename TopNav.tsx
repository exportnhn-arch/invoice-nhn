import { Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  const { language, setLanguage, dir } = useLanguage();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[#0057B8]">
          {title}
        </h1>
        
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Toggle - English / فارسی */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-gray-50">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                language === 'en'
                  ? 'bg-white text-[#0057B8] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('fa')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                language === 'fa'
                  ? 'bg-white text-[#0057B8] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontFamily: 'Vazir, sans-serif' }}
            >
              فارسی
            </button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}