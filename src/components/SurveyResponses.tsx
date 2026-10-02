import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface Row {
  id: string;
  responses: Record<string, string>;
  comment: string | null;
  created_at: string;
}

const LABELS: Record<string, string> = {
  q1: 'Overall rating',
  q2: 'Most used feature',
  q3: 'Ease of use',
  q4: 'Hardest subject',
  q5: 'Would recommend',
  q6: 'Daily study hours',
};

function toCsv(rows: Row[]) {
  const head = ['Date', ...Object.values(LABELS), 'Comment'];
  const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((r) => [
    new Date(r.created_at).toLocaleString(),
    ...Object.keys(LABELS).map((k) => String(r.responses?.[k] ?? '')),
    r.comment || r.responses?.comment || '',
  ].map(esc).join(','));
  return [head.map(esc).join(','), ...lines].join('\n');
}

export default function SurveyResponses({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('survey_responses').select('id, responses, comment, created_at').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError('Could not load responses. Check your connection.');
        else setRows((data ?? []) as Row[]);
        setLoading(false);
      });
  }, []);

  const download = () => {
    const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `examguide-survey-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="page-kicker">Owner only</p>
          <h2 className="font-serif text-2xl">Survey responses</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close"><X /></Button>
      </div>
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <p className="text-sm text-muted-foreground">{loading ? 'Loading…' : `${rows.length} responses`}</p>
        <Button size="sm" onClick={download} disabled={!rows.length}><Download /> Download CSV</Button>
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        {error && <p className="py-6 text-sm text-destructive">{error}</p>}
        {rows.map((r) => (
          <div key={r.id} className="border-b border-border py-4 text-sm">
            <p className="mb-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(LABELS).map(([k, label]) => (
                <div key={k} className="contents"><dt className="text-muted-foreground">{label}</dt><dd>{r.responses?.[k] ?? '—'}</dd></div>
              ))}
            </dl>
            {(r.comment || r.responses?.comment) && <p className="mt-2 italic">“{r.comment || r.responses?.comment}”</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
