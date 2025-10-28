import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

interface LessonProps {
  day: number;
  onComplete: () => void;
  onOpenChat: () => void;
}

const lessonContent = [
  {
    phase: 'presentation',
    title: '📚 Presentation',
    description: 'Learn new concepts and vocabulary',
    content: {
      topic: 'Interview Introductions',
      explanation: 'In technical interviews, your introduction sets the tone. A strong opening includes: your name, current role, years of experience, and key technical skills.',
      example: '"Hi, I\'m Maria. I\'m a Backend Developer with 3 years of experience. I specialize in Node.js, PostgreSQL, and building RESTful APIs. Most recently, I worked on a microservices architecture that handled 10,000 requests per second."',
      keyPhrases: [
        'I specialize in...',
        'My experience includes...',
        'I\'ve worked on...',
        'I\'m proficient in...'
      ]
    }
  },
  {
    phase: 'assimilation',
    title: '🎯 Assimilation',
    description: 'Practice and reinforce what you learned',
    quiz: {
      question: 'Which phrase best describes technical expertise in an interview?',
      options: [
        'I know a bit about programming',
        'I specialize in backend development with focus on scalability',
        'I can code',
        'I work with computers'
      ],
      correct: 1
    }
  },
  {
    phase: 'recall',
    title: '💡 Active Recall',
    description: 'Apply your knowledge in a real scenario',
    prompt: 'Write your own introduction for a Backend Developer position. Include your experience, main technologies, and a recent achievement. (Write in English)'
  },
  {
    phase: 'feedback',
    title: '✨ Feedback & Next',
    description: 'Review your progress and plan ahead'
  }
];

export function Lesson({ day, onComplete, onOpenChat }: LessonProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const progress = ((currentPhase + 1) / lessonContent.length) * 100;
  const phase = lessonContent[currentPhase];

  const handleNext = () => {
    if (currentPhase === lessonContent.length - 1) {
      onComplete();
    } else {
      setCurrentPhase(currentPhase + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleCheckAnswer = () => {
    setShowFeedback(true);
  };

  const canProceed = () => {
    if (phase.phase === 'presentation') return true;
    if (phase.phase === 'assimilation') return selectedAnswer !== null;
    if (phase.phase === 'recall') return userInput.trim().length > 20;
    if (phase.phase === 'feedback') return true;
    return false;
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onComplete}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Plano
          </Button>
          <Button variant="outline" onClick={onOpenChat}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Teacher AI
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>Dia {day} • {phase.title}</span>
            <span>{currentPhase + 1} de {lessonContent.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{phase.title}</CardTitle>
                <CardDescription>{phase.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Presentation Phase */}
                {phase.phase === 'presentation' && phase.content && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="mb-2">📖 {phase.content.topic}</h3>
                      <p className="text-neutral-700">{phase.content.explanation}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="mb-1">💬 Exemplo:</p>
                      <p className="text-neutral-700 italic">"{phase.content.example}"</p>
                    </div>

                    <div>
                      <p className="mb-3">🔑 Frases-chave:</p>
                      <div className="grid gap-2">
                        {phase.content.keyPhrases.map((phrase, idx) => (
                          <div key={idx} className="bg-white border rounded-lg p-3">
                            <code className="text-blue-600">{phrase}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Assimilation Phase */}
                {phase.phase === 'assimilation' && phase.quiz && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-neutral-800">{phase.quiz.question}</p>
                    </div>

                    <RadioGroup 
                      value={selectedAnswer?.toString()} 
                      onValueChange={(val) => {
                        setSelectedAnswer(parseInt(val));
                        setShowFeedback(false);
                      }}
                    >
                      <div className="space-y-3">
                        {phase.quiz.options.map((option, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <RadioGroupItem value={idx.toString()} id={`quiz-${idx}`} />
                            <Label 
                              htmlFor={`quiz-${idx}`}
                              className={`flex-1 cursor-pointer p-3 rounded-lg border ${
                                showFeedback && idx === phase.quiz.correct
                                  ? 'border-green-500 bg-green-50'
                                  : showFeedback && idx === selectedAnswer
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-neutral-200 hover:border-blue-200 hover:bg-blue-50'
                              }`}
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {showFeedback && selectedAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${
                          selectedAnswer === phase.quiz.correct
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-orange-50 border border-orange-200'
                        }`}
                      >
                        {selectedAnswer === phase.quiz.correct ? (
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-green-800 mb-1">✅ Correto!</p>
                              <p className="text-green-700 text-sm">
                                Essa resposta demonstra especificidade e profissionalismo.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-orange-800 mb-1">💭 Não exatamente.</p>
                            <p className="text-orange-700 text-sm">
                              A melhor resposta é: "{phase.quiz.options[phase.quiz.correct]}". 
                              Em entrevistas, seja específico sobre suas habilidades.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {!showFeedback && selectedAnswer !== null && (
                      <Button onClick={handleCheckAnswer} className="w-full">
                        Verificar Resposta
                      </Button>
                    )}
                  </div>
                )}

                {/* Active Recall Phase */}
                {phase.phase === 'recall' && (
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="text-neutral-800">{phase.prompt}</p>
                    </div>

                    <Textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your answer here..."
                      className="min-h-[200px]"
                    />

                    <div className="flex justify-between items-center text-sm text-neutral-600">
                      <span>{userInput.length} characters</span>
                      <span>Minimum 20 characters</span>
                    </div>

                    {userInput.length > 20 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-blue-800 mb-1">💡 Teacher AI Tip</p>
                            <p className="text-blue-700 text-sm">
                              Ótimo! Sua resposta mostra estrutura. Considere adicionar um número específico 
                              (ex: "3 years of experience") para maior impacto.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Feedback Phase */}
                {phase.phase === 'feedback' && (
                  <div className="space-y-4 text-center py-8">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2">🎉 Lição Concluída!</h3>
                      <p className="text-neutral-600 max-w-md mx-auto">
                        Você completou o Dia {day} com sucesso. Continue praticando para manter o progresso!
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl mb-1">100</div>
                        <div className="text-sm text-neutral-600">Pontos</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl mb-1">15</div>
                        <div className="text-sm text-neutral-600">Minutos</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl mb-1">🔥</div>
                        <div className="text-sm text-neutral-600">Streak +1</div>
                      </div>
                    </div>

                    <Button variant="outline" onClick={onOpenChat}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Praticar mais com Teacher AI
                    </Button>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
                    disabled={currentPhase === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {currentPhase === lessonContent.length - 1 ? 'Concluir Lição' : 'Próximo'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
