import { Component, type ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.error('App error:', error); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <p className="page-kicker">Something went wrong</p>
        <h1 className="mt-3 font-serif text-4xl">Your progress is safe.</h1>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">This screen hit a problem. Go back to Headquarters and continue studying.</p>
        <button onClick={() => { window.location.href = '/?tab=dashboard'; }} className="mt-8 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back to Headquarters</button>
      </div>
    );
  }
}
