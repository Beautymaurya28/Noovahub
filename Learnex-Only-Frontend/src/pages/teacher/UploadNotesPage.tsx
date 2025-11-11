import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  Video, 
  File, 
  X, 
  Check, 
  Eye,
  Download,
  Share2,
  Tag,
  Globe,
  Lock,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Toast, { ToastType } from '../../components/Toast';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface NoteConfig {
  title: string;
  description: string;
  subject: string;
  tags: string[];
  visibility: 'public' | 'code-protected' | 'private';
  accessCode?: string;
  allowDownload: boolean;
}

const UploadNotesPage: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [noteConfig, setNoteConfig] = useState<NoteConfig>({
    title: '',
    description: '',
    subject: '',
    tags: [],
    visibility: 'public',
    allowDownload: true
  });
  const [currentTag, setCurrentTag] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFileUpload(selectedFiles);
    }
  };

  const handleFileUpload = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadProgress: 0,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const newProgress = f.uploadProgress + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, uploadProgress: 100, status: 'completed' };
            }
            return { ...f, uploadProgress: newProgress };
          }
          return f;
        }));
      }, 200);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-6 w-6" />;
    if (type.startsWith('video/')) return <Video className="h-6 w-6" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-6 w-6" />;
    return <File className="h-6 w-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addTag = () => {
    if (currentTag.trim() && !noteConfig.tags.includes(currentTag.trim())) {
      setNoteConfig(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setNoteConfig(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const generateAccessCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setNoteConfig(prev => ({ ...prev, accessCode: code }));
  };

  const handlePublish = () => {
    if (!noteConfig.title || files.length === 0) {
      setShowToast(true);
      setToastMessage('Please add a title and upload at least one file');
      setToastType('error');
      return;
    }

    setShowToast(true);
    setToastMessage('Notes published successfully!');
    setToastType('success');

    // Reset form
    setFiles([]);
    setNoteConfig({
      title: '',
      description: '',
      subject: '',
      tags: [],
      visibility: 'public',
      allowDownload: true
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B1D39]">Upload Notes</h1>
        <p className="text-[#0B1D39] opacity-70">Share educational resources with your students</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* File Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg font-semibold text-[#0B1D39] mb-6">Upload Files</h2>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragOver
                  ? 'border-[#0B1D39] bg-blue-50'
                  : 'border-gray-300 hover:border-[#0B1D39] hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.mp4,.mp3"
                onChange={handleFileSelect}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2 text-lg">
                  Drop your files here, or{' '}
                  <span className="text-[#0B1D39] font-semibold hover:underline">browse</span>
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, DOC, PPT, images, videos (max 50MB each)
                </p>
              </label>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-[#0B1D39]">Uploaded Files ({files.length})</h3>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-[#0B1D39]">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <p className="font-medium text-[#0B1D39]">{file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {file.status === 'uploading' && (
                        <div className="w-24">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#0B1D39] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{file.uploadProgress}%</p>
                        </div>
                      )}
                      
                      {file.status === 'completed' && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                      
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Note Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg font-semibold text-[#0B1D39] mb-6">Note Details</h2>
            
            <div className="space-y-6">
              <Input
                id="title"
                label="Title"
                value={noteConfig.title}
                onChange={(e) => setNoteConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter note title"
                required
              />

              <div>
                <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={noteConfig.description}
                  onChange={(e) => setNoteConfig(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                  placeholder="Describe what this note covers..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                  Subject
                </label>
                <select
                  value={noteConfig.subject}
                  onChange={(e) => setNoteConfig(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                    placeholder="Add tags (e.g., algebra, equations)"
                  />
                  <Button onClick={addTag} variant="outline">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                {noteConfig.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {noteConfig.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#0B1D39] text-white"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-white hover:text-gray-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="font-semibold text-[#0B1D39] mb-6">Sharing Settings</h3>
            
            <div className="space-y-6">
              {/* Visibility */}
              <div>
                <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-3">
                  Visibility
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={noteConfig.visibility === 'public'}
                      onChange={(e) => setNoteConfig(prev => ({ ...prev, visibility: e.target.value as any }))}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-green-600" />
                      <span>Public (All students)</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="code-protected"
                      checked={noteConfig.visibility === 'code-protected'}
                      onChange={(e) => setNoteConfig(prev => ({ ...prev, visibility: e.target.value as any }))}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-orange-600" />
                      <span>Code Protected</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={noteConfig.visibility === 'private'}
                      onChange={(e) => setNoteConfig(prev => ({ ...prev, visibility: e.target.value as any }))}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-red-600" />
                      <span>Private (Selected students)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Access Code */}
              {noteConfig.visibility === 'code-protected' && (
                <div>
                  <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                    Access Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={noteConfig.accessCode || ''}
                      onChange={(e) => setNoteConfig(prev => ({ ...prev, accessCode: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
                      placeholder="Enter code"
                    />
                    <Button onClick={generateAccessCode} variant="outline" size="sm">
                      Generate
                    </Button>
                  </div>
                </div>
              )}

              {/* Download Permission */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={noteConfig.allowDownload}
                    onChange={(e) => setNoteConfig(prev => ({ ...prev, allowDownload: e.target.checked }))}
                    className="mr-3"
                  />
                  <span className="text-sm">Allow students to download</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={handlePublish}
                  className="w-full bg-[#0B1D39] text-white"
                  disabled={files.length === 0 || !noteConfig.title}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Publish Notes
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>

              {/* Upload Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-[#0B1D39] mb-2">Upload Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Files:</span>
                    <span>{files.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Size:</span>
                    <span>{formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visibility:</span>
                    <span className="capitalize">{noteConfig.visibility.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default UploadNotesPage;