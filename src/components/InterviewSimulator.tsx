import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mic, Volume2, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserProfile } from '../App';

interface InterviewSimulatorProps {
  userProfile: UserProfile;
  onComplete: () => void;
  onBack: () => void;
}

const interviewQuestions = [
  {
    question: 'Tell me about yourself and your experience as a developer.',
    hint: 'Use STAR format. Mention years of experience, main technologies, and a key achievement.'
  },
  {
    question: 'Describe a challenging bug you fixed recently. How did you approach it?',
    hint: 'Situation → Task → Action → Result. Be specific about your debugging process.'
  },
  {
    question: 'How do you handle disagreements with team members about technical decisions?',
    hint: 'Show communication skills, empathy, and focus on data-driven decisions.'
  }
];

type Phase = 'intro' | 'interview' | 'results';

export function InterviewSimulator({ userProfile, onComplete, onBack }: InterviewSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const progress = ((currentQuestion + 1) / interviewQuestions.length) * 100;

  const handleStartInterview = () => {
    setPhase('interview');
  };

  const handleNextQuestion = () => {
    if (currentAnswer.trim()) {
      answers.push(currentAnswer);
      setCurrentAnswer('');

      if (currentQuestion < interviewQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setPhase('results');
      }
    }
  };

  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCurrentAnswer('This is a simulated transcription of your recorded answer. In the real app, this would be your actual speech converted to text using ASR.');
    }, 2000);
  };

  const rubricScores = {
    fluency: 4,
    vocabulary: 5,
    grammar: 4,
    star: 5
  };

  const averageScore = (rubricScores.fluency + rubricScores.vocabulary + rubricScores.grammar + rubricScores.star) / 4;

  return (
    <div className="min-h-screen p-4 sm:p-6 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          {phase === 'interview' && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
              Em andamento
            </Badge>
          )}
        </div>

        {/* Intro Phase */}
        {phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="pt-6 px-4 sm:px-6 text-center space-y-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">🎯</span>
                </div>
                <div>
                  <h1 className="text-white mb-2">Simulador de Entrevista</h1>
                  <p className="text-blue-100 max-w-2xl mx-auto">
                    Prepare-se para entrevistas reais praticando com nossa IA. 
                    Você receberá feedback detalhado sobre fluência, vocabulário e técnica STAR.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Como funciona</CardTitle>
                <CardDescription>O que esperar da simulação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">1️⃣</span>
                    </div>
                    <h3 className="mb-1">3 Perguntas</h3>
                    <p className="text-sm text-neutral-600">
                      Perguntas típicas de entrevistas para {userProfile.track}
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">2️⃣</span>
                    </div>
                    <h3 className="mb-1">Grave ou Escreva</h3>
                    <p className="text-sm text-neutral-600">
                      Responda por áudio ou texto
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">3️⃣</span>
                    </div>
                    <h3 className="mb-1">Feedback IA</h3>
                    <p className="text-sm text-neutral-600">
                      Análise detalhada com rubrica
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm">
                    <strong>💡 Dica:</strong> Fale naturalmente e use exemplos específicos. 
                    Lembre-se do formato STAR: Situation, Task, Action, Result.
                  </p>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    size="lg"
                    onClick={handleStartInterview}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Começar Simulação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Interview Phase */}
        {phase === 'interview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Pergunta {currentQuestion + 1} de {interviewQuestions.length}</span>
                <span>{Math.round(progress)}% concluído</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Button size="sm" variant="outline">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Ouvir Pergunta
                      </Button>
                    </div>
                    <CardTitle className="text-xl">
                      "{interviewQuestions[currentQuestion].question}"
                    </CardTitle>
                    <CardDescription>
                      💡 {interviewQuestions[currentQuestion].hint}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        onClick={handleRecord}
                        disabled={isRecording || currentAnswer.length > 0}
                        className="rounded-full w-20 h-20 bg-orange-500 hover:bg-orange-600"
                      >
                        <Mic className={`w-10 h-10 ${isRecording ? 'animate-pulse' : ''}`} />
                      </Button>
                    </div>

                    {isRecording && (
                      <p className="text-center text-sm text-neutral-600">
                        🎤 Gravando... Fale naturalmente
                      </p>
                    )}

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-neutral-500">ou escreva</span>
                      </div>
                    </div>

                    <Textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="min-h-[200px]"
                      disabled={isRecording}
                    />

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">
                        {currentAnswer.length} characters
                      </span>
                      <Button
                        onClick={handleNextQuestion}
                        disabled={!currentAnswer.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {currentQuestion < interviewQuestions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Entrevista'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results Phase */}
        {phase === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <CardContent className="pt-6 px-4 sm:px-6 text-center space-y-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-white mb-2">Entrevista Concluída! 🎉</h1>
                  <p className="text-green-100">
                    Você completou a simulação. Confira seu feedback detalhado abaixo.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl">{averageScore.toFixed(1)}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= Math.round(averageScore)
                            ? 'fill-yellow-300 text-yellow-300'
                            : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rubrica de Avaliação</CardTitle>
                <CardDescription>Análise detalhada do seu desempenho</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Fluência', score: rubricScores.fluency, description: 'Naturalidade e ritmo da fala' },
                  { label: 'Vocabulário Técnico', score: rubricScores.vocabulary, description: 'Uso apropriado de termos' },
                  { label: 'Gramática', score: rubricScores.grammar, description: 'Correção gramatical' },
                  { label: 'Método STAR', score: rubricScores.star, description: 'Estrutura das respostas' }
                ].map((criterion) => (
                  <div key={criterion.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">{criterion.label}</p>
                        <p className="text-xs text-neutral-500">{criterion.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= criterion.score
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm w-8">{criterion.score}/5</span>
                      </div>
                    </div>
                    <Progress value={(criterion.score / 5) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Personalizado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-green-800 mb-1">Pontos Fortes</p>
                      <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                        <li>Excelente uso do formato STAR nas respostas</li>
                        <li>Vocabulário técnico apropriado para {userProfile.track}</li>
                        <li>Respostas bem estruturadas e claras</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-orange-800 mb-1">Áreas para Melhorar</p>
                      <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
                        <li>Pratique falar de forma mais natural e menos "roteirizada"</li>
                        <li>Adicione mais números e métricas específicas aos exemplos</li>
                        <li>Trabalhe em reduzir pausas longas durante a resposta</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  setPhase('intro');
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setCurrentAnswer('');
                }}
                className="flex-1"
              >
                Tentar Novamente
              </Button>
              <Button 
                size="lg"
                onClick={onComplete}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Voltar ao Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
