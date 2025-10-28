import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion } from 'motion/react';
import { Code2, Database, Layout, Server, Target, Loader2 } from 'lucide-react';

interface GoalSelectionProps {
  onComplete: (track: string, goal: string) => void;
}

const tracks = [
  {
    id: 'backend',
    name: 'Backend Developer',
    icon: Server,
    description: 'APIs, databases, microservices'
  },
  {
    id: 'frontend',
    name: 'Frontend Developer',
    icon: Layout,
    description: 'React, UI/UX, web applications'
  },
  {
    id: 'data',
    name: 'Data Engineer',
    icon: Database,
    description: 'Data pipelines, analytics, ETL'
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: Code2,
    description: 'CI/CD, cloud, infrastructure'
  }
];

export function GoalSelection({ onComplete }: GoalSelectionProps) {
  const [selectedTrack, setSelectedTrack] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (selectedTrack && selectedGoal) {
      setIsGenerating(true);
      // Simulate plan generation
      setTimeout(() => {
        onComplete(selectedTrack, selectedGoal);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-blue-900">Personalize sua trilha</h1>
          <p className="text-neutral-600">
            Escolha sua área e objetivo para gerar um plano de estudos personalizado
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Qual sua trilha técnica?</CardTitle>
            <CardDescription>Selecione a área que você trabalha ou deseja trabalhar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tracks.map((track) => {
                const Icon = track.icon;
                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:border-blue-300 hover:bg-blue-50 ${
                      selectedTrack === track.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedTrack === track.id ? 'bg-blue-500 text-white' : 'bg-neutral-100'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="mb-1">{track.name}</h3>
                        <p className="text-sm text-neutral-600">{track.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Qual seu objetivo principal?</CardTitle>
            <CardDescription>Isso vai ajudar a personalizar seu plano de estudos</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedGoal} onValueChange={setSelectedGoal}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione seu objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interview">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>Preparar para entrevistas técnicas</span>
                  </div>
                </SelectItem>
                <SelectItem value="fluency">Alcançar fluência geral</SelectItem>
                <SelectItem value="travel">Viagens e networking</SelectItem>
                <SelectItem value="work">Trabalho remoto internacional</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={!selectedTrack || !selectedGoal || isGenerating}
            className="bg-blue-600 hover:bg-blue-700 min-w-[200px]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando seu plano...
              </>
            ) : (
              'Gerar meu plano'
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
