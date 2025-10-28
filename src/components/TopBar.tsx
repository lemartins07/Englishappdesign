import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Bell, Moon, Sun, User, Settings, LogOut, FileText, Crown } from 'lucide-react';
import { UserProfile } from '../App';

interface TopBarProps {
  userProfile: UserProfile;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout?: () => void;
}

export function TopBar({ userProfile, theme, onToggleTheme, onLogout }: TopBarProps) {
  const [notifications] = useState([
    { id: 1, title: 'Nova lição disponível!', description: 'Dia 2 está pronto para você começar', time: '5 min atrás', unread: true },
    { id: 2, title: 'Parabéns! 🎉', description: 'Você completou o Dia 1 com sucesso', time: '1 hora atrás', unread: true },
    { id: 3, title: 'Dica do Teacher AI', description: 'Continue praticando para manter seu streak!', time: '2 horas atrás', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;
  const initials = userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg dark:border-neutral-700">
      <div className="flex h-16 items-center px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">AI</span>
          </div>
          <span className="hidden md:block dark:text-white">English AI Tutor</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="mb-1">Notificações</h3>
                <p className="text-sm text-neutral-600">{unreadCount} não lidas</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b hover:bg-neutral-50 cursor-pointer transition-colors ${
                      notif.unread ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notif.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm mb-1">{notif.title}</p>
                        <p className="text-xs text-neutral-600">{notif.description}</p>
                        <p className="text-xs text-neutral-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  Ver todas as notificações
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={onToggleTheme}>
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`} alt={userProfile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none">{userProfile.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Nível {userProfile.level} • {userProfile.track}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Exportar Dados</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-orange-600">
                <Crown className="mr-2 h-4 w-4" />
                <span>Upgrade para Pro</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
