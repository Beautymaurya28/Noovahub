import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Clock, 
  Award,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  subject: string;
  averageScore: number;
  testsCompleted: number;
  lastActivity: string;
  weakestTopics: string[];
  strongestTopics: string[];
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'needs-attention' | 'at-risk';
  studyTime: number; // in hours
  attendance: number; // percentage
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@school.edu',
    class: '10th Grade A',
    subject: 'Mathematics',
    averageScore: 92,
    testsCompleted: 8,
    lastActivity: '2024-03-15',
    weakestTopics: ['Trigonometry'],
    strongestTopics: ['Algebra', 'Geometry'],
    trend: 'up',
    status: 'excellent',
    studyTime: 24,
    attendance: 98
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@school.edu',
    class: '10th Grade A',
    subject: 'Mathematics',
    averageScore: 78,
    testsCompleted: 7,
    lastActivity: '2024-03-14',
    weakestTopics: ['Calculus', 'Statistics'],
    strongestTopics: ['Algebra'],
    trend: 'stable',
    status: 'good',
    studyTime: 18,
    attendance: 94
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@school.edu',
    class: '10th Grade B',
    subject: 'Mathematics',
    averageScore: 65,
    testsCompleted: 6,
    lastActivity: '2024-03-13',
    weakestTopics: ['Calculus', 'Trigonometry', 'Statistics'],
    strongestTopics: ['Basic Math'],
    trend: 'down',
    status: 'needs-attention',
    studyTime: 12,
    attendance: 87
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@school.edu',
    class: '10th Grade B',
    subject: 'Mathematics',
    averageScore: 45,
    testsCompleted: 4,
    lastActivity: '2024-03-10',
    weakestTopics: ['Algebra', 'Geometry', 'Calculus'],
    strongestTopics: [],
    trend: 'down',
    status: 'at-risk',
    studyTime: 8,
    attendance: 76
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma.brown@school.edu',
    class: '12th Grade A',
    subject: 'Physics',
    averageScore: 88,
    testsCompleted: 9,
    lastActivity: '2024-03-15',
    weakestTopics: ['Quantum Physics'],
    strongestTopics: ['Mechanics', 'Thermodynamics'],
    trend: 'up',
    status: 'excellent',
    studyTime: 22,
    attendance: 96
  }
];

const StudentTrackerPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'activity'>('score');

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = classFilter === 'all' || student.class === classFilter;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      
      return matchesSearch && matchesClass && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'score':
          return b.averageScore - a.averageScore;
        case 'activity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'at-risk': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <Award className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'needs-attention': return <AlertTriangle className="h-4 w-4" />;
      case 'at-risk': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const classes = [...new Set(students.map(student => student.class))];
  const averageScore = Math.round(students.reduce((sum, student) => sum + student.averageScore, 0) / students.length);
  const atRiskStudents = students.filter(s => s.status === 'at-risk').length;
  const excellentStudents = students.filter(s => s.status === 'excellent').length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B1D39]">Student Tracker</h1>
        <p className="text-[#0B1D39] opacity-70">Monitor student performance and identify learning gaps</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Class Average</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{averageScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">At Risk</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{atRiskStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Excellent</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{excellentStudents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
            >
              <option value="all">All Classes</option>
              {classes.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
            >
              <option value="all">All Status</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="needs-attention">Needs Attention</option>
              <option value="at-risk">At Risk</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
              <option value="activity">Sort by Activity</option>
            </select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {/* Student Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0B1D39] mb-1">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.email}</p>
                <p className="text-sm text-gray-500">{student.class}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(student.trend)}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                  {getStatusIcon(student.status)}
                  <span className="ml-1 capitalize">{student.status.replace('-', ' ')}</span>
                </span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#0B1D39]">{student.averageScore}%</p>
                <p className="text-xs text-gray-500">Average Score</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#0B1D39]">{student.testsCompleted}</p>
                <p className="text-xs text-gray-500">Tests Completed</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#0B1D39]">{student.studyTime}h</p>
                <p className="text-xs text-gray-500">Study Time</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#0B1D39]">{student.attendance}%</p>
                <p className="text-xs text-gray-500">Attendance</p>
              </div>
            </div>

            {/* Topics Analysis */}
            <div className="space-y-3 mb-4">
              {student.strongestTopics.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Strong Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {student.strongestTopics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {student.weakestTopics.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-700 mb-1">Needs Improvement:</p>
                  <div className="flex flex-wrap gap-1">
                    {student.weakestTopics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                Last active: {student.lastActivity}
              </div>
            </div>

            {/* Recommendations */}
            {student.status === 'at-risk' && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800 mb-1">Recommended Actions:</p>
                <ul className="text-xs text-red-700 space-y-1">
                  <li>• Schedule one-on-one session</li>
                  <li>• Assign additional practice materials</li>
                  <li>• Contact parents/guardians</li>
                </ul>
              </div>
            )}

            {student.status === 'needs-attention' && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-yellow-800 mb-1">Suggested Support:</p>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Focus on weak topics: {student.weakestTopics.join(', ')}</li>
                  <li>• Provide targeted practice exercises</li>
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500">
            {searchQuery || classFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No students are currently enrolled'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentTrackerPage;