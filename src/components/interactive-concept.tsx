'use client';
import { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';

interface InteractiveConceptProps {
  title: string;
  description: string;
  concept: 'bias-variance' | 'central-limit' | 'overfitting' | 'scaling';
}

export function InteractiveConcept({ title, description, concept }: InteractiveConceptProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const conceptData = {
    'bias-variance': {
      steps: 10,
      generateData: (step: number) => ({
        bias: Math.max(0.1, 1 - step * 0.08),
        variance: Math.min(1, step * 0.12),
        complexity: step + 1
      })
    },
    'central-limit': {
      steps: 8,
      generateData: (step: number) => ({
        sampleSize: Math.pow(2, step + 1),
        normalityScore: Math.min(1, step * 0.15),
        samples: Array.from({length: step + 1}, () => Math.random() * 100)
      })
    },
    'overfitting': {
      steps: 12,
      generateData: (step: number) => ({
        trainAccuracy: Math.min(1, 0.5 + step * 0.05),
        testAccuracy: step < 6 ? 0.5 + step * 0.04 : 0.74 - (step - 6) * 0.03,
        complexity: step + 1
      })
    },
    'scaling': {
      steps: 6,
      generateData: (step: number) => ({
        method: ['None', 'Min-Max', 'Z-Score', 'Robust', 'Unit Vector', 'Quantile'][step],
        accuracy: [0.65, 0.78, 0.85, 0.82, 0.79, 0.83][step],
        convergence: [50, 25, 12, 15, 20, 18][step]
      })
    }
  };

  const currentData = conceptData[concept].generateData(currentStep);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          if (next >= conceptData[concept].steps) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, concept]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const renderVisualization = () => {
    switch (concept) {
      case 'bias-variance':
        const bvData = currentData as { bias: number; variance: number; complexity: number };
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Bias</div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${bvData.bias * 100}%` }}
                  />
                </div>
                <div className="text-xs text-red-400 mt-1">{(bvData.bias * 100).toFixed(0)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Variance</div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${bvData.variance * 100}%` }}
                  />
                </div>
                <div className="text-xs text-purple-500 mt-1">{(bvData.variance * 100).toFixed(0)}%</div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-300">
              Model Complexity: {bvData.complexity}/10
            </div>
          </div>
        );

      case 'central-limit':
        const clData = currentData as { sampleSize: number; normalityScore: number; samples: number[] };
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">{clData.sampleSize}</div>
              <div className="text-sm text-gray-400">Sample Size</div>
            </div>
            <div className="flex justify-center space-x-1">
              {clData.samples.slice(0, 8).map((value, i) => (
                <div 
                  key={i}
                  className="w-4 bg-purple-500 rounded-t transition-all duration-500"
                  style={{ height: `${Math.max(20, value * 0.6)}px` }}
                />
              ))}
            </div>
            <div className="text-center text-xs text-gray-400">
              Distribution becoming more normal: {(clData.normalityScore * 100).toFixed(0)}%
            </div>
          </div>
        );

      case 'overfitting':
        const ofData = currentData as { trainAccuracy: number; testAccuracy: number; complexity: number };
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Training Accuracy</div>
                <div className="text-2xl font-bold text-green-400">
                  {(ofData.trainAccuracy * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Test Accuracy</div>
                <div className="text-2xl font-bold text-orange-400">
                  {(ofData.testAccuracy * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Model Complexity</div>
              <div className="text-lg font-semibold text-white">{ofData.complexity}/12</div>
              {ofData.trainAccuracy - ofData.testAccuracy > 0.15 && (
                <div className="text-xs text-red-400 mt-1">⚠️ Overfitting Detected</div>
              )}
            </div>
          </div>
        );

      case 'scaling':
        const sData = currentData as { method: string; accuracy: number; convergence: number };
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{sData.method}</div>
              <div className="text-sm text-gray-400">Scaling Method</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Model Accuracy</div>
                <div className="text-xl font-bold text-emerald-400">
                  {(sData.accuracy * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Epochs to Converge</div>
                <div className="text-xl font-bold text-purple-500">
                  {sData.convergence}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Visualization not implemented</div>;
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-6">{description}</p>

        {/* Visualization Area */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
          {renderVisualization()}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                isPlaying 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <FiPause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <FiPlay className="w-4 h-4" />
                  Play
                </>
              )}
            </button>
            
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium text-sm text-white transition-all duration-300 flex items-center gap-2"
            >
              <FiRotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {conceptData[concept].steps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / conceptData[concept].steps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}