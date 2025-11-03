import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const ReadingTask = ({ onComplete, taskNumber, totalTasks }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [taskStarted, setTaskStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const words = [
    { word: 'table', isReal: true },
    { word: 'flim', isReal: false },
    { word: 'beautiful', isReal: true },
    { word: 'smorp', isReal: false },
    { word: 'computer', isReal: true },
    { word: 'glurb', isReal: false },
    { word: 'garden', isReal: true },
    { word: 'tralph', isReal: false },
    { word: 'hospital', isReal: true },
    { word: 'blint', isReal: false },
    { word: 'elephant', isReal: true },
    { word: 'quirp', isReal: false },
    { word: 'mountain', isReal: true },
    { word: 'zelt', isReal: false },
    { word: 'kitchen', isReal: true },
    { word: 'frex', isReal: false },
    { word: 'telephone', isReal: true },
    { word: 'plurn', isReal: false },
    { word: 'library', isReal: true },
    { word: 'grix', isReal: false }
  ];

  useEffect(() => {
    if (taskStarted && !startTime) {
      setStartTime(Date.now());
    }
  }, [taskStarted, startTime]);

  const handleResponse = (isReal) => {
    const responseTime = Date.now() - startTime;
    const currentWord = words?.[currentWordIndex];
    const isCorrect = isReal === currentWord?.isReal;

    const response = {
      word: currentWord?.word,
      userAnswer: isReal,
      correctAnswer: currentWord?.isReal,
      isCorrect,
      responseTime: responseTime - (userResponses?.length * 1000) // Approximate time for this word
    };

    const newResponses = [...userResponses, response];
    setUserResponses(newResponses);

    if (currentWordIndex < words?.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Task completed
      const totalTime = Date.now() - startTime;
      const correctAnswers = newResponses?.filter(r => r?.isCorrect)?.length;
      const accuracy = (correctAnswers / words?.length) * 100;
      const averageResponseTime = newResponses?.reduce((sum, r) => sum + r?.responseTime, 0) / newResponses?.length;

      const results = {
        responses: newResponses,
        totalTime,
        accuracy,
        averageResponseTime,
        correctAnswers,
        totalWords: words?.length
      };

      onComplete(results);
    }
  };

  const startTask = () => {
    setShowInstructions(false);
    setTaskStarted(true);
  };

  if (showInstructions) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            Reading Task Instructions
          </h3>
          <div className="text-left text-blue-800 space-y-3">
            <p className="flex items-start space-x-2">
              <span className="font-semibold">📖</span>
              <span>You will see a series of words, one at a time</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">🤔</span>
              <span>Some words are real English words, others are made-up</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">✅</span>
              <span>Click "Real Word" if it's a genuine English word</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">❌</span>
              <span>Click "Fake Word" if it's made-up</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">⏱️</span>
              <span>Work at your natural pace - both speed and accuracy matter</span>
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-800">
            <strong>Example:</strong> "table" is a real word, "flim" is fake
          </p>
        </div>
        <Button onClick={startTask} className="bg-blue-600 hover:bg-blue-700">
          Start Reading Task
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
            className="bg-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      {/* Current Word */}
      <motion.div
        key={currentWordIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-2xl border-2 border-gray-200"
      >
        <div className="text-6xl font-bold text-gray-900 mb-8 font-mono">
          {currentWord?.word}
        </div>
        
        <div className="text-lg text-gray-600 mb-8">
          Is this a real English word?
        </div>

        <div className="flex justify-center space-x-6">
          <Button
            onClick={() => handleResponse(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
          >
            <CheckCircle className="w-6 h-6" />
            <span>Real Word</span>
          </Button>
          
          <Button
            onClick={() => handleResponse(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-xl flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
          >
            <XCircle className="w-6 h-6" />
            <span>Fake Word</span>
          </Button>
        </div>
      </motion.div>
      {/* Timer */}
      <div className="flex items-center justify-center space-x-2 text-gray-500">
        <Clock className="w-4 h-4" />
        <span>Take your time, accuracy is important</span>
      </div>
    </motion.div>
  );
};

export default ReadingTask;