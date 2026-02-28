import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Calculator({ isOpen, onClose }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const handleNumber = (n: string) => {
    if (fresh) {
      setDisplay(n);
      setFresh(false);
    } else {
      setDisplay(d => d === '0' ? n : d + n);
    }
  };

  const handleOp = (o: string) => {
    setPrev(parseFloat(display));
    setOp(o);
    setFresh(true);
  };

  const handleEqual = () => {
    if (prev === null || !op) return;
    const curr = parseFloat(display);
    let result = 0;
    switch (op) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '×': result = prev * curr; break;
      case '÷': result = curr !== 0 ? prev / curr : 0; break;
    }
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const handleDot = () => {
    if (!display.includes('.')) {
      setDisplay(d => d + '.');
      setFresh(false);
    }
  };

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="absolute top-12 right-4 z-50 w-56 bg-card border border-border rounded-lg shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground">CALCULATOR</span>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
          </div>

          {/* Display */}
          <div className="px-3 py-3 text-right bg-background border-b border-border">
            <p className="text-xs text-muted-foreground h-4">{prev !== null ? `${prev} ${op}` : ''}</p>
            <p className="text-2xl font-mono font-bold text-foreground truncate">{display}</p>
          </div>

          {/* Clear */}
          <div className="px-2 pt-2">
            <button
              onClick={handleClear}
              className="w-full py-2 text-xs font-bold tracking-wider bg-destructive/20 text-destructive rounded hover:bg-destructive/30 transition-colors"
            >
              CLEAR
            </button>
          </div>

          {/* Buttons */}
          <div className="p-2 grid grid-cols-4 gap-1">
            {buttons.flat().map(btn => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === '=') handleEqual();
                  else if (btn === '.') handleDot();
                  else if (['+', '-', '×', '÷'].includes(btn)) handleOp(btn);
                  else handleNumber(btn);
                }}
                className={`py-3 rounded text-sm font-bold transition-colors ${
                  ['+', '-', '×', '÷'].includes(btn)
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : btn === '='
                    ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
