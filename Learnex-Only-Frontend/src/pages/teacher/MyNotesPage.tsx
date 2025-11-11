import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Share2, 
  Search, 
  Filter,
  Globe,
  Lock,
  Users,
  Calendar,
  Tag,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import { Link } from '../../components/Link';

interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  tags: string[];
  visibility: 'public' | 'code-protected' | 'private';
  accessCode?: string;
  fileCount: number;
  totalSize: number;
  downloads: number;
  views: number;
  createdDate: string;
  lastModified: string;
  allowDownload: boolean;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Calculus Fundamentals',
    description: 'Complete guide to differential and integral calculus with examples',
    subject: 'Mathematics',
    tags: ['calculus', 'derivatives', 'integrals'],
    visibility: 'public',
    fileCount: 3,
    totalSize: 15728640, // 15MB
    downloads: 45,
    views: 128,
    createdDate: '2024-03-10',
    lastModified: '2024-03-12',
    allowDownload: true
  },
  {
    id: '2',
    title: 'Organic Chemistry Reactions',
    description: 'Comprehensive notes on organic reaction mechanisms',
    subject: 'Chemistry',
    tags: ['organic', 'reactions', 'mechanisms'],
    visibility: 'code-protected',
    accessCode: 'CHEM2024',
    fileCount: 5,
    totalSize: 23068672, // 22MB
    downloads: 32,
    views: 89,
    createdDate: '2024-03-08',
    lastModified: '2024-03-10',
    allowDownload: true
  },
  {
    id: '3',
    title: 'Physics Lab Manual',
    description: 'Laboratory procedures and safety guidelines',
    subject: 'Physics',
    tags: ['lab', 'experiments', 'safety'],
    visibility: 'private',
    fileCount: 8,
    totalSize: 41943040, // 40MB
    downloads: 0,
    views: 15,
    createdDate: '2024-03-05',
    lastModified: '2024-03-07',
    allowDownload: false
  },
  {
    id: '4',
    title: 'English Literature Analysis',
    description: 'Character analysis and themes in classic literature',
    subject: 'English',
    tags: ['literature', 'analysis', 'themes'],
    visibility: 'public',
    fileCount: 2,
    totalSize: 8388608, // 8MB
    downloads: 67,
    views: 203,
    createdDate: '2024-03-01',
    lastModified: '2024-03-03',
    allowDownload: true
  }
];

const MyNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = subjectFilter === 'all' || note.subject === subjectFilter;
    const matchesVisibility = visibilityFilter === 'all' || note.visibility === visibilityFilter;
    
    return matchesSearch && matchesSubject && matchesVisibility;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <Globe className="h-4 w-4 text-green-600" />;
      case 'code-protected': return <Lock className="h-4 w-4 text-orange-600" />;
      case 'private': return <Users className="h-4 w-4 text-red-600" />;
      default: return <Globe className="h-4 w-4 text-gray-600" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'bg-green-100 text-green-700';
      case 'code-protected': return 'bg-orange-100 text-orange-700';
      case 'private': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const subjects = [...new Set(notes.map(note => note.subject))];
  const totalNotes = notes.length;
  const totalDownloads = notes.reduce((sum, note) => sum + note.downloads, 0);
  const totalViews = notes.reduce((sum, note) => sum + note.views, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1D39]">My Notes</h1>
          <p className="text-[#0B1D39] opacity-70">Manage your uploaded educational resources</p>
        </div>
        <Link href="/teacher/upload-notes">
          <Button className="bg-[#0B1D39] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Upload New Notes
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
              <p className="text-sm text-gray-500">Total Notes</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{totalNotes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Downloads</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{totalDownloads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">{totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Share2 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Public Notes</p>
              <p className="text-2xl font-semibold text-[#0B1D39]">
                {notes.filter(n => n.visibility === 'public').length}
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
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
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

            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
            >
              <option value="all">All Visibility</option>
              <option value="public">Public</option>
              <option value="code-protected">Code Protected</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0B1D39] mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{note.description}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVisibilityColor(note.visibility)}`}>
                {getVisibilityIcon(note.visibility)}
                <span className="ml-1 capitalize">{note.visibility.replace('-', ' ')}</span>
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subject:</span>
                <span className="text-[#0B1D39] font-medium">{note.subject}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Files:</span>
                <span className="text-[#0B1D39]">{note.fileCount} files ({formatFileSize(note.totalSize)})</span>
              </div>

              {note.accessCode && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Access Code:</span>
                  <span className="text-[#0B1D39] font-mono">{note.accessCode}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Downloads:</span>
                <span className="text-[#0B1D39]">{note.downloads}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Views:</span>
                <span className="text-[#0B1D39]">{note.views}</span>
              </div>
            </div>

            {/* Tags */}
            {note.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <span>Created: {note.createdDate}</span>
                <span>Modified: {note.lastModified}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || subjectFilter !== 'all' || visibilityFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Upload your first note to get started'
            }
          </p>
          <Link href="/teacher/upload-notes">
            <Button className="bg-[#0B1D39] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Upload New Notes
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyNotesPage;