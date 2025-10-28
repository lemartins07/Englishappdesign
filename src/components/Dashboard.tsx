import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Award, TrendingUp, Target, Download } from 'lucide-react';
import { UserProfile } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  userProfile: UserProfile;
  onBack: () => void;
  onStartInterview: () => void;
}

export function Dashboard({ userProfile, onBack, onStartInterview }: DashboardProps) {
  const weekData = [
    { day: 'Seg', minutes: 15, completed: userProfile.completedDays.includes(1) },
    { day: 'Ter', minutes: userProfile.completedDays.includes(2) ? 18 : 0, completed: userProfile.completedDays.includes(2) },
    { day: 'Qua', minutes: userProfile.completedDays.includes(3) ? 20 : 0, completed: userProfile.completedDays.includes(3) },
    { day: 'Qui', minutes: userProfile.completedDays.includes(4) ? 17 : 0, completed: userProfile.completedDays.includes(4) },
    { day: 'Sex', minutes: userProfile.completedDays.includes(5) ? 20 : 0, completed: userProfile.completedDays.includes(5) },
    { day: 'Sáb', minutes: userProfile.completedDays.includes(6) ? 16 : 0, completed: userProfile.completedDays.includes(6) },
    { day: 'Dom', minutes: userProfile.completedDays.includes(7) ? 25 : 0, completed: userProfile.completedDays.includes(7) }
  ];

  const totalMinutes = weekData.reduce((acc, day) => acc + day.minutes, 0);
  const completionRate = (userProfile.completedDays.length / 7) * 100;
  const streak = userProfile.completedDays.length;

  const achievements = [
    { 
      id: 1, 
      icon: '🔥', 
      title: 'Primeira Lição', 
      description: 'Complete sua primeira lição',
      unlocked: userProfile.completedDays.length >= 1
    },
    { 
      id: 2, 
      icon: '⚡', 
      title: 'Streak de 3 dias', 
      description: 'Estude por 3 dias seguidos',
      unlocked: userProfile.completedDays.length >= 3
    },
    { 
      id: 3, 
      icon: '🎯', 
      title: 'Meio Caminho', 
      description: 'Complete 50% do plano',
      unlocked: completionRate >= 50
    },
    { 
      id: 4, 
      icon: '🏆', 
      title: 'Semana Completa', 
      description: 'Complete todas as 7 lições',
      unlocked: userProfile.completedDays.length >= 7
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Plano
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Progresso
          </Button>
        </div>

        {/* Hero Stats */}
        <div className="text-center space-y-2">
          <h1 className="text-blue-900">Seu Progresso</h1>
          <p className="text-neutral-600">
            Acompanhe sua evolução semanal e conquistas
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <Card>
              <CardContent className="pt-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Dias Concluídos</p>
                    <p className="text-3xl">{userProfile.completedDays.length}/7</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Tempo Estudado</p>
                    <p className="text-3xl">{totalMinutes}min</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Pontuação</p>
                    <p className="text-3xl">{userProfile.score}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Streak</p>
                    <p className="text-3xl">{streak} 🔥</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Semanal</CardTitle>
            <CardDescription>Minutos estudados por dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="minutes" 
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso do Plano</CardTitle>
              <CardDescription>Semana 1 - Fundamentos de Entrevista</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Conclusão Total</span>
                  <span className="text-blue-600">{Math.round(completionRate)}%</span>
                </div>
                <Progress value={completionRate} className="h-3" />
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <span className="text-sm">Lições Concluídas</span>
                  </div>
                  <Badge className="bg-green-500">{userProfile.completedDays.length}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      ▶
                    </div>
                    <span className="text-sm">Próxima Lição</span>
                  </div>
                  <Badge variant="outline">Dia {userProfile.currentDay}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
              <CardDescription>Desbloqueie badges conforme progride</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200'
                        : 'bg-neutral-50 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-sm mb-1">{achievement.title}</p>
                    <p className="text-xs text-neutral-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="pt-6 px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white mb-2">Pronto para o próximo desafio?</h3>
                <p className="text-blue-100">
                  {userProfile.completedDays.length < 5
                    ? `Complete mais ${5 - userProfile.completedDays.length} lições para desbloquear o Simulador de Entrevista`
                    : 'Teste suas habilidades no Simulador de Entrevista Técnica'}
                </p>
              </div>
              <Button 
                size="lg"
                onClick={onStartInterview}
                disabled={userProfile.completedDays.length < 5}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Target className="w-4 h-4 mr-2" />
                {userProfile.completedDays.length < 5 ? '🔒 Bloqueado' : 'Iniciar Simulação'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
