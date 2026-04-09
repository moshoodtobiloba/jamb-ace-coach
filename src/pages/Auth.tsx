import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, name || 'Student');
      }
      navigate('/');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOfflineAccess = () => {
    // Set offline flag and navigate
    try {
      localStorage.setItem('jamb-offline-access', 'true');
      localStorage.setItem('jamb-guest-name', name || 'Student');
    } catch {}
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-6"
      >
        {/* Logo */}
        <div className="text-center space-y-3">
          <img src="/logo-192.png" alt="ACE COACH" className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-black tracking-wider text-foreground glow-green">JAMB ACE COACH</h1>
          <p className="text-xs text-muted-foreground tracking-widest">FREE UTME PREP • TARGET 300+ • 2026</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">YOUR NAME</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Tobi"
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          )}
          <div>
            <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold tracking-wider text-sm hover:bg-primary/80 transition-colors disabled:opacity-50"
          >
            {loading ? '⏳ PROCESSING...' : isLogin ? '⚡ SIGN IN' : '⚡ CREATE ACCOUNT'}
          </button>
        </form>

        {/* Offline / Guest Access */}
        <div className="border-t border-border pt-4">
          <button
            onClick={handleOfflineAccess}
            className="w-full py-3 border border-border rounded-lg text-sm font-bold tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            📱 CONTINUE OFFLINE (No Data Needed)
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-2 tracking-wider">
            Use the app without signing in. Your progress saves locally.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-bold">
            {isLogin ? 'SIGN UP' : 'LOG IN'}
          </button>
        </p>

        <p className="text-center text-[10px] text-muted-foreground tracking-widest pulse-slow">
          YOUR SUCCESS IS THE PLAN. LET'S GO.
        </p>
      </motion.div>
    </div>
  );
}
