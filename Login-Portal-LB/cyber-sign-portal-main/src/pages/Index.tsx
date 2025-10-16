import { useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-card p-4">
      <div className="text-center max-w-2xl animate-in fade-in slide-in-from-bottom duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 shadow-[0_0_40px_hsl(180_100%_50%/0.4)] animate-pulse">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="mb-4 text-5xl font-bold text-foreground">
          Sistema de Autenticação
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Módulo completo de login com integração backend
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/login')}
            variant="login"
            size="lg"
            className="gap-2"
          >
            <LogIn className="w-5 h-5" />
            Fazer Login
          </Button>
          
          <Button
            onClick={() => window.open('https://docs.lovable.dev', '_blank')}
            variant="outline"
            size="lg"
            className="gap-2 border-border hover:bg-accent hover:border-primary"
          >
            Documentação
          </Button>
        </div>

        <div className="mt-12 p-6 bg-card/50 rounded-xl border border-border/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground mb-3">Recursos Implementados</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>✓ Interface de login moderna com validação</li>
            <li>✓ Integração com API REST (Spring Boot)</li>
            <li>✓ Armazenamento seguro de tokens</li>
            <li>✓ Dashboard protegido</li>
            <li>✓ Sistema de mensagens de erro</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
