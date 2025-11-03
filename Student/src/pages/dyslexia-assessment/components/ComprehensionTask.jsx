import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { BookOpen, Clock, AlertCircle } from 'lucide-react';

const ComprehensionTask = ({ onComplete, taskNumber, totalTasks }) => {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [readingStartTime, setReadingStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [isReading, setIsReading] = useState(true);
  const [responses, setResponses] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [readingTimes, setReadingTimes] = useState([]);

  const passages = [
    {
      title: "The Library Discovery",
      text: `Sarah walked through the old library doors, breathing in the familiar scent of aged paper and leather bindings. She had been coming here every Saturday for three years, but today felt different. Behind the reference desk, she noticed a small wooden door she had never seen before. The librarian, Mrs. Chen, smiled knowingly when Sarah asked about it. "That leads to our rare book collection," she explained. "Would you like to see it?" Sarah's eyes lit up with excitement. The hidden room contained manuscripts that were hundreds of years old, each one carefully preserved behind glass cases. As she explored, Sarah realized that libraries held more mysteries than she had ever imagined.`,
      questions: [
        {
          question: "How long has Sarah been visiting the library?",
          options: ["Two years", "Three years", "Four years", "Five years"],
          correct: 1
        },
        {
          question: "What did Mrs. Chen say the wooden door led to?",
          options: ["Storage room", "Rare book collection", "Staff office", "Reading room"],
          correct: 1
        },
        {
          question: "How were the old manuscripts protected?",
          options: ["In wooden boxes", "Behind glass cases", "In metal safes", "Under plastic covers"],
          correct: 1
        },
        {
          question: "What did Sarah realize about libraries?",
          options: ["They were boring", "They held more mysteries than she imagined", "They were too quiet", "They needed more books"],
          correct: 1
        }
      ]
    },
    {
      title: "The Garden Project",
      text: `When Marcus decided to start a community garden in the empty lot next to his apartment building, many neighbors were skeptical. The soil looked hard and dry, and weeds covered most of the space. However, Marcus was determined to make it work. He spent weeks researching which plants would grow best in their climate and how to improve the soil quality. Slowly, other residents began to help. Mrs. Rodriguez donated seeds from her homeland, while teenager Jake contributed his weekends to help with the heavy digging. By the end of summer, the lot had transformed into a thriving garden with tomatoes, peppers, herbs, and flowers. The project brought the community together in ways Marcus had never expected.`,
      questions: [
        {
          question: "What was the initial condition of the lot?",
          options: ["Wet and muddy", "Hard, dry soil with weeds", "Already partially planted", "Covered in concrete"],
          correct: 1
        },
        {
          question: "What did Mrs. Rodriguez contribute to the project?",
          options: ["Tools", "Money", "Seeds from her homeland", "Soil"],
          correct: 2
        },
        {
          question: "How did Jake help with the garden?",
          options: ["He designed the layout", "He contributed weekends for heavy digging", "He watered the plants", "He sold the vegetables"],
          correct: 1
        },
        {
          question: "What unexpected result did the garden project have?",
          options: ["It made money", "It attracted insects", "It brought the community together", "It required too much work"],
          correct: 2
        }
      ]
    }
  ];

  const startTask = () => {
    setShowInstructions(false);
    setIsReading(true);
    setReadingStartTime(Date.now());
  };

  const finishReading = () => {
    const readingTime = Date.now() - readingStartTime;
    setReadingTimes(prev => [...prev, readingTime]);
    setIsReading(false);
    setCurrentQuestionIndex(0);
    setQuestionStartTime(Date.now());
  };

  const handleAnswer = (selectedOption) => {
    const currentPassage = passages?.[currentPassageIndex];
    const currentQuestion = currentPassage?.questions?.[currentQuestionIndex];
    const responseTime = Date.now() - questionStartTime;
    const isCorrect = selectedOption === currentQuestion?.correct;

    const response = {
      passageTitle: currentPassage?.title,
      questionIndex: currentQuestionIndex,
      question: currentQuestion?.question,
      selectedOption,
      correctOption: currentQuestion?.correct,
      isCorrect,
      responseTime
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    if (currentQuestionIndex < currentPassage?.questions?.length - 1) {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    } else if (currentPassageIndex < passages?.length - 1) {
      // Next passage
      setCurrentPassageIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
      setIsReading(true);
      setReadingStartTime(Date.now());
    } else {
      // Task completed
      const totalCorrect = newResponses?.filter(r => r?.isCorrect)?.length;
      const totalQuestions = passages?.reduce((sum, p) => sum + p?.questions?.length, 0);
      const accuracy = (totalCorrect / totalQuestions) * 100;
      const averageReadingTime = readingTimes?.reduce((sum, time) => sum + time, 0) / readingTimes?.length;
      const averageResponseTime = newResponses?.reduce((sum, r) => sum + r?.responseTime, 0) / newResponses?.length;

      const results = {
        responses: newResponses,
        readingTimes,
        totalCorrect,
        totalQuestions,
        accuracy,
        averageReadingTime,
        averageResponseTime,
        passagesRead: passages?.length
      };

      onComplete(results);
    }
  };

  if (showInstructions) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            Reading Comprehension Instructions
          </h3>
          <div className="text-left text-green-800 space-y-3">
            <p className="flex items-start space-x-2">
              <span className="font-semibold">📖</span>
              <span>You will read short passages (100-150 words each)</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">⏱️</span>
              <span>Read at your comfortable pace - comprehension matters most</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">❓</span>
              <span>Answer 4 questions about each passage</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">🎯</span>
              <span>Choose the best answer from multiple options</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">🔄</span>
              <span>You cannot return to reread the passage during questions</span>
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-800">
            <strong>Strategy:</strong> Focus on key details like names, numbers, and main ideas while reading
          </p>
        </div>
        <Button onClick={startTask} className="bg-green-600 hover:bg-green-700">
          Start Reading Task
        </Button>
      </motion.div>
    );
  }

  const currentPassage = passages?.[currentPassageIndex];
  const totalQuestions = passages?.reduce((sum, p) => sum + p?.questions?.length, 0);
  const completedQuestions = responses?.length;
  const progress = (completedQuestions / totalQuestions) * 100;

  if (isReading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Passage {currentPassageIndex + 1} of {passages?.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200">
          <div className="flex items-center space-x-4 mb-6">
            <BookOpen className="w-8 h-8 text-green-600" />
            <h3 className="text-2xl font-bold text-green-900">{currentPassage?.title}</h3>
          </div>

          <div className="text-lg leading-relaxed text-gray-800 mb-8 text-left">
            {currentPassage?.text}
          </div>

          <div className="text-center">
            <Button 
              onClick={finishReading}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg font-semibold rounded-xl"
            >
              I've Finished Reading - Show Questions
            </Button>
          </div>

          <div className="mt-4 text-sm text-green-600 text-center">
            <Clock className="w-4 h-4 inline mr-2" />
            Take your time to read carefully
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = currentPassage?.questions?.[currentQuestionIndex];
  const questionNumber = responses?.length + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
        <div className="flex items-start space-x-4 mb-6">
          <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              {currentPassage?.title} - Question {currentQuestionIndex + 1}
            </h4>
            <h3 className="text-xl font-bold text-blue-900">
              {currentQuestion?.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQuestion?.options?.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-gray-800 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full border-2 border-blue-400 flex items-center justify-center text-blue-600 font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 text-sm text-blue-600 text-center">
          Choose the best answer based on what you read
        </div>
      </div>
    </motion.div>
  );
};

export default ComprehensionTask;