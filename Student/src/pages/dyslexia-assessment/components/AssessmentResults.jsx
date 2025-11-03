import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { BarChart3, Brain, Clock, Target, Download, Share2, RefreshCw, FileText, Eye, PenTool } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Add Memory icon component since it's not available in lucide-react
const Memory = ({ className, ...props }) => (
  <svg 
    className={className} 
    {...props} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const AssessmentResults = ({ data, startTime, onRestart }) => {
  const [dyslexiaRisk, setDyslexiaRisk] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    // Simulate analysis loading
    const timer = setTimeout(() => {
      const risk = calculateDyslexiaRisk();
      setDyslexiaRisk(risk);
      setRiskLevel(getRiskLevel(risk));
      setAnalysisComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [data]);

  const calculateDyslexiaRisk = () => {
    let riskScore = 0;
    let totalPossible = 0;

    // Reading Task Analysis (25% weight)
    if (data?.reading) {
      const readingAccuracy = data?.reading?.accuracy;
      const avgResponseTime = data?.reading?.averageResponseTime;
      
      // Lower accuracy increases risk
      if (readingAccuracy < 70) riskScore += 25;
      else if (readingAccuracy < 85) riskScore += 15;
      else if (readingAccuracy < 95) riskScore += 5;
      
      // Slower response time increases risk
      if (avgResponseTime > 3000) riskScore += 10;
      else if (avgResponseTime > 2000) riskScore += 5;
      
      totalPossible += 35;
    }

    // Spelling Task Analysis (25% weight)
    if (data?.spelling) {
      const spellingAccuracy = data?.spelling?.averageAccuracy;
      const exactMatches = data?.spelling?.exactMatches / data?.spelling?.totalWords * 100;
      
      if (spellingAccuracy < 60) riskScore += 20;
      else if (spellingAccuracy < 80) riskScore += 12;
      else if (spellingAccuracy < 90) riskScore += 6;
      
      if (exactMatches < 40) riskScore += 15;
      else if (exactMatches < 70) riskScore += 8;
      
      totalPossible += 35;
    }

    // Comprehension Task Analysis (25% weight)
    if (data?.comprehension) {
      const comprehensionAccuracy = data?.comprehension?.accuracy;
      const avgReadingTime = data?.comprehension?.averageReadingTime;
      
      if (comprehensionAccuracy < 60) riskScore += 20;
      else if (comprehensionAccuracy < 80) riskScore += 10;
      
      // Very slow or very fast reading can indicate issues
      if (avgReadingTime < 15000 || avgReadingTime > 60000) riskScore += 10;
      
      totalPossible += 30;
    }

    // Memory Task Analysis (25% weight)
    if (data?.memory) {
      const memoryAccuracy = data?.memory?.accuracy;
      
      if (memoryAccuracy < 60) riskScore += 25;
      else if (memoryAccuracy < 80) riskScore += 15;
      else if (memoryAccuracy < 90) riskScore += 8;
      
      totalPossible += 25;
    }

    // Calculate percentage risk (inverse of performance)
    const riskPercentage = totalPossible > 0 ? (riskScore / totalPossible) * 100 : 0;
    return Math.min(Math.max(riskPercentage, 0), 100);
  };

  const getRiskLevel = (risk) => {
    if (risk < 20) return 'Low';
    if (risk < 40) return 'Low-Moderate';
    if (risk < 60) return 'Moderate';
    if (risk < 80) return 'Moderate-High';
    return 'High';
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Low-Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Moderate-High': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getChartData = () => [
    {
      name: 'Reading',
      score: data?.reading?.accuracy || 0,
      icon: Eye
    },
    {
      name: 'Spelling',
      score: data?.spelling?.averageAccuracy || 0,
      icon: PenTool
    },
    {
      name: 'Comprehension',
      score: data?.comprehension?.accuracy || 0,
      icon: FileText
    },
    {
      name: 'Memory',
      score: data?.memory?.accuracy || 0,
      icon: Memory
    }
  ];

  const getRiskData = () => [
    { name: 'Risk', value: dyslexiaRisk, fill: '#ef4444' },
    { name: 'Typical', value: 100 - dyslexiaRisk, fill: '#e5e7eb' }
  ];

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60)?.toString()?.padStart(2, '0')}`;
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (riskLevel === 'High' || riskLevel === 'Moderate-High') {
      recommendations?.push({
        type: 'Professional Evaluation',
        description: 'Consider consulting with a learning specialist or educational psychologist for comprehensive evaluation.',
        priority: 'high'
      });
    }
    
    if (data?.reading && data?.reading?.accuracy < 80) {
      recommendations?.push({
        type: 'Reading Support',
        description: 'Focus on phonics training and sight word recognition exercises.',
        priority: 'medium'
      });
    }
    
    if (data?.spelling && data?.spelling?.averageAccuracy < 75) {
      recommendations?.push({
        type: 'Spelling Intervention',
        description: 'Practice with structured spelling programs and word pattern recognition.',
        priority: 'medium'
      });
    }
    
    if (data?.memory && data?.memory?.accuracy < 70) {
      recommendations?.push({
        type: 'Memory Training',
        description: 'Engage in working memory exercises and chunking strategies.',
        priority: 'low'
      });
    }

    recommendations?.push({
      type: 'Supportive Environment',
      description: 'Create a structured learning environment with clear routines and visual aids.',
      priority: 'low'
    });

    return recommendations;
  };

  if (!analysisComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <Brain className="w-16 h-16 text-blue-600" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Analyzing Your Results
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Our AI is processing your assessment data to provide comprehensive insights...
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-blue-800 font-medium">Processing assessment data...</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalTime = Date.now() - startTime;
  const chartData = getChartData();
  const riskData = getRiskData();
  const recommendations = getRecommendations();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assessment Results
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive analysis of your dyslexia assessment
          </p>
        </div>

        {/* Risk Assessment Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Dyslexia Risk Assessment
            </h2>
            
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {Math.round(dyslexiaRisk)}%
                </div>
                <div className={`px-6 py-3 rounded-full border-2 font-semibold text-lg ${getRiskColor(riskLevel)}`}>
                  {riskLevel} Risk
                </div>
              </div>
              
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                    >
                      {riskData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-blue-800 text-lg">
                <strong>Important:</strong> This assessment provides initial screening insights only. 
                A comprehensive evaluation by a qualified professional is recommended for definitive diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance by Task</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value?.toFixed(1)}%`, 'Accuracy']} />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Assessment Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Total Time</p>
                  <p className="text-gray-600">{formatTime(totalTime)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Target className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">Tasks Completed</p>
                  <p className="text-gray-600">5 of 5 tasks</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-900">Overall Performance</p>
                  <p className="text-gray-600">
                    {chartData?.reduce((sum, item) => sum + item?.score, 0) / chartData?.length}% Average
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Reading Task */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h4 className="font-bold text-gray-900">Reading Task</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Accuracy:</span> {data?.reading?.accuracy?.toFixed(1)}%</p>
              <p><span className="font-medium">Correct:</span> {data?.reading?.correctAnswers}/{data?.reading?.totalWords}</p>
              <p><span className="font-medium">Avg Time:</span> {data?.reading?.averageResponseTime ? formatTime(data?.reading?.averageResponseTime) : 'N/A'}</p>
            </div>
          </div>

          {/* Spelling Task */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <PenTool className="w-6 h-6 text-purple-600" />
              <h4 className="font-bold text-gray-900">Spelling Task</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Accuracy:</span> {data?.spelling?.averageAccuracy?.toFixed(1)}%</p>
              <p><span className="font-medium">Exact Matches:</span> {data?.spelling?.exactMatches}/{data?.spelling?.totalWords}</p>
              <p><span className="font-medium">Avg Time:</span> {data?.spelling?.averageResponseTime ? formatTime(data?.spelling?.averageResponseTime) : 'N/A'}</p>
            </div>
          </div>

          {/* Comprehension Task */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-green-600" />
              <h4 className="font-bold text-gray-900">Comprehension</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Accuracy:</span> {data?.comprehension?.accuracy?.toFixed(1)}%</p>
              <p><span className="font-medium">Correct:</span> {data?.comprehension?.totalCorrect}/{data?.comprehension?.totalQuestions}</p>
              <p><span className="font-medium">Reading Time:</span> {data?.comprehension?.averageReadingTime ? formatTime(data?.comprehension?.averageReadingTime) : 'N/A'}</p>
            </div>
          </div>

          {/* Memory Task */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Memory className="w-6 h-6 text-orange-600" />
              <h4 className="font-bold text-gray-900">Memory Task</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Accuracy:</span> {data?.memory?.accuracy?.toFixed(1)}%</p>
              <p><span className="font-medium">Correct:</span> {data?.memory?.correctCount}/{data?.memory?.totalSequences}</p>
              <p><span className="font-medium">Avg Time:</span> {data?.memory?.averageResponseTime ? formatTime(data?.memory?.averageResponseTime) : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations?.map((rec, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg border-l-4 ${
                  rec?.priority === 'high' ? 'border-red-500 bg-red-50' :
                  rec?.priority === 'medium'? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'
                }`}
              >
                <h4 className="font-bold text-gray-900 mb-2">{rec?.type}</h4>
                <p className="text-gray-700">{rec?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h3>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Report</span>
            </Button>
            
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Share Results</span>
            </Button>
            
            <Button 
              onClick={onRestart}
              className="bg-gray-600 hover:bg-gray-700 text-white flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Take Assessment Again</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentResults;