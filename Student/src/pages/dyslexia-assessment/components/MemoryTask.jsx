import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Brain, Eye, EyeOff, RotateCcw, ArrowRight } from 'lucide-react';

const MemoryTask = ({ onComplete, taskNumber, totalTasks }) => {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [isInputPhase, setIsInputPhase] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [sequenceStartTime, setSequenceStartTime] = useState(null);

  const sequences = [
    // Visual sequences (letters/numbers)
    { type: 'visual', content: 'B7M', displayTime: 2000, isReverse: false },
    { type: 'visual', content: '4K9L', displayTime: 2500, isReverse: false },
    { type: 'visual', content: 'J2X8P', displayTime: 3000, isReverse: false },
    { type: 'visual', content: '3F7', displayTime: 2000, isReverse: true }, // Reverse order
    { type: 'visual', content: 'Q5N1', displayTime: 2500, isReverse: true },
    { type: 'visual', content: 'H8K2M', displayTime: 3000, isReverse: true },
    
    // Number sequences
    { type: 'visual', content: '271', displayTime: 2000, isReverse: false },
    { type: 'visual', content: '5832', displayTime: 2500, isReverse: false },
    { type: 'visual', content: '46179', displayTime: 3000, isReverse: false },
    { type: 'visual', content: '394', displayTime: 2000, isReverse: true },
    { type: 'visual', content: '7251', displayTime: 2500, isReverse: true },
    { type: 'visual', content: '85263', displayTime: 3000, isReverse: true }
  ];

  const startTask = () => {
    setShowInstructions(false);
    startSequence();
  };

  const startSequence = () => {
    const currentSequence = sequences?.[currentSequenceIndex];
    setIsDisplaying(true);
    setDisplayIndex(0);
    setSequenceStartTime(Date.now());
    
    // Display sequence character by character
    const displayDuration = currentSequence?.displayTime / currentSequence?.content?.length;
    
    const interval = setInterval(() => {
      setDisplayIndex(prev => {
        if (prev < currentSequence?.content?.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsDisplaying(false);
            setIsInputPhase(true);
          }, 500);
          return prev;
        }
      });
    }, displayDuration);
  };

  const handleSubmit = () => {
    const currentSequence = sequences?.[currentSequenceIndex];
    const responseTime = Date.now() - sequenceStartTime;
    
    let expectedAnswer;
    if (currentSequence?.isReverse) {
      expectedAnswer = currentSequence?.content?.split('')?.reverse()?.join('');
    } else {
      expectedAnswer = currentSequence?.content;
    }
    
    const userAnswer = userInput?.toUpperCase()?.replace(/\s/g, '');
    const isCorrect = userAnswer === expectedAnswer;
    
    // Calculate accuracy based on character matches
    let correctChars = 0;
    const minLength = Math.min(userAnswer?.length, expectedAnswer?.length);
    for (let i = 0; i < minLength; i++) {
      if (userAnswer?.[i] === expectedAnswer?.[i]) {
        correctChars++;
      }
    }
    const accuracy = expectedAnswer?.length > 0 ? (correctChars / expectedAnswer?.length) * 100 : 0;

    const response = {
      sequence: currentSequence?.content,
      type: currentSequence?.type,
      isReverse: currentSequence?.isReverse,
      expectedAnswer,
      userAnswer,
      isCorrect,
      accuracy,
      responseTime
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);
    setUserInput('');
    setIsInputPhase(false);

    if (currentSequenceIndex < sequences?.length - 1) {
      setCurrentSequenceIndex(prev => prev + 1);
      setTimeout(() => {
        startSequence();
      }, 1500);
    } else {
      // Task completed
      const correctCount = newResponses?.filter(r => r?.isCorrect)?.length;
      const averageAccuracy = newResponses?.reduce((sum, r) => sum + r?.accuracy, 0) / newResponses?.length;
      const averageResponseTime = newResponses?.reduce((sum, r) => sum + r?.responseTime, 0) / newResponses?.length;

      const results = {
        responses: newResponses,
        correctCount,
        totalSequences: sequences?.length,
        accuracy: (correctCount / sequences?.length) * 100,
        averageAccuracy,
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
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-indigo-900 mb-4">
            Short-Term Memory Task Instructions
          </h3>
          <div className="text-left text-indigo-800 space-y-3">
            <p className="flex items-start space-x-2">
              <span className="font-semibold">👁️</span>
              <span>Watch sequences of letters and numbers appear one at a time</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">🧠</span>
              <span>Memorize the sequence in the order shown</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">⌨️</span>
              <span>Type the sequence from memory</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">🔄</span>
              <span>Some sequences need to be typed in REVERSE order</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">⚡</span>
              <span>Pay attention to the instruction for each sequence</span>
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-800">
            <strong>Example:</strong> If you see "A3B" and it says "Type in reverse order", answer "B3A"
          </p>
        </div>
        <Button onClick={startTask} className="bg-indigo-600 hover:bg-indigo-700">
          Start Memory Task
        </Button>
      </motion.div>
    );
  }

  const currentSequence = sequences?.[currentSequenceIndex];
  const progress = ((currentSequenceIndex + 1) / sequences?.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Sequence {currentSequenceIndex + 1} of {sequences?.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-indigo-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      {/* Task Instructions */}
      {!isDisplaying && !isInputPhase && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl border-2 border-indigo-200"
        >
          <div className="space-y-4">
            <Brain className="w-12 h-12 text-indigo-600 mx-auto" />
            <h3 className="text-xl font-bold text-indigo-900">
              Get Ready for Sequence {currentSequenceIndex + 1}
            </h3>
            <p className="text-lg text-indigo-800">
              {currentSequence?.isReverse ? (
                <span className="flex items-center justify-center space-x-2">
                  <RotateCcw className="w-5 h-5" />
                  <span>Memorize, then type in <strong>REVERSE</strong> order</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <ArrowRight className="w-5 h-5" />
                  <span>Memorize, then type in <strong>SAME</strong> order</span>
                </span>
              )}
            </p>
          </div>
        </motion.div>
      )}
      {/* Display Phase */}
      {isDisplaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-16 rounded-2xl border-2 border-purple-200"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Eye className="w-8 h-8 text-purple-600" />
            <span className="text-lg font-semibold text-purple-800">Memorize this sequence</span>
          </div>
          
          <div className="text-8xl font-bold text-purple-900 mb-8 font-mono tracking-widest">
            {currentSequence?.content?.slice(0, displayIndex + 1)}
          </div>
          
          <div className="text-lg text-purple-600">
            {currentSequence?.isReverse ? 'Remember to type in REVERSE order' : 'Type in the same order'}
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
            <span className="text-lg font-semibold text-blue-800">
              Type the sequence {currentSequence?.isReverse ? 'in REVERSE order' : 'in the SAME order'}
            </span>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentSequence?.isReverse ? "Type in reverse order..." : "Type the sequence..."}
              className="text-3xl text-center font-mono py-4 px-6 rounded-xl border-2 border-blue-300 focus:border-blue-500 tracking-widest"
              autoFocus
              maxLength={currentSequence?.content?.length}
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
            {currentSequence?.isReverse ? (
              <span className="flex items-center justify-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Remember: Reverse the order!</span>
              </span>
            ) : (
              <span>Type in the same order you saw</span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MemoryTask;