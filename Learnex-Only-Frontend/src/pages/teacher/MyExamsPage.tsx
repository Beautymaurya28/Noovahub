import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Clock, 
  BarChart3, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import { Link } from '../../components/Link';

interface Exam {
  id: string;
  title: string;
  subject: string;
  type: 'mcq' | 'subjective' | 'mixed';
  status: 'draft' | 'published' | 'active' | 'completed';
  examCode: string;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  studentsEnrolled: number;
  studentsCompleted: number;
  createdDate: string;
  scheduledDate?: string;
  averageScore?: number;
}

const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mathematics Mid-term Examination',
    subject: 'Mathematics',
    type: 'mixed',
    status: 'active',
    examCode: 'MATH2024',
    duration: 120,
    totalQuestions: 50,
    totalMarks: 100,
    studentsEnrolled: 32,
    studentsCompleted: 28,
    createdDate: '2024-03-10',
    scheduledDate: '2024-03-15',
    averageScore: 78
  },
  {
    id: '2',
    title: 'Physics Unit Test - Mechanics',
    subject: 'Physics',
    type: 'mcq',
    status: 'completed',
    examCode: 'PHY2024',
    duration: 90,
    totalQuestions: 30,
    totalMarks: 75,
    studentsEnrolled: 28,
    studentsCompleted: 28,
    createdDate: '2024-03-05',
    scheduledDate: '2024-03-08',
    averageScore: 82
  },
  {
    id: '3',
    title: 'Chemistry Practical Assessment',
    subject: 'Chemistry',
    type: 'subjective',
    status: 'published',
    examCode: 'CHEM2024',
    duration: 180,
    totalQuestions: 15,
    totalMarks: 150,
    studentsEnrolled: 25,
    studentsCompleted: 0,
    createdDate: '2024-03-12',
    scheduledDate: '2024-03-20'
  },
  {
    id: '4',
    title: 'Biology Chapter 5 Quiz',
    subject: 'Biology',
    type: 'mcq',
    status: 'draft',
    examCode: 'BIO2024',
    duration: 45,
    totalQuestions: 20,
    totalMarks: 40,
    studentsEnrolled: 0,
    studentsCompleted: 0,
    createdDate: '2024-03-14'
  }
];

const MyExamsPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.examCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesSubject = subjectFilter === 'all' || exam.subject === subjectFilter;
    
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'published': return <Clock className="h-4 w-4" />;
      case 'active': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const subjects = [...new Set(exams.map(exam => exam.subject))];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1D39]">My Exams</h1>
          <p className="text-[#0B1D39] opacity-70">Manage your examinations and view results</p>
        </div>
        <Link href="/teacher/create-exam">
          <Button className="bg-[#0B1D39] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create New Exam
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Exams</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{exams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Exams</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">
                {exams.filter(e => e.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">
                {exams.reduce((sum, exam) => sum + exam.studentsEnrolled, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Avg Score</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">
                {Math.round(exams.filter(e => e.averageScore).reduce((sum, exam) => sum + (exam.averageScore || 0), 0) / exams.filter(e => e.averageScore).length) || 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-[#0B1D39]">{exam.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                    {getStatusIcon(exam.status)}
                    <span className="ml-1 capitalize">{exam.status}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Subject:</span>
                    <p className="text-[#0B1D39]">{exam.subject}</p>
                  </div>
                  <div>
                    <span className="font-medium">Code:</span>
                    <p className="text-[#0B1D39] font-mono">{exam.examCode}</p>
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>
                    <p className="text-[#0B1D39]">{exam.duration} min</p>
                  </div>
                  <div>
                    <span className="font-medium">Questions:</span>
                    <p className="text-[#0B1D39]">{exam.totalQuestions}</p>
                  </div>
                  <div>
                    <span className="font-medium">Students:</span>
                    <p className="text-[#0B1D39]">{exam.studentsCompleted}/{exam.studentsEnrolled}</p>
                  </div>
                  {exam.averageScore && (
                    <div>
                      <span className="font-medium">Avg Score:</span>
                      <p className="text-[#0B1D39]">{exam.averageScore}%</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                
                {exam.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Results
                  </Button>
                )}
                
                {exam.status !== 'completed' && (
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                
                {exam.status === 'draft' && (
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {exam.status === 'active' && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-800 font-medium">Exam is currently live</span>
                  </div>
                  <div className="text-green-700 text-sm">
                    {exam.studentsCompleted} of {exam.studentsEnrolled} students completed
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || statusFilter !== 'all' || subjectFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first exam to get started'
            }
          </p>
          <Link href="/teacher/create-exam">
            <Button className="bg-[#0B1D39] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Exam
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyExamsPage;