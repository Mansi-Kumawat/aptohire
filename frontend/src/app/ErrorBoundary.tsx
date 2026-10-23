import { Component, type ErrorInfo, type ReactNode } from 'react';
import { SealMark } from '@/components/brand/SealMark';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log minimal safe information without exposing PII
    if (process.env.NODE_ENV !== 'production') {
      console.error('Uncaught error in component tree:', error.message, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-mist flex items-center justify-center p-4 text-center">
          <div className="max-w-md w-full bg-canvas border border-hairline rounded-panel p-8 shadow-float space-y-5">
            <div className="flex justify-center">
              <SealMark size={40} />
            </div>

            <h1 className="text-[22px] font-display font-bold text-ink">
              Something went wrong
            </h1>

            <p className="text-[15px] text-moss leading-relaxed">
              An unexpected error occurred while loading this page. Please refresh to try again.
            </p>

            <div className="pt-2">
              <Button variant="primary" onClick={this.handleReload} fullWidth>
                Reload page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
