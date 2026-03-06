'use client';
import { useState } from 'react';
import { FiCopy, FiCheck, FiPlay, FiCode } from 'react-icons/fi';

interface CodeExampleProps {
  title: string;
  description: string;
  language: string;
  code: string;
  applications: string[];
}

export function CodeExample({ 
  title, 
  description, 
  language, 
  code, 
  applications 
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const truncatedCode = code.split('\\n').slice(0, 15).join('\\n');
  const shouldTruncate = code.split('\\n').length > 15;
  const displayCode = expanded ? code : (shouldTruncate ? truncatedCode + '\\n\\n# ... (click to expand)' : code);

  return (
    <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-700/50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <FiCode style={{ color: 'var(--primary)' }} />
              {title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
                color: 'color-mix(in srgb, var(--primary) 80%, white)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)'
              }}
            >
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {shouldTruncate && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1 rounded text-white text-xs font-medium transition-all duration-300 flex items-center gap-1 hover:opacity-90"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 80%, transparent)'
              }}
            >
              {expanded ? 'Collapse' : 'Expand'}
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 bg-gray-700/80 hover:bg-gray-600/80 rounded text-white text-xs font-medium transition-all duration-300 flex items-center gap-1"
          >
            {copied ? (
              <>
                <FiCheck className="w-3 h-3" />
                Copied!
              </>
            ) : (
              <>
                <FiCopy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>

        <pre className="overflow-x-auto p-6 bg-gray-900/80 text-sm">
          <code className="text-gray-300 language-python">
            {displayCode}
          </code>
        </pre>
      </div>

      {/* Applications Footer */}
      <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-700/50">
        <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <FiPlay style={{ color: 'var(--secondary)' }} />
          Practical Applications:
        </h4>
        <div className="flex flex-wrap gap-2">
          {applications.map((application, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium border"
              style={{ backgroundColor: 'color-mix(in srgb, var(--secondary) 20%, transparent)', color: 'var(--secondary)', borderColor: 'color-mix(in srgb, var(--secondary) 30%, transparent)' }}
            >
              {application}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}