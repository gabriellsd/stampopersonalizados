import React from 'react';
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Algo deu errado</h2>
          <p className="text-gray-600 text-sm max-w-sm mb-6">
            Ocorreu um erro ao carregar esta parte do site. Tente atualizar a página.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-brand-purple text-white font-semibold rounded-xl hover:bg-brand-purple/90 transition"
          >
            Atualizar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
