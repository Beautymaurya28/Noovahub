import React, { useState } from 'react';
import { Calendar, Clock, Award, BookOpen, CheckSquare } from 'lucide-react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const PerformancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quizzes' | 'achievements'>('overview');
  
  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Performance Tracker</h1>
            <p className="text-gray-600">Monitor your progress and identify areas for improvement</p>
          </div>
          
          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`mr-8 py-4 px-1 ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-indigo-900 text-indigo-900'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } font-medium text-sm`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('quizzes')}
                  className={`mr-8 py-4 px-1 ${
                    activeTab === 'quizzes'
                      ? 'border-b-2 border-indigo-900 text-indigo-900'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } font-medium text-sm`}
                >
                  Quiz Performance
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`py-4 px-1 ${
                    activeTab === 'achievements'
                      ? 'border-b-2 border-indigo-900 text-indigo-900'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } font-medium text-sm`}
                >
                  Achievements
                </button>
              </nav>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-md bg-indigo-100">
                      <Calendar className="h-6 w-6 text-indigo-900" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Study Streak</p>
                      <p className="text-2xl font-semibold text-gray-900">12 days</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-md bg-blue-100">
                      <Clock className="h-6 w-6 text-blue-900" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Study Time</p>
                      <p className="text-2xl font-semibold text-gray-900">42.5 hrs</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-md bg-purple-100">
                      <BookOpen className="h-6 w-6 text-purple-900" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Notes Created</p>
                      <p className="text-2xl font-semibold text-gray-900">18</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
                      <CheckSquare className="h-6 w-6 text-green-900" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Quizzes Completed</p>
                      <p className="text-2xl font-semibold text-gray-900">24</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Daily Activity</h3>
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-end">
                      <div className="flex items-end justify-between w-full px-4">
                        {[65, 40, 85, 30, 90, 75, 50].map((height, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-10 bg-indigo-600 rounded-t-md"
                              style={{ height: `${height}%` }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-1">
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
                      <span className="text-xs text-gray-500">4h</span>
                      <span className="text-xs text-gray-500">3h</span>
                      <span className="text-xs text-gray-500">2h</span>
                      <span className="text-xs text-gray-500">1h</span>
                      <span className="text-xs text-gray-500">0h</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                      <option>All Subjects</option>
                      <option>Chemistry</option>
                      <option>Physics</option>
                      <option>Mathematics</option>
                    </select>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="h-64 flex items-center justify-center">
                    <div className="w-full max-w-md">
                      {['Chemistry', 'Physics', 'Mathematics', 'Biology', 'History'].map((subject, index) => (
                        <div key={index} className="mb-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{subject}</span>
                            <span className="text-sm font-medium text-gray-700">
                              {[92, 78, 85, 88, 72][index]}%
                            </span>
                          </div>
                          <div className="h-3 w-full bg-gray-200 rounded-full">
                            <div 
                              className="h-3 rounded-full bg-green-600"
                              style={{ width: `${[92, 78, 85, 88, 72][index]}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Topic Mastery */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Topic Mastery</h3>
                  <Button variant="outline" size="sm">
                    View All Topics
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Topic
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quiz Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Reviewed
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Organic Compounds</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Chemistry</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">92%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Mastered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Yesterday
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Mechanics</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Physics</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">78%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            In Progress
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          3 days ago
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Calculus</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Mathematics</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">85%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Mastered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1 week ago
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Cell Biology</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Biology</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">90%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Mastered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2 weeks ago
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'quizzes' && (
            <div>
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quiz History</h3>
                  <div className="flex items-center space-x-2">
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                      <option>All Subjects</option>
                      <option>Chemistry</option>
                      <option>Physics</option>
                      <option>Mathematics</option>
                    </select>
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quiz Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time Taken
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Questions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Chemistry - Organic Compounds</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Jun 12, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">92%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">15 min</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">10</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm">Review</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Physics - Mechanics</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Jun 10, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">78%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">20 min</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">15</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm">Review</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Mathematics - Calculus</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Jun 5, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">85%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">30 min</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">20</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm">Review</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Biology - Cell Structure</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">May 28, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">90%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">25 min</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">12</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm">Review</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Score by Subject</h3>
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-end">
                      <div className="flex items-end justify-between w-full px-4">
                        {[85, 78, 92, 88, 72].map((height, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-16 bg-indigo-600 rounded-t-md"
                              style={{ height: `${height}%` }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-1 text-center">
                              {['Math', 'Physics', 'Chemistry', 'Biology', 'History'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
                      <span className="text-xs text-gray-500">100%</span>
                      <span className="text-xs text-gray-500">75%</span>
                      <span className="text-xs text-gray-500">50%</span>
                      <span className="text-xs text-gray-500">25%</span>
                      <span className="text-xs text-gray-500">0%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Improvement Over Time</h3>
                  <div className="h-64 relative">
                    {/* Mock line chart */}
                    <svg className="w-full h-full" viewBox="0 0 300 200">
                      {/* Grid lines */}
                      <line x1="0" y1="0" x2="300" y2="0" stroke="#eee" strokeWidth="1" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="#eee" strokeWidth="1" />
                      <line x1="0" y1="100" x2="300" y2="100" stroke="#eee" strokeWidth="1" />
                      <line x1="0" y1="150" x2="300" y2="150" stroke="#eee" strokeWidth="1" />
                      <line x1="0" y1="200" x2="300" y2="200" stroke="#eee" strokeWidth="1" />
                      
                      {/* Data line */}
                      <path 
                        d="M0,120 L50,110 L100,90 L150,70 L200,60 L250,40 L300,30" 
                        fill="none" 
                        stroke="#5046e5" 
                        strokeWidth="3"
                      />
                      
                      {/* Data points */}
                      <circle cx="0" cy="120" r="4" fill="#5046e5" />
                      <circle cx="50" cy="110" r="4" fill="#5046e5" />
                      <circle cx="100" cy="90" r="4" fill="#5046e5" />
                      <circle cx="150" cy="70" r="4" fill="#5046e5" />
                      <circle cx="200" cy="60" r="4" fill="#5046e5" />
                      <circle cx="250" cy="40" r="4" fill="#5046e5" />
                      <circle cx="300" cy="30" r="4" fill="#5046e5" />
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                      <span className="text-xs text-gray-500">Jan</span>
                      <span className="text-xs text-gray-500">Feb</span>
                      <span className="text-xs text-gray-500">Mar</span>
                      <span className="text-xs text-gray-500">Apr</span>
                      <span className="text-xs text-gray-500">May</span>
                      <span className="text-xs text-gray-500">Jun</span>
                    </div>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between">
                      <span className="text-xs text-gray-500">100%</span>
                      <span className="text-xs text-gray-500">75%</span>
                      <span className="text-xs text-gray-500">50%</span>
                      <span className="text-xs text-gray-500">25%</span>
                      <span className="text-xs text-gray-500">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div>
              <div className="bg-indigo-900 text-white p-6 rounded-lg shadow mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Level 4: Study Pro</h3>
                    <p className="text-indigo-200">You're making excellent progress! Keep studying to advance to the next level.</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Award className="h-10 w-10 text-indigo-900" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-indigo-700 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-indigo-200">
                    <span>Level 4</span>
                    <span>75% to Level 5</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <Award className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">Perfect Score</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Achieve a 100% score on any quiz.
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">Completed on May 15, 2025</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Calendar className="h-10 w-10 text-indigo-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">Study Streak</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Study for 30 consecutive days.
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">12/30 days</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">Note Master</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Create 25 summarized notes.
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">18/25 notes</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">All Achievements</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'First Quiz', desc: 'Complete your first quiz', completed: true, icon: 'BookOpen' },
                    { name: 'Group Study', desc: 'Join a group study session', completed: true, icon: 'Users' },
                    { name: 'Note Taker', desc: 'Create 10 notes', completed: true, icon: 'FileText' },
                    { name: 'Perfect Score', desc: 'Get 100% on a quiz', completed: true, icon: 'Award' },
                    { name: 'Subject Master', desc: 'Complete all topics in a subject', completed: false, icon: 'Trophy' },
                    { name: 'Study Streak', desc: 'Study for 30 consecutive days', completed: false, icon: 'Calendar' },
                    { name: 'Quiz Champion', desc: 'Complete 50 quizzes', completed: false, icon: 'CheckSquare' },
                    { name: 'Speed Learner', desc: 'Complete a quiz in under 5 minutes', completed: true, icon: 'Clock' },
                    { name: 'Collaboration King', desc: 'Create a study group with 5+ members', completed: false, icon: 'Users' },
                  ].map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      achievement.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-start">
                        <div className={`p-2 rounded-md ${
                          achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
                        } mr-3`}>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{achievement.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PerformancePage;