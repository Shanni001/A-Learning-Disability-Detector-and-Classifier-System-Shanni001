import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';

import ReadingTask from './components/ReadingTask';
import SpellingTask from './components/SpellingTask';
import ComprehensionTask from './components/ComprehensionTask';
import MemoryTask from './components/MemoryTask';
import HandwritingTask from './components/HandwritingTask';
import AssessmentResults from './components/AssessmentResults';
import { Brain, Target, BookOpen, PenTool } from 'lucide-react';
import Icon from '../../components/AppIcon';


const DyslexiaAssessment = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    reading: null,
    spelling: null,
    comprehension: null,
    memory: null,
    handwriting: null
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const tasks = [
    {
      id: 'reading',
      title: 'Reading Task',
      description: 'Tests phonological processing and word recognition',
      icon: Brain,
      component: ReadingTask
    },
    {
      id: 'spelling',
      title: 'Spelling/Typing Task',
      description: 'Tests spelling and working memory',
      icon: PenTool,
      component: SpellingTask
    },
    {
      id: 'comprehension',
      title: 'Reading Comprehension Task',
      description: 'Tests reading fluency and comprehension',
      icon: Target,
      component: ComprehensionTask
    },
    {
      id: 'memory',
      title: 'Short-Term Memory Task',
      description: 'Tests auditory/visual memory',
      icon: BookOpen,
      component: MemoryTask
    },
    {
      id: 'handwriting',
      title: 'Handwriting Sample',
      description: 'Submit handwriting for analysis',
      icon: PenTool,
      component: HandwritingTask
    }
  ];

  useEffect(() => {
    document.title = 'Dyslexia Assessment - LearnAssess Pro';
    setStartTime(Date.now());
  }, []);

  const handleTaskComplete = (taskId, data) => {
    setAssessmentData(prev => ({
      ...prev,
      [taskId]: data
    }));

    if (currentTask < tasks?.length - 1) {
      setCurrentTask(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateProgress = () => {
    const completedTasks = Object.values(assessmentData)?.filter(data => data !== null)?.length;
    return (completedTasks / tasks?.length) * 100;
  };

  const resetAssessment = () => {
    setCurrentTask(0);
    setAssessmentData({
      reading: null,
      spelling: null,
      comprehension: null,
      memory: null,
      handwriting: null
    });
    setIsCompleted(false);
    setStartTime(Date.now());
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="pt-20 pb-12">
          <AssessmentResults 
            data={assessmentData} 
            startTime={startTime}
            onRestart={resetAssessment}
          />
        </div>
      </div>
    );
  }

  const CurrentTaskComponent = tasks?.[currentTask]?.component;
  const currentTaskData = tasks?.[currentTask];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dyslexia Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Complete all tasks to receive your comprehensive analysis
            </p>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(calculateProgress())}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Task Navigator */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {tasks?.map((task, index) => {
                const Icon = task?.icon;
                const isCompleted = assessmentData?.[task?.id] !== null;
                const isCurrent = index === currentTask;
                
                return (
                  <div
                    key={task?.id}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isCompleted
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : isCurrent
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' :'bg-gray-100 text-gray-600 border-2 border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{task?.title}</span>
                    {isCompleted && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Current Task */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTask}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* Task Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <currentTaskData.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentTaskData?.title}
                  </h2>
                  <p className="text-gray-600">
                    {currentTaskData?.description}
                  </p>
                </div>
              </div>

              {/* Task Component */}
              <CurrentTaskComponent
                onComplete={(data) => handleTaskComplete(currentTaskData?.id, data)}
                taskNumber={currentTask + 1}
                totalTasks={tasks?.length}
              />
            </motion.div>
          </AnimatePresence>

          {/* Instructions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg"
          >
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Assessment Guidelines
                </h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• Take your time with each task - accuracy is more important than speed</li>
                  <li>• Complete all tasks in order for the most accurate results</li>
                  <li>• Your responses are confidential and used only for assessment</li>
                  <li>• If you need a break, you can pause between tasks</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaAssessment;