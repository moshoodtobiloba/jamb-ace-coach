import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemePreset {
  name: string;
  icon: string;
  vars: Record<string, string>;
}

const THEME_PRESETS: ThemePreset[] = [
  { name: 'Bright White (Default)', icon: '☀️', vars: {} },
  {
    name: 'Matrix',
    icon: '💚',
    vars: {
      '--background': '220 20% 6%',
      '--foreground': '120 100% 75%',
      '--card': '220 18% 10%',
      '--card-foreground': '120 100% 75%',
      '--primary': '120 100% 50%',
      '--primary-foreground': '220 20% 6%',
      '--muted': '220 15% 15%',
      '--muted-foreground': '120 30% 55%',
      '--border': '120 40% 20%',
      '--input': '120 40% 20%',
      '--ring': '120 100% 50%',
    },
  },
  {
    name: 'Clean White',
    icon: '⬜',
    vars: {
      '--background': '0 0% 100%',
      '--foreground': '220 15% 15%',
      '--card': '220 10% 97%',
      '--card-foreground': '220 15% 15%',
      '--primary': '220 80% 50%',
      '--primary-foreground': '0 0% 100%',
      '--muted': '220 10% 93%',
      '--muted-foreground': '220 10% 45%',
      '--border': '220 10% 88%',
      '--input': '220 10% 88%',
      '--ring': '220 80% 50%',
    },
  },
  {
    name: 'Dark Blue',
    icon: '🔵',
    vars: {
      '--background': '222 47% 8%',
      '--foreground': '210 40% 90%',
      '--card': '222 47% 12%',
      '--card-foreground': '210 40% 90%',
      '--primary': '217 91% 60%',
      '--primary-foreground': '0 0% 100%',
      '--muted': '222 40% 18%',
      '--muted-foreground': '215 20% 55%',
      '--border': '217 40% 22%',
      '--input': '217 40% 22%',
      '--ring': '217 91% 60%',
    },
  },
  {
    name: 'Purple',
    icon: '💜',
    vars: {
      '--background': '270 30% 8%',
      '--foreground': '270 30% 90%',
      '--card': '270 25% 12%',
      '--card-foreground': '270 30% 90%',
      '--primary': '270 80% 60%',
      '--primary-foreground': '0 0% 100%',
      '--muted': '270 20% 18%',
      '--muted-foreground': '270 15% 55%',
      '--border': '270 30% 22%',
      '--input': '270 30% 22%',
      '--ring': '270 80% 60%',
    },
  },
  {
    name: 'Warm Orange',
    icon: '🟠',
    vars: {
      '--background': '20 20% 6%',
      '--foreground': '30 50% 85%',
      '--card': '20 18% 11%',
      '--card-foreground': '30 50% 85%',
      '--primary': '25 95% 55%',
      '--primary-foreground': '0 0% 100%',
      '--muted': '20 15% 16%',
      '--muted-foreground': '25 20% 55%',
      '--border': '25 30% 22%',
      '--input': '25 30% 22%',
      '--ring': '25 95% 55%',
    },
  },
  {
    name: 'Pink',
    icon: '💗',
    vars: {
      '--background': '330 20% 6%',
      '--foreground': '330 30% 88%',
      '--card': '330 18% 11%',
      '--card-foreground': '330 30% 88%',
      '--primary': '330 80% 60%',
      '--primary-foreground': '0 0% 100%',
      '--muted': '330 15% 16%',
      '--muted-foreground': '330 15% 55%',
      '--border': '330 30% 22%',
      '--input': '330 30% 22%',
      '--ring': '330 80% 60%',
    },
  },
  {
    name: 'Teal',
    icon: '🩵',
    vars: {
      '--background': '180 25% 6%',
      '--foreground': '175 40% 85%',
      '--card': '180 20% 11%',
      '--card-foreground': '175 40% 85%',
      '--primary': '175 80% 45%',
      '--primary-foreground': '0 0% 100%',
      '--muted': '180 15% 16%',
      '--muted-foreground': '175 15% 50%',
      '--border': '175 30% 22%',
      '--input': '175 30% 22%',
      '--ring': '175 80% 45%',
    },
  },
];

const FONT_OPTIONS = [
  { name: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Manrope (Default)', value: '' },
  { name: 'System Default', value: "system-ui, -apple-system, sans-serif" },
  { name: 'Georgia', value: "Georgia, serif" },
];

const STORAGE_KEY = 'jamb-theme-settings';

function loadTheme(): { preset: string; font: string } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { preset: 'Bright White (Default)', font: '' };
}

function applyTheme(preset: ThemePreset, font: string) {
  const root = document.documentElement;
  ['--background','--foreground','--card','--card-foreground','--primary','--primary-foreground','--muted','--muted-foreground','--border','--input','--ring','--secondary','--secondary-foreground','--accent','--accent-foreground','--popover','--popover-foreground'].forEach(k => root.style.removeProperty(k));
  Object.entries(preset.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  document.body.style.fontFamily = font;
}

// Apply saved theme on load
export function initTheme() {
  const saved = loadTheme();
  const preset = THEME_PRESETS.find(p => p.name === saved.preset) || THEME_PRESETS[0];
  applyTheme(preset, saved.font);
}

interface ThemeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSettings({ isOpen, onClose }: ThemeSettingsProps) {
  const [settings, setSettings] = useState(loadTheme);
  
  useEffect(() => {
    const preset = THEME_PRESETS.find(p => p.name === settings.preset) || THEME_PRESETS[0];
    applyTheme(preset, settings.font);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/90 backdrop-blur z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-card border border-border rounded-lg p-6 max-w-md w-full space-y-5 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-widest text-foreground">🎨 APPEARANCE</h2>
              <button onClick={onClose} className="px-3 py-1 bg-muted rounded text-xs font-bold text-foreground hover:bg-muted/80">✕</button>
            </div>

            {/* Color Themes */}
            <div>
              <p className="text-[10px] text-muted-foreground tracking-widest mb-3">COLOR THEME</p>
              <div className="grid grid-cols-2 gap-2">
                {THEME_PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => setSettings(s => ({ ...s, preset: preset.name }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      settings.preset === preset.name
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground/50'
                    }`}
                  >
                    <span className="text-lg">{preset.icon}</span>
                    <p className="text-xs font-bold mt-1 text-foreground">{preset.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div>
              <p className="text-[10px] text-muted-foreground tracking-widest mb-3">FONT</p>
              <div className="space-y-2">
                {FONT_OPTIONS.map(font => (
                  <button
                    key={font.name}
                    onClick={() => setSettings(s => ({ ...s, font: font.value }))}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      settings.font === font.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground/50'
                    }`}
                    style={{ fontFamily: font.value }}
                  >
                    <p className="text-sm text-foreground">{font.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">The quick brown fox jumps over the lazy dog</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
