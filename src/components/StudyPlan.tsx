import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Play, MessageCircle, BarChart3 } from 'lucide-react';
import { UserProfile } from '../App';

interface StudyPlanProps {
  userProfile: UserProfile;
  onStartLesson: (day: number) => void;
  onOpenChat: () => void;
  onOpenDashboard: () => void;
}

const lessons = [
  { day: 1, title: 'Interview Introductions', duration: '15 min', topics: 'Greetings, self-introduction, STAR format' },
  { day: 2, title: 'Technical Background', duration: '18 min', topics: 'Describing your stack, past projects' },
  { day: 3, title: 'Problem-Solving Vocabulary', duration: '20 min', topics: 'Debugging, optimization, architecture' },
  { day: 4, title: 'Behavioral Questions', duration: '17 min', topics: 'Teamwork, conflict, leadership' },
  { day: 5, title: 'System Design Discussion', duration: '20 min', topics: 'Scalability, trade-offs, components' },
  { day: 6, title: 'Code Review Scenarios', duration: '16 min', topics: 'Best practices, code quality' },
  { day: 7, title: 'Mock Interview Practice', duration: '25 min', topics: 'Full simulation with feedback' }
];

export function StudyPlan({ userProfile, onStartLesson, onOpenChat, onOpenDashboard }: StudyPlanProps) {
  const completionRate = (userProfile.completedDays.length / 7) * 100;

  return (
    <div className="min-h-screen p-4 sm:p-6 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-blue-900 mb-1">
              Olá, {userProfile.name}! 👋
            </h1>
            <p className="text-neutral-600">
              Seu plano personalizado para {userProfile.track} • Nível {userProfile.level}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onOpenDashboard}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="outline" onClick={onOpenChat}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Teacher AI
            </Button>
          </div>
        </div>

        {/* Week Summary */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="pt-6 px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-white mb-2">Semana 1: Fundamentos de Entrevista</h2>
                <p className="text-blue-100">
                  7 lições • {Math.round(completionRate)}% concluído
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-2xl">{userProfile.completedDays.length}/7</span>
                <span className="text-sm">dias</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson, idx) => {
            const isCompleted = userProfile.completedDays.includes(lesson.day);
            const isCurrent = lesson.day === userProfile.currentDay && !isCompleted;
            const isLocked = lesson.day > userProfile.currentDay && !isCompleted;

            return (
              <motion.div
                key={lesson.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={`relative overflow-hidden ${
                  isCurrent ? 'border-2 border-blue-500 shadow-lg' : ''
                } ${isLocked ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={isCompleted ? 'default' : 'outline'} className={
                        isCompleted ? 'bg-green-500' : ''
                      }>
                        Dia {lesson.day}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <Clock className="w-3 h-3" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm">{lesson.topics}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    {isCompleted ? (
                      <Button variant="outline" className="w-full" onClick={() => onStartLesson(lesson.day)}>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Revisar
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLocked}
                        onClick={() => onStartLesson(lesson.day)}
                      >
                        {isLocked ? (
                          '🔒 Bloqueado'
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            {isCurrent ? 'Continuar' : 'Iniciar'}
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                  {isCurrent && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl">
                      Atual
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4" onClick={onOpenChat}>
                <div className="text-center">
                  <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm">Conversar com Teacher AI</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4" onClick={onOpenDashboard}>
                <div className="text-center">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-sm">Ver Progresso Detalhado</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4" disabled>
                <div className="text-center">
                  <span className="text-2xl mb-2">🎯</span>
                  <div className="text-sm">Simulador de Entrevista</div>
                  <div className="text-xs text-neutral-500 mt-1">Complete 5 dias</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
