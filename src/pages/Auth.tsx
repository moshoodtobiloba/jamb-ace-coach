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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        {/* Logo */}
        <div className="text-center space-y-3">
          <span className="text-4xl">🤖</span>
          <h1 className="text-2xl font-black tracking-wider text-foreground glow-green">JAMB MACHINE</h1>
          <p className="text-xs text-muted-foreground tracking-widest">TARGET 360+ • BE DIFFERENT • 2026</p>
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
                className="w-full bg-muted border border-border rounded px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
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
              className="w-full bg-muted border border-border rounded px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
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
              className="w-full bg-muted border border-border rounded px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded font-bold tracking-wider text-sm hover:bg-primary/80 transition-colors disabled:opacity-50"
          >
            {loading ? '⚡ PROCESSING...' : isLogin ? '⚡ ACTIVATE MACHINE' : '⚡ CREATE ACCOUNT'}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-bold">
            {isLogin ? 'SIGN UP' : 'LOG IN'}
          </button>
        </p>

        <p className="text-center text-[10px] text-muted-foreground tracking-widest pulse-slow">
          SUCCESS IS NOT OPTIONAL. IT'S THE PLAN.
        </p>
      </motion.div>
    </div>
  );
}
