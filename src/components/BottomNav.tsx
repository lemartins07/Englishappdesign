import { Home, BookOpen, MessageCircle, BarChart3, Target } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  completedDays: number;
}

export function BottomNav({ currentScreen, onNavigate, completedDays }: BottomNavProps) {
  const navItems = [
    {
      id: 'studyPlan' as Screen,
      label: 'Início',
      icon: Home,
    },
    {
      id: 'lesson' as Screen,
      label: 'Lições',
      icon: BookOpen,
    },
    {
      id: 'chat' as Screen,
      label: 'Teacher',
      icon: MessageCircle,
    },
    {
      id: 'dashboard' as Screen,
      label: 'Progresso',
      icon: BarChart3,
    },
    {
      id: 'interview' as Screen,
      label: 'Entrevista',
      icon: Target,
      locked: completedDays < 5,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t dark:border-neutral-700 shadow-lg md:hidden">
      <nav className="flex items-center justify-around h-16 safe-area-inset-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const isLocked = item.locked;

          return (
            <button
              key={item.id}
              onClick={() => !isLocked && onNavigate(item.id)}
              disabled={isLocked}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors relative ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : isLocked
                  ? 'text-neutral-300 dark:text-neutral-600'
                  : 'text-neutral-600 dark:text-neutral-400 active:text-blue-600 dark:active:text-blue-400'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-b-full" />
              )}
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isLocked && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-neutral-400 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white">🔒</span>
                  </div>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? '' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
