import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validação básica
    if (!username.trim() || !password.trim()) {
      setError('Preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ username, password });
      authService.setToken(response.token);
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao fazer login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 shadow-[0_0_30px_hsl(180_100%_50%/0.3)]">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo</h1>
          <p className="text-muted-foreground">Faça login para continuar</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                Nome de Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive animate-in fade-in slide-in-from-top duration-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="login"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                onClick={() => toast({
                  title: "Recuperação de senha",
                  description: "Entre em contato com o administrador do sistema.",
                })}
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground animate-in fade-in duration-700 delay-200">
          <p>Teste com: admin / 12345</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
