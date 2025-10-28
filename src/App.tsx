import { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { LevelTest } from './components/LevelTest';
import { GoalSelection } from './components/GoalSelection';
import { StudyPlan } from './components/StudyPlan';
import { Lesson } from './components/Lesson';
import { TeacherChat } from './components/TeacherChat';
import { Dashboard } from './components/Dashboard';
import { InterviewSimulator } from './components/InterviewSimulator';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';

export type Screen = 
  | 'welcome' 
  | 'levelTest' 
  | 'goalSelection' 
  | 'studyPlan' 
  | 'lesson'
  | 'chat'
  | 'dashboard'
  | 'interview';

export interface UserProfile {
  name: string;
  level: string;
  track: string;
  goal: string;
  currentDay: number;
  completedDays: number[];
  score: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    level: '',
    track: '',
    goal: '',
    currentDay: 1,
    completedDays: [],
    score: 0
  });

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
    setUserProfile({
      name: '',
      level: '',
      track: '',
      goal: '',
      currentDay: 1,
      completedDays: [],
      score: 0
    });
  };

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showTopBar = currentScreen !== 'welcome' && currentScreen !== 'levelTest' && currentScreen !== 'goalSelection';
  const showBottomNav = showTopBar;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-black transition-colors duration-300">
      {/* Top Bar */}
      {showTopBar && (
        <TopBar 
          userProfile={userProfile}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content */}
      <div className={showBottomNav ? 'pb-16 md:pb-0' : ''}>
        {currentScreen === 'welcome' && (
          <Welcome onNext={() => navigateTo('levelTest')} onUpdateProfile={updateProfile} />
        )}
        {currentScreen === 'levelTest' && (
          <LevelTest onComplete={(level) => {
            updateProfile({ level });
            navigateTo('goalSelection');
          }} />
        )}
        {currentScreen === 'goalSelection' && (
          <GoalSelection 
            onComplete={(track, goal) => {
              updateProfile({ track, goal });
              navigateTo('studyPlan');
            }} 
          />
        )}
        {currentScreen === 'studyPlan' && (
          <StudyPlan 
            userProfile={userProfile}
            onStartLesson={(day) => {
              updateProfile({ currentDay: day });
              navigateTo('lesson');
            }}
            onOpenChat={() => navigateTo('chat')}
            onOpenDashboard={() => navigateTo('dashboard')}
          />
        )}
        {currentScreen === 'lesson' && (
          <Lesson 
            day={userProfile.currentDay}
            onComplete={() => {
              updateProfile({ 
                completedDays: [...userProfile.completedDays, userProfile.currentDay],
                score: userProfile.score + 100
              });
              navigateTo('studyPlan');
            }}
            onOpenChat={() => navigateTo('chat')}
          />
        )}
        {currentScreen === 'chat' && (
          <TeacherChat 
            userProfile={userProfile}
            onBack={() => navigateTo('studyPlan')}
            onStartInterview={() => navigateTo('interview')}
          />
        )}
        {currentScreen === 'dashboard' && (
          <Dashboard 
            userProfile={userProfile}
            onBack={() => navigateTo('studyPlan')}
            onStartInterview={() => navigateTo('interview')}
          />
        )}
        {currentScreen === 'interview' && (
          <InterviewSimulator 
            userProfile={userProfile}
            onComplete={() => navigateTo('dashboard')}
            onBack={() => navigateTo('dashboard')}
          />
        )}
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      {showBottomNav && (
        <BottomNav 
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          completedDays={userProfile.completedDays.length}
        />
      )}
    </div>
  );
}
