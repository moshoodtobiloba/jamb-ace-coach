import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_EMAIL = 'moshoodabdulmujib9@gmail.com';

export default function ContactForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`JAMB ACE COACH Feedback from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank');

    // Also store offline
    const msgs = JSON.parse(localStorage.getItem('jamb-contact-msgs') || '[]');
    msgs.push({ name, message, date: new Date().toISOString() });
    localStorage.setItem('jamb-contact-msgs', JSON.stringify(msgs));

    setSent(true);
    setTimeout(() => { setSent(false); onClose(); setName(''); setMessage(''); }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-background/95 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black tracking-wider text-foreground">📧 CONTACT US</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
            </div>

            {sent ? (
              <div className="text-center py-8 space-y-3">
                <span className="text-4xl">✅</span>
                <p className="text-sm text-foreground font-bold">Message prepared!</p>
                <p className="text-xs text-muted-foreground">Your email app should open. If not, email us at {CONTACT_EMAIL}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">YOUR MESSAGE</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold text-sm tracking-wider hover:bg-primary/80 transition-colors"
                >
                  📤 SEND MESSAGE
                </button>
                <p className="text-center text-[10px] text-muted-foreground">
                  Or email directly: {CONTACT_EMAIL}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
