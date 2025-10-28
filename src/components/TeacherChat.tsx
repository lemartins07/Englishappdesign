import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, Send, ThumbsUp, ThumbsDown, Sparkles, Target } from 'lucide-react';
import { UserProfile } from '../App';

interface TeacherChatProps {
  userProfile: UserProfile;
  onBack: () => void;
  onStartInterview: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function TeacherChat({ userProfile, onBack, onStartInterview }: TeacherChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: `Hi ${userProfile.name}! I'm your AI English Teacher. 👋\n\nI can help you with:\n• Practice conversations\n• Correct your grammar\n• Role-play interview scenarios\n• Answer questions about technical vocabulary\n\nWhat would you like to practice today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: 'Practice interview', icon: Target },
    { label: 'Correct my text', icon: Sparkles },
    { label: 'Explain a concept', icon: Sparkles }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    
    if (lower.includes('interview') || lower.includes('practice')) {
      return `Great! Let's practice an interview scenario. 🎯\n\nImagine you're interviewing for a ${userProfile.track} position. I'll ask you:\n\n"Can you tell me about a challenging bug you fixed recently?"\n\nTake your time and answer using the STAR method (Situation, Task, Action, Result).`;
    }
    
    if (lower.includes('correct') || lower.includes('grammar')) {
      return `I'd be happy to help correct your English! 📝\n\nPlease write a sentence or paragraph, and I'll provide feedback on:\n• Grammar\n• Vocabulary\n• Sentence structure\n• Professional tone\n\nGo ahead and share what you'd like me to review.`;
    }
    
    return `That's a good question! For technical English in ${userProfile.track}, it's important to:\n\n1. Be specific with technical terms\n2. Use active voice when describing your work\n3. Quantify your achievements when possible\n\nWould you like to practice a specific scenario or need help with vocabulary?`;
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Online
          </Badge>
        </div>

        <Card className="min-h-[600px] flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600">
                <AvatarFallback className="text-white">AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Teacher AI</CardTitle>
                <p className="text-sm text-neutral-600">Seu tutor de inglês personalizado</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {message.role === 'ai' && (
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600">
                        <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}>
                        <p className="whitespace-pre-line text-sm">{message.content}</p>
                      </div>
                      {message.role === 'ai' && (
                        <div className="flex gap-2 mt-2 ml-2">
                          <button className="text-neutral-400 hover:text-blue-600 transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button className="text-neutral-400 hover:text-blue-600 transition-colors">
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600">
                    <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.label)}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message... (Press Enter to send)"
                className="min-h-[60px] resize-none"
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-neutral-500 mt-2 text-center">
              Teacher AI pode cometer erros. Sempre revise informações importantes.
            </p>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6 px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1">Pronto para o desafio?</h3>
                <p className="text-sm text-neutral-600">
                  Complete 5 lições para desbloquear o Simulador de Entrevista
                </p>
              </div>
              <Button 
                onClick={onStartInterview}
                disabled={userProfile.completedDays.length < 5}
                className="bg-orange-600 hover:bg-orange-700"
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
