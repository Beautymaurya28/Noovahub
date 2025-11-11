import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText,
  BarChart2,
  MessageSquare,
  Settings,
  Menu,
  X,
  Bell,
  User,
  BookOpen,
  Calendar,
  Target,
  Award,
  ChevronDown,
  LogOut,
  PlusCircle
} from 'lucide-react';
import { Link } from './Link';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/teacher/dashboard' },
    { icon: Users, label: 'Students', href: '/teacher/students' },
    { icon: FileText, label: 'Tests & Assignments', href: '/teacher/tests' },
    { icon: BarChart2, label: 'Analytics', href: '/teacher/analytics' },
    { icon: Calendar, label: 'Schedule', href: '/teacher/schedule' },
    { icon: MessageSquare, label: 'Messages', href: '/teacher/messages' },
    { icon: Award, label: 'Achievements', href: '/teacher/achievements' },
    { icon: Settings, label: 'Settings', href: '/teacher/settings' },
  ];

  const notifications = [
    { title: 'New Assignment Submitted', message: 'John Doe submitted Physics Lab Report', time: '5m ago' },
    { title: 'Parent Message', message: 'Sarah\'s mother asked about progress', time: '30m ago' },
    { title: 'Test Reminder', message: 'Mathematics test scheduled for tomorrow', time: '2h ago' },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Teacher logout clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1e1b4b] transform transition-transform duration-200 ease-in-out lg:translate-x-0 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex flex-col items-center justify-center px-6 border-b border-indigo-800 flex-shrink-0">
          <Link href="/teacher/dashboard" className="flex items-center">
            <BookOpen className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">Learnex</span>
          </Link>
          <span className="text-xs text-indigo-300 mt-1">Teacher Portal</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-indigo-800 text-white'
                        : 'text-gray-300 hover:bg-indigo-800'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                    {item.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Action */}
        <div className="p-4 border-t border-indigo-800">
          <button className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Test
          </button>
        </div>
      </aside>

      {/* Top Bar */}
      <div className="lg:ml-64 bg-white shadow-sm">
        <div className="h-16 px-4 flex items-center justify-end">
          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-full relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  {notifications.map((notification, index) => (
                    <div key={index} className="px-4 py-3 hover:bg-gray-50">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative ml-4">
            <button
              className="flex items-center hover:bg-gray-100 rounded-full p-2"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                PJ
              </div>
              <span className="ml-2 text-gray-700">Prof. Johnson</span>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  <Link
                    href="/teacher/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Link>
                  <hr className="my-2" />
                  <button
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:ml-64 min-h-screen transition-all duration-200 pt-16`}>
        <main>
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default TeacherLayout;