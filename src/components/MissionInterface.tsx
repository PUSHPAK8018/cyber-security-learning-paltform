import React, { useState } from 'react';
import { ArrowLeft, Target, CheckCircle, XCircle, AlertTriangle, Award } from 'lucide-react';
import { Mission, Choice } from '../types/game';

interface MissionInterfaceProps {
  mission: Mission;
  onComplete: (xpGained: number, success: boolean) => void;
  onExit: () => void;
}

export default function MissionInterface({ mission, onComplete, onExit }: MissionInterfaceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [results, setResults] = useState<Array<{ choice: Choice; selected: boolean }>>([]);

  const handleChoiceSelect = (choiceId: string) => {
    const choice = mission.scenario.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const newSelectedChoices = [...selectedChoices, choiceId];
    const newTotalXP = totalXP + choice.xpGain;
    const newResults = [...results, { choice, selected: true }];

    setSelectedChoices(newSelectedChoices);
    setTotalXP(newTotalXP);
    setResults(newResults);

    // Show result for this choice
    setTimeout(() => {
      if (currentStep < mission.scenario.choices.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const handleMissionComplete = () => {
    const successRate = totalXP / (mission.scenario.choices.length * 100);
    onComplete(totalXP, successRate > 0.6);
  };

  const getChoiceIcon = (correctness: string) => {
    switch (correctness) {
      case 'correct': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'partially': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'incorrect': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  const getCorrectnessBg = (correctness: string) => {
    switch (correctness) {
      case 'correct': return 'bg-green-500/20 border-green-500/50';
      case 'partially': return 'bg-yellow-500/20 border-yellow-500/50';
      case 'incorrect': return 'bg-red-500/20 border-red-500/50';
      default: return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
            <div className="text-center mb-8">
              <Award className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Mission Complete!</h2>
              <p className="text-cyan-400 text-lg">You earned {totalXP} XP</p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Your Choices & Results</h3>
              {results.map((result, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getCorrectnessBg(result.choice.correctness)}`}>
                  <div className="flex items-start gap-3">
                    {getChoiceIcon(result.choice.correctness)}
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">{result.choice.text}</p>
                      <p className="text-gray-300 mb-2">{result.choice.consequence}</p>
                      <p className="text-cyan-400 text-sm">{result.choice.explanation}</p>
                      <div className="mt-2 text-right">
                        <span className="text-yellow-400 font-bold">+{result.choice.xpGain} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onExit}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
              >
                Return to Dashboard
              </button>
              <button
                onClick={handleMissionComplete}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentChoice = selectedChoices[currentStep];
  const currentChoiceData = mission.scenario.choices.find(c => c.id === currentChoice);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-black/40 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{mission.title}</h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-cyan-400 text-sm">Step {currentStep + 1} of {mission.scenario.choices.length}</span>
              <span className="text-yellow-400 text-sm">Potential XP: {mission.xpReward}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / mission.scenario.choices.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Mission Content */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Scenario Setting</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{mission.scenario.setting}</h3>
            <p className="text-gray-300 mb-4">{mission.scenario.situation}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold text-white mb-3">Mission Objectives:</h4>
            <ul className="space-y-2">
              {mission.scenario.objectives.map((objective, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          {/* Show previous choice result */}
          {currentChoiceData && (
            <div className={`p-4 rounded-lg border mb-6 ${getCorrectnessBg(currentChoiceData.correctness)}`}>
              <div className="flex items-start gap-3">
                {getChoiceIcon(currentChoiceData.correctness)}
                <div>
                  <p className="text-white font-medium mb-2">Result:</p>
                  <p className="text-gray-300 mb-2">{currentChoiceData.consequence}</p>
                  <p className="text-cyan-400 text-sm">{currentChoiceData.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {currentStep < mission.scenario.choices.length && !selectedChoices[currentStep] && (
            <div>
              <h4 className="text-lg font-bold text-white mb-4">What is your next action?</h4>
              <div className="space-y-3">
                {mission.scenario.choices.slice(currentStep, currentStep + 1).map((choice) => (
                  mission.scenario.choices.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleChoiceSelect(option.id)}
                      className="w-full p-4 text-left rounded-lg border border-gray-600 bg-black/20 hover:border-cyan-500/50 hover:bg-black/40 transition-all group"
                    >
                      <p className="text-white group-hover:text-cyan-400 transition-colors">
                        {option.text}
                      </p>
                    </button>
                  ))
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}