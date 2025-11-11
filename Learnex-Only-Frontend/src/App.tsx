import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentLayout from './components/StudentLayout';
import TeacherLayout from './components/TeacherLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/student/DashboardPage';
import SubjectsPage from './pages/student/SubjectsPage';
import SubjectDetailPage from './pages/student/SubjectDetailPage';
import ProgressPage from './pages/student/ProgressPage';
import ExamsPage from './pages/student/ExamsPage';
import ExamPracticePage from './pages/student/ExamPracticePage';
import MockTestPage from './pages/student/MockTestPage';
import MockTestResultPage from './pages/student/MockTestResultPage';
import MockTestResultHistoryPage from './pages/student/MockTestResultHistoryPage';
import AchievementsPage from './pages/student/AchievementsPage';
import SettingsPage from './pages/student/SettingsPage';
import AskAIPage from './pages/student/AskAIPage';
import ProfilePage from './pages/student/ProfilePage';
import SmartNotesPage from './pages/SmartNotesPage';
import QuizGeneratorPage from './pages/QuizGeneratorPage';
import GroupStudyPage from './pages/GroupStudyPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Teacher Pages
import TeacherHomePage from './pages/teacher/TeacherHomePage';
import TeacherLoginPage from './pages/teacher/TeacherLoginPage';
import TeacherFeaturesPage from './pages/teacher/TeacherFeaturesPage';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Teacher Public Routes */}
      <Route path="/teacher" element={<TeacherHomePage />} />
      <Route path="/teacher/login" element={<TeacherLoginPage />} />
      <Route path="/teacher/features" element={<TeacherFeaturesPage />} />
      
      {/* Protected Teacher Dashboard Routes */}
      <Route path="/teacher" element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<TeacherDashboardPage />} />
        <Route path="students" element={<div>Students Management (Coming Soon)</div>} />
        <Route path="tests" element={<div>Tests & Assignments (Coming Soon)</div>} />
        <Route path="analytics" element={<div>Analytics Dashboard (Coming Soon)</div>} />
        <Route path="schedule" element={<div>Class Schedule (Coming Soon)</div>} />
        <Route path="messages" element={<div>Messages (Coming Soon)</div>} />
        <Route path="achievements" element={<div>Student Achievements (Coming Soon)</div>} />
        <Route path="settings" element={<div>Teacher Settings (Coming Soon)</div>} />
        <Route path="profile" element={<div>Teacher Profile (Coming Soon)</div>} />
      </Route>
      
      {/* Protected Student Dashboard Routes */}
      <Route path="/student" element={
        <ProtectedRoute requiredRole="student">
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="subject/:subjectId" element={<SubjectDetailPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="exam-practice" element={<ExamPracticePage />} />
        <Route path="mocktest/:examId" element={<MockTestPage />} />
        <Route path="mocktest/result/:examId" element={<MockTestResultPage />} />
        <Route path="mocktest/results-history" element={<MockTestResultHistoryPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="ask-ai" element={<AskAIPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notes" element={<SmartNotesPage />} />
        <Route path="quiz-generator" element={<QuizGeneratorPage />} />
        <Route path="group-study" element={<GroupStudyPage />} />
        <Route path="exam/:id/details" element={<div>Exam Details Page (Coming Soon)</div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;