import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.removeToken();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="bg-card border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_20px_hsl(180_100%_50%/0.3)]">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-1">
                  Autenticação Concluída!
                </h2>
                <p className="text-muted-foreground">
                  Você está logado no sistema
                </p>
              </div>
            </div>

            <div className="bg-input/30 rounded-lg p-4 border border-border/30">
              <p className="text-sm text-muted-foreground mb-2">Token de Autenticação:</p>
              <code className="text-primary font-mono text-xs break-all">
                {authService.getToken() || 'Nenhum token encontrado'}
              </code>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom duration-500 delay-100">
            <div className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)]">
              <h3 className="text-lg font-semibold text-foreground mb-2">Status</h3>
              <p className="text-primary font-bold text-2xl">Ativo</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all hover:shadow-[0_0_15px_hsl(277_89%_36%/0.2)]">
              <h3 className="text-lg font-semibold text-foreground mb-2">Sessão</h3>
              <p className="text-accent font-bold text-2xl">Válida</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)]">
              <h3 className="text-lg font-semibold text-foreground mb-2">Tipo</h3>
              <p className="text-foreground font-bold text-2xl">Admin</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
