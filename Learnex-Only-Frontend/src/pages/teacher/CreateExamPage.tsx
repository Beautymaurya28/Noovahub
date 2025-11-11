import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Users, 
  Target, 
  Plus, 
  Trash2, 
  Eye, 
  Save,
  Code,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Toast, { ToastType } from '../../components/Toast';

interface Question {
  id: string;
  type: 'mcq' | 'subjective';
  question: string;
  options?: string[];
  correctAnswer?: number;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

interface ExamConfig {
  title: string;
  subject: string;
  type: 'mcq' | 'subjective' | 'mixed';
  duration: number;
  totalMarks: number;
  instructions: string;
  tags: string[];
  accessMode: 'code' | 'open';
  examCode?: string;
}

const CreateExamPage: React.FC = () => {
  const [examConfig, setExamConfig] = useState<ExamConfig>({
    title: '',
    subject: '',
    type: 'mcq',
    duration: 60,
    totalMarks: 100,
    instructions: '',
    tags: [],
    accessMode: 'code'
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '',
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 4,
    difficulty: 'Medium',
    topic: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [activeTab, setActiveTab] = useState<'config' | 'questions' | 'preview'>('config');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'];

  const handleConfigChange = (field: keyof ExamConfig, value: any) => {
    setExamConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (field: keyof Question, value: any) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      setShowToast(true);
      setToastMessage('Please enter a question');
      setToastType('error');
      return;
    }

    const newQuestion: Question = {
      ...currentQuestion,
      id: Date.now().toString()
    };

    setQuestions(prev => [...prev, newQuestion]);
    setCurrentQuestion({
      id: '',
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 4,
      difficulty: 'Medium',
      topic: ''
    });

    setShowToast(true);
    setToastMessage('Question added successfully');
    setToastType('success');
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const generateExamCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setExamConfig(prev => ({ ...prev, examCode: code }));
  };

  const saveExam = () => {
    if (!examConfig.title || questions.length === 0) {
      setShowToast(true);
      setToastMessage('Please complete exam configuration and add questions');
      setToastType('error');
      return;
    }

    // Mock save logic
    setShowToast(true);
    setToastMessage('Exam created successfully!');
    setToastType('success');
  };

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B1D39]">Create Exam</h1>
        <p className="text-[#0B1D39] opacity-70">Design and configure your examination</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'config', label: 'Configuration', icon: Settings },
            { id: 'questions', label: 'Questions', icon: FileText },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#0B1D39] border-b-2 border-[#0B1D39]'
                    : 'text-gray-500 hover:text-[#0B1D39]'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="title"
                  label="Exam Title"
                  value={examConfig.title}
                  onChange={(e) => handleConfigChange('title', e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                    Subject
                  </label>
                  <select
                    value={examConfig.subject}
                    onChange={(e) => handleConfigChange('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                    Exam Type
                  </label>
                  <select
                    value={examConfig.type}
                    onChange={(e) => handleConfigChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                  >
                    <option value="mcq">Multiple Choice</option>
                    <option value="subjective">Subjective</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <Input
                  id="duration"
                  label="Duration (minutes)"
                  type="number"
                  value={examConfig.duration.toString()}
                  onChange={(e) => handleConfigChange('duration', parseInt(e.target.value))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                  Instructions
                </label>
                <textarea
                  rows={4}
                  value={examConfig.instructions}
                  onChange={(e) => handleConfigChange('instructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                  placeholder="Enter exam instructions..."
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-[#0B1D39] mb-4">Access Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="accessMode"
                        value="code"
                        checked={examConfig.accessMode === 'code'}
                        onChange={(e) => handleConfigChange('accessMode', e.target.value)}
                        className="mr-2"
                      />
                      Code-based Access
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="accessMode"
                        value="open"
                        checked={examConfig.accessMode === 'open'}
                        onChange={(e) => handleConfigChange('accessMode', e.target.value)}
                        className="mr-2"
                      />
                      Open Access
                    </label>
                  </div>

                  {examConfig.accessMode === 'code' && (
                    <div className="flex items-center space-x-4">
                      <Input
                        id="examCode"
                        label="Exam Code"
                        value={examConfig.examCode || ''}
                        onChange={(e) => handleConfigChange('examCode', e.target.value)}
                        placeholder="Enter or generate code"
                      />
                      <Button
                        variant="outline"
                        onClick={generateExamCode}
                        className="mt-6"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-8">
              {/* Add Question Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-[#0B1D39] mb-4">Add Question</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                        Question Type
                      </label>
                      <select
                        value={currentQuestion.type}
                        onChange={(e) => handleQuestionChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                      >
                        <option value="mcq">Multiple Choice</option>
                        <option value="subjective">Subjective</option>
                      </select>
                    </div>

                    <Input
                      id="marks"
                      label="Marks"
                      type="number"
                      value={currentQuestion.marks.toString()}
                      onChange={(e) => handleQuestionChange('marks', parseInt(e.target.value))}
                    />

                    <div>
                      <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={currentQuestion.difficulty}
                        onChange={(e) => handleQuestionChange('difficulty', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      id="topic"
                      label="Topic"
                      value={currentQuestion.topic}
                      onChange={(e) => handleQuestionChange('topic', e.target.value)}
                      placeholder="e.g., Algebra, Thermodynamics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                      Question
                    </label>
                    <textarea
                      rows={3}
                      value={currentQuestion.question}
                      onChange={(e) => handleQuestionChange('question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                      placeholder="Enter your question..."
                    />
                  </div>

                  {currentQuestion.type === 'mcq' && (
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                        Options
                      </label>
                      <div className="space-y-2">
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() => handleQuestionChange('correctAnswer', index)}
                              className="text-[#0B1D39]"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(currentQuestion.options || [])];
                                newOptions[index] = e.target.value;
                                handleQuestionChange('options', newOptions);
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                              placeholder={`Option ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button onClick={addQuestion} className="bg-[#0B1D39] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </div>

              {/* Questions List */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-[#0B1D39]">
                    Questions ({questions.length})
                  </h3>
                  <div className="text-sm text-[#0B1D39] opacity-70">
                    Total Marks: {totalMarks}
                  </div>
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-[#0B1D39] text-white px-2 py-1 rounded text-sm">
                              Q{index + 1}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {question.type.toUpperCase()}
                            </span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                              {question.marks} marks
                            </span>
                            <span className={`px-2 py-1 rounded text-sm ${
                              question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                              question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {question.difficulty}
                            </span>
                          </div>
                          <p className="text-[#0B1D39] font-medium mb-2">{question.question}</p>
                          {question.type === 'mcq' && question.options && (
                            <div className="space-y-1">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className={`text-sm ${
                                  question.correctAnswer === optIndex ? 'text-green-600 font-medium' : 'text-gray-600'
                                }`}>
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                  {question.correctAnswer === optIndex && ' ✓'}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#0B1D39] mb-4">{examConfig.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Subject</span>
                    <p className="font-medium text-[#0B1D39]">{examConfig.subject}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Duration</span>
                    <p className="font-medium text-[#0B1D39]">{examConfig.duration} minutes</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Questions</span>
                    <p className="font-medium text-[#0B1D39]">{questions.length}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Total Marks</span>
                    <p className="font-medium text-[#0B1D39]">{totalMarks}</p>
                  </div>
                </div>
                {examConfig.examCode && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <span className="text-sm text-gray-500">Exam Code</span>
                    <p className="font-mono font-bold text-[#0B1D39] text-lg">{examConfig.examCode}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-[#0B1D39] text-white px-3 py-1 rounded">
                        Question {index + 1}
                      </span>
                      <span className="text-sm text-gray-500">({question.marks} marks)</span>
                    </div>
                    <p className="text-[#0B1D39] font-medium mb-3">{question.question}</p>
                    {question.type === 'mcq' && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Save as Draft
        </Button>
        <Button onClick={saveExam} className="bg-[#0B1D39] text-white">
          <Save className="h-4 w-4 mr-2" />
          Publish Exam
        </Button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default CreateExamPage;