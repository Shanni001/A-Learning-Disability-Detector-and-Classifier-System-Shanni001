import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Eye, EyeOff, Clock, ArrowRight } from 'lucide-react';

const SpellingTask = ({ onComplete, taskNumber, totalTasks }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [isInputPhase, setIsInputPhase] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [wordStartTime, setWordStartTime] = useState(null);

  const words = [
    'beautiful',
    'necessary',
    'environment',
    'government',
    'restaurant',
    'architecture',
    'psychology',
    'mathematics',
    'encyclopedia',
    'achievement',
    'responsibility',
    'independence',
    'communication',
    'organization',
    'understanding'
  ];

  const calculateEditDistance = (str1, str2) => {
    const len1 = str1?.length;
    const len2 = str2?.length;
    const matrix = Array(len1 + 1)?.fill(null)?.map(() => Array(len2 + 1)?.fill(null));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1?.[i - 1] === str2?.[j - 1]) {
          matrix[i][j] = matrix?.[i - 1]?.[j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix?.[i - 1]?.[j - 1] + 1,
            matrix?.[i]?.[j - 1] + 1,
            matrix?.[i - 1]?.[j] + 1
          );
        }
      }
    }

    return matrix?.[len1]?.[len2];
  };

  const startTask = () => {
    setShowInstructions(false);
    setStartTime(Date.now());
    showCurrentWord();
  };

  const showCurrentWord = () => {
    setShowWord(true);
    setWordStartTime(Date.now());
    
    // Hide word after 2 seconds
    setTimeout(() => {
      setShowWord(false);
      setIsInputPhase(true);
    }, 2000);
  };

  const handleSubmit = () => {
    const currentWord = words?.[currentWordIndex];
    const userAnswer = userInput?.toLowerCase()?.trim();
    const correctAnswer = currentWord?.toLowerCase();
    const editDistance = calculateEditDistance(userAnswer, correctAnswer);
    const accuracy = Math.max(0, ((correctAnswer?.length - editDistance) / correctAnswer?.length) * 100);
    const responseTime = Date.now() - wordStartTime;

    const response = {
      word: currentWord,
      userAnswer: userInput,
      correctAnswer: currentWord,
      editDistance,
      accuracy,
      responseTime,
      isExact: userAnswer === correctAnswer
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);
    setUserInput('');
    setIsInputPhase(false);

    if (currentWordIndex < words?.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      // Show next word after brief pause
      setTimeout(() => {
        showCurrentWord();
      }, 1000);
    } else {
      // Task completed
      const totalTime = Date.now() - startTime;
      const averageAccuracy = newResponses?.reduce((sum, r) => sum + r?.accuracy, 0) / newResponses?.length;
      const exactMatches = newResponses?.filter(r => r?.isExact)?.length;
      const averageResponseTime = newResponses?.reduce((sum, r) => sum + r?.responseTime, 0) / newResponses?.length;

      const results = {
        responses: newResponses,
        totalTime,
        averageAccuracy,
        exactMatches,
        totalWords: words?.length,
        averageResponseTime
      };

      onComplete(results);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && userInput?.trim()) {
      handleSubmit();
    }
  };

  if (showInstructions) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">
            Spelling/Typing Task Instructions
          </h3>
          <div className="text-left text-purple-800 space-y-3">
            <p className="flex items-start space-x-2">
              <span className="font-semibold">👁️</span>
              <span>A word will appear on screen for exactly 2 seconds</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">💭</span>
              <span>Memorize the word while it's displayed</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">⌨️</span>
              <span>Type the word from memory when prompted</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">🎯</span>
              <span>Try to spell it exactly as you remember</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">⏭️</span>
              <span>Press Enter or click Submit to continue</span>
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-800">
            <strong>Tip:</strong> Focus on the word structure and letter patterns during the 2-second display
          </p>
        </div>
        <Button onClick={startTask} className="bg-purple-600 hover:bg-purple-700">
          Start Spelling Task
        </Button>
      </motion.div>
    );
  }

  const currentWord = words?.[currentWordIndex];
  const progress = ((currentWordIndex + 1) / words?.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Word {currentWordIndex + 1} of {words?.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      {/* Word Display Phase */}
      {showWord && !isInputPhase && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-16 rounded-2xl border-2 border-purple-200"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Eye className="w-8 h-8 text-purple-600" />
            <span className="text-lg font-semibold text-purple-800">Memorize this word</span>
          </div>
          
          <div className="text-7xl font-bold text-purple-900 mb-8 font-mono tracking-wide">
            {currentWord}
          </div>
          
          <div className="text-lg text-purple-600">
            Word will disappear in 2 seconds...
          </div>
        </motion.div>
      )}
      {/* Waiting Phase */}
      {!showWord && !isInputPhase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 p-16 rounded-2xl border-2 border-gray-200"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Clock className="w-8 h-8 text-gray-500 animate-spin" />
            <span className="text-lg font-semibold text-gray-700">Get ready to type...</span>
          </div>
        </motion.div>
      )}
      {/* Input Phase */}
      {isInputPhase && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-12 rounded-2xl border-2 border-blue-200"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            <EyeOff className="w-8 h-8 text-blue-600" />
            <span className="text-lg font-semibold text-blue-800">Type the word from memory</span>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type the word here..."
              className="text-2xl text-center font-mono py-4 px-6 rounded-xl border-2 border-blue-300 focus:border-blue-500"
              autoFocus
            />
            
            <Button
              onClick={handleSubmit}
              disabled={!userInput?.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 px-8 py-3 text-lg font-semibold rounded-xl flex items-center space-x-2 mx-auto"
            >
              <span>Submit</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="mt-6 text-sm text-blue-600">
            Press Enter to submit quickly
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpellingTask;