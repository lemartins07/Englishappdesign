import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Volume2, CheckCircle2 } from 'lucide-react';

interface LevelTestProps {
  onComplete: (level: string) => void;
}

const questions = [
  {
    type: 'mcq',
    question: 'Complete: "I ____ working on this project for two months."',
    options: ['am', 'have been', 'was', 'will be'],
    correct: 1
  },
  {
    type: 'mcq',
    question: 'Choose the correct sentence:',
    options: [
      'She dont like coffee',
      'She doesnt likes coffee',
      'She doesn\'t like coffee',
      'She don\'t likes coffee'
    ],
    correct: 2
  },
  {
    type: 'listening',
    question: 'Listen to the audio and choose what you heard:',
    audio: 'Sample audio: "I implemented a new feature using React hooks"',
    options: [
      'I implemented a new feature using React hooks',
      'I implemented a new function using React hooks',
      'I implemented a new feature using Redux hooks',
      'I implemented a new future using React hooks'
    ],
    correct: 0
  },
  {
    type: 'mcq',
    question: 'What does "API" stand for in software development?',
    options: [
      'Application Programming Interface',
      'Advanced Programming Integration',
      'Automated Process Interface',
      'Application Process Integration'
    ],
    correct: 0
  },
  {
    type: 'speaking',
    question: 'Record a short answer: "Tell me about your experience with programming languages."',
    hint: 'Speak for 20-30 seconds'
  }
];

export function LevelTest({ onComplete }: LevelTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleNext = () => {
    if (question.type === 'speaking') {
      answers.push(1); // Simulated answer
    } else if (selectedAnswer !== null) {
      answers.push(selectedAnswer);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setHasRecorded(false);
    } else {
      // Calculate level based on correct answers
      const correctCount = answers.reduce((acc, answer, idx) => {
        return acc + (questions[idx].type !== 'speaking' && answer === questions[idx].correct ? 1 : 0);
      }, 0);
      
      let level = 'A2';
      if (correctCount >= 3) level = 'B1';
      if (correctCount >= 4) level = 'B2';
      
      onComplete(level);
    }
  };

  const handleRecord = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
    }, 2000);
  };

  const canProceed = question.type === 'speaking' ? hasRecorded : selectedAnswer !== null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>Teste de Nivelamento</span>
            <span>{currentQuestion + 1} de {questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {question.type === 'mcq' && '📝 Multiple Choice'}
                  {question.type === 'listening' && '🎧 Listening'}
                  {question.type === 'speaking' && '🎤 Speaking'}
                </CardTitle>
                <CardDescription>{question.question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {question.type === 'listening' && (
                  <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                    <Button size="sm" variant="outline">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Play Audio
                    </Button>
                    <span className="text-sm text-neutral-600">{question.audio}</span>
                  </div>
                )}

                {(question.type === 'mcq' || question.type === 'listening') && (
                  <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => setSelectedAnswer(parseInt(val))}>
                    <div className="space-y-3">
                      {question.options?.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                          <Label 
                            htmlFor={`option-${idx}`}
                            className="flex-1 cursor-pointer p-3 rounded-lg border border-transparent hover:border-blue-200 hover:bg-blue-50"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {question.type === 'speaking' && (
                  <div className="text-center space-y-4 py-8">
                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        onClick={handleRecord}
                        disabled={isRecording || hasRecorded}
                        className={`rounded-full w-24 h-24 ${
                          hasRecorded 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-orange-500 hover:bg-orange-600'
                        }`}
                      >
                        {hasRecorded ? (
                          <CheckCircle2 className="w-12 h-12" />
                        ) : (
                          <Mic className={`w-12 h-12 ${isRecording ? 'animate-pulse' : ''}`} />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {isRecording && 'Gravando... Fale naturalmente'}
                      {hasRecorded && '✅ Gravação concluída!'}
                      {!isRecording && !hasRecorded && 'Clique para gravar sua resposta'}
                    </p>
                    {question.hint && (
                      <p className="text-xs text-neutral-500">{question.hint}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {currentQuestion < questions.length - 1 ? 'Próxima' : 'Finalizar Teste'}
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
