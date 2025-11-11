import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Brain, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  Target,
  Clock,
  Award,
  MessageSquare,
  Shield,
  Zap,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import Layout from '../../components/Layout';
import { Link } from '../../components/Link';

const features = [
  {
    icon: Users,
    title: "Student Management System",
    description: "Effortlessly manage your students, track their progress, and organize classes with our comprehensive student management tools.",
    details: [
      "Bulk student import and management",
      "Class organization and grouping",
      "Individual student progress tracking",
      "Parent communication portal"
    ]
  },
  {
    icon: Brain,
    title: "Smart Exam Builder",
    description: "Create intelligent exams with AI assistance. Generate questions, set difficulty levels, and customize assessments for your curriculum.",
    details: [
      "AI-powered question generation",
      "Custom difficulty settings",
      "Multiple question formats",
      "Automated grading system"
    ]
  },
  {
    icon: BarChart3,
    title: "Performance Analyzer",
    description: "Get deep insights into student performance with advanced analytics, identify learning gaps, and track improvement over time.",
    details: [
      "Real-time performance metrics",
      "Learning gap identification",
      "Progress trend analysis",
      "Comparative class analytics"
    ]
  },
  {
    icon: FileText,
    title: "Custom Report Generation",
    description: "Generate detailed reports for students, parents, and administration with customizable templates and automated insights.",
    details: [
      "Automated report generation",
      "Customizable templates",
      "Parent-friendly summaries",
      "Administrative dashboards"
    ]
  },
  {
    icon: MessageSquare,
    title: "Parent Portal Access",
    description: "Keep parents engaged with dedicated portal access, progress updates, and direct communication channels.",
    details: [
      "Real-time progress updates",
      "Direct messaging system",
      "Assignment notifications",
      "Meeting scheduling tools"
    ]
  },
  {
    icon: Shield,
    title: "Assignment Automation",
    description: "Automate assignment distribution, collection, and grading with intelligent workflows and deadline management.",
    details: [
      "Automated assignment distribution",
      "Smart deadline tracking",
      "Plagiarism detection",
      "Bulk grading tools"
    ]
  },
  {
    icon: Target,
    title: "Virtual Classroom Tools",
    description: "Conduct engaging virtual classes with interactive whiteboards, screen sharing, and real-time collaboration features.",
    details: [
      "Interactive whiteboard",
      "Screen sharing capabilities",
      "Real-time collaboration",
      "Recording and playback"
    ]
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Support",
    description: "Get round-the-clock support from our dedicated team to ensure smooth teaching operations and quick issue resolution.",
    details: [
      "24/7 technical support",
      "Training and onboarding",
      "Regular feature updates",
      "Priority issue resolution"
    ]
  },
  {
    icon: Award,
    title: "Gamification Engine",
    description: "Motivate students with badges, leaderboards, and achievement systems that make learning fun and engaging.",
    details: [
      "Custom badge creation",
      "Class leaderboards",
      "Achievement tracking",
      "Reward systems"
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const TeacherFeaturesPage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#06142E] to-[#1B3B6F]">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 p-2 bg-indigo-800 rounded-full"
            >
              <div className="px-4 py-1 bg-indigo-700 rounded-full">
                <span className="text-indigo-200">🎓 Built for educators, powered by AI</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Empower Your Teaching with AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-indigo-200 max-w-3xl mx-auto"
            >
              Transform your classroom with intelligent tools designed to enhance teaching effectiveness and student engagement.
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isSelected = selectedFeature === index;
              
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className={`bg-white rounded-2xl p-8 shadow-lg cursor-pointer transform transition-all duration-300 ${
                    isSelected ? 'scale-105 ring-2 ring-indigo-500' : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedFeature(isSelected ? null : index)}
                >
                  <div className="h-14 w-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-indigo-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-4 mt-4"
                      >
                        <ul className="space-y-2">
                          {feature.details.map((detail, detailIndex) => (
                            <motion.li
                              key={detailIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.1 }}
                              className="flex items-center text-gray-700"
                            >
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">
                  Ready to Transform Your Teaching Experience?
                </h2>
                <p className="text-xl text-indigo-200 mb-8 max-w-2xl">
                  Join thousands of educators already using Learnex to create engaging, effective learning experiences.
                </p>
                <Link href="/teacher/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center"
                  >
                    Start Teaching with AI
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </Link>
              </motion.div>
              
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-transparent" />
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="teacher-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#teacher-grid)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherFeaturesPage;