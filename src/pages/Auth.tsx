import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setLoading(true);
    try { if (isLogin) await signIn(email, password); else await signUp(email, password, name || 'Student'); navigate('/'); }
    catch (error) { toast({ title: 'Unable to continue', description: error instanceof Error ? error.message : 'Please try again.', variant: 'destructive' }); }
    finally { setLoading(false); }
  };

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_.95fr]">
      <section className="hidden border-r border-border px-12 py-10 lg:flex lg:flex-col lg:justify-between">
        <div><p className="font-serif text-2xl">EXAMGUIDE</p><p className="page-kicker mt-1">UTME 2027</p></div>
        <div className="max-w-xl"><p className="page-kicker">A serious place to prepare</p><h1 className="mt-5 text-7xl leading-[1.02]">Know the work.<br />Own the result.</h1><p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">Syllabus guidance, realistic CBT practice, clear explanations and your progress—together in one focused study space.</p></div>
        <p className="text-xs text-muted-foreground">Built for students preparing early for 2027.</p>
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-12 lg:hidden"><p className="font-serif text-2xl">EXAMGUIDE</p><p className="page-kicker mt-1">UTME 2027</p></div>
          <p className="page-kicker">{isLogin ? 'Welcome back' : 'Begin preparation'}</p>
          <h2 className="mt-3 text-4xl">{isLogin ? 'Continue where you stopped.' : 'Create your study account.'}</h2>
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {!isLogin && <label className="block text-sm font-medium">Your name<Input value={name} onChange={e => setName(e.target.value)} className="mt-2 h-12 rounded-sm bg-background" placeholder="How should we address you?" /></label>}
            <label className="block text-sm font-medium">Email address<Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-2 h-12 rounded-sm bg-background" placeholder="you@example.com" /></label>
            <label className="block text-sm font-medium">Password<Input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required className="mt-2 h-12 rounded-sm bg-background" placeholder="At least 6 characters" /></label>
            <Button type="submit" disabled={loading} className="h-12 w-full justify-between">{loading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}<ArrowRight /></Button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="mt-7 text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">{isLogin ? 'New here? Create an account' : 'Already registered? Sign in'}</button>
        </motion.div>
      </section>
    </main>
  );
}