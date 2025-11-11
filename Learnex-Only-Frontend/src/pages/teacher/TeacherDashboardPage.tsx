import React from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Target,
  Star,
  TrendingUp,
  Calendar,
  FileText,
  MessageSquare,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';

const TeacherDashboardPage: React.FC = () => {
  const upcomingClasses = [
    { subject: 'Mathematics', class: '10th Grade A', time: '9:00 AM', students: 32, status: 'upcoming' },
    { subject: 'Physics', class: '12th Grade B', time: '11:00 AM', students: 28, status: 'live' },
    { subject: 'Chemistry', class: '11th Grade C', time: '2:00 PM', students: 30, status: 'upcoming' },
  ];

  const recentActivities = [
    { type: 'Test Created', subject: 'Mathematics', details: 'Algebra Quiz for 10th Grade', time: '2 hours ago', icon: FileText },
    { type: 'Assignment Graded', subject: 'Physics', details: '25 submissions reviewed', time: '4 hours ago', icon: CheckCircle },
    { type: 'Parent Message', subject: 'General', details: 'Query about student progress', time: '6 hours ago', icon: MessageSquare },
  ];

  const classPerformance = [
    { class: '10th Grade A', subject: 'Mathematics', avgScore: 85, students: 32, trend: 'up' },
    { class: '12th Grade B', subject: 'Physics', avgScore: 78, students: 28, trend: 'up' },
    { class: '11th Grade C', subject: 'Chemistry', avgScore: 82, students: 30, trend: 'down' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Prof. Johnson! 👨‍🏫
        </h1>
        <p className="text-gray-600">Here's what's happening in your classes today</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12 this month</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Classes</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>3 classes today</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Avg Performance</p>
              <p className="text-2xl font-semibold text-gray-900">82%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5% from last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tests Created</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="h-4 w-4 mr-1" />
              <span>This semester</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
            <Button variant="outline" size="sm">View Schedule</Button>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((classItem, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${
                    classItem.status === 'live' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {classItem.status === 'live' ? (
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    ) : (
                      <Clock className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{classItem.subject}</p>
                    <p className="text-sm text-gray-500">{classItem.class} • {classItem.students} students</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{classItem.time}</p>
                  <p className="text-xs text-gray-500">
                    {classItem.status === 'live' ? 'Live Now' : 'Upcoming'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Class Performance Overview */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Class Performance Overview</h2>
          <Button variant="outline" size="sm">Detailed Analytics</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classPerformance.map((classData, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{classData.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{classData.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{classData.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{classData.avgScore}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      classData.trend === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {classData.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                      )}
                      {classData.trend === 'up' ? 'Improving' : 'Declining'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button variant="outline" size="sm">View Details</Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-indigo-900 hover:bg-gray-100">
            <FileText className="h-4 w-4 mr-2" />
            Create New Test
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-900">
            <Users className="h-4 w-4 mr-2" />
            Manage Students
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-900">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;