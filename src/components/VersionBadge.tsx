import { isPreviewHost } from '@/lib/registerSW';

declare const __BUILD_ID__: string;

export function buildLabel() {
  const d = new Date(Number(__BUILD_ID__));
  return isNaN(d.getTime()) ? __BUILD_ID__ : d.toLocaleString('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function VersionBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${isPreviewHost ? 'text-muted-foreground' : 'text-primary'} ${className}`}>
      <span className={`size-1.5 rounded-full ${isPreviewHost ? 'bg-muted-foreground' : 'bg-primary'}`} />
      {isPreviewHost ? 'Preview' : 'Live'} · v{buildLabel()}
    </span>
  );
}
