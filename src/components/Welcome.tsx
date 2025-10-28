import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeProps {
  onNext: () => void;
  onUpdateProfile: (updates: { name: string }) => void;
}

export function Welcome({ onNext, onUpdateProfile }: WelcomeProps) {
  const [name, setName] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleStart = () => {
    if (name.trim()) {
      onUpdateProfile({ name: name.trim() });
      onNext();
    }
  };

  if (!showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-blue-900">
              English AI Tutor
            </h1>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Melhore seu inglês para entrevistas técnicas com aulas personalizadas de 10-20 minutos. 
              Avance do seu nível atual até C1 com metodologia comprovada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Começar agora
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setShowLogin(true)}
            >
              Já tenho conta
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            <Card>
              <CardContent className="pt-6 px-4 sm:px-6 text-center">
                <div className="text-blue-600 mb-2">⚡</div>
                <h3 className="mb-1">Aulas de 10-20 min</h3>
                <p className="text-neutral-600 text-sm">Método APA otimizado</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-blue-600 mb-2">🎯</div>
                <h3 className="mb-1">Focado em Tech</h3>
                <p className="text-neutral-600 text-sm">Vocabulário de TI</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-blue-600 mb-2">🤖</div>
                <h3 className="mb-1">Teacher AI</h3>
                <p className="text-neutral-600 text-sm">Feedback personalizado</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo de volta!</CardTitle>
            <CardDescription>
              Entre com seus dados para começar sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input 
                id="name"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email"
                type="email"
                placeholder="seu@email.com"
              />
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleStart}
              disabled={!name.trim()}
            >
              Continuar
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-500">ou</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar com Google
            </Button>

            <p className="text-xs text-neutral-500 text-center">
              Ao continuar, você aceita nossos termos de uso e política de privacidade
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
