import { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-steel-950 flex items-center justify-center p-4">
          <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Cos poszlo nie tak</h1>
            <p className="text-steel-400 mb-8">
              Wystapil nieoczekiwany blad. Sprobuj odswiezyc strone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                <RefreshCw className="w-4 h-4" />
                Odswiez strone
              </button>
              <Link to="/" className="btn-secondary" onClick={() => this.setState({ hasError: false })}>
                Strona glowna
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
