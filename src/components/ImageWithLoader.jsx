import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { PLACEHOLDER_IMAGE } from '../utils/product';

/**
 * Imagem com skeleton de loading e botão "Tentar novamente" em caso de erro.
 */
export function ImageWithLoader({
  src,
  alt,
  className = '',
  onError: onErrorProp,
  wrapperClassName = '',
  ...imgProps
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = (e) => {
    setLoading(false);
    setError(true);
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMAGE;
    onErrorProp?.(e);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    setRetryKey((k) => k + 1);
  };

  return (
    <div className={`relative w-full h-full min-h-[80px] ${wrapperClassName}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" aria-hidden />
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2 text-center">Imagem não carregou</p>
          <button
            type="button"
            onClick={handleRetry}
            className="flex items-center gap-2 text-xs font-semibold text-brand-purple hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Tentar novamente
          </button>
        </div>
      )}
      <img
        key={retryKey}
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'} ${error ? 'hidden' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        {...imgProps}
      />
    </div>
  );
}
