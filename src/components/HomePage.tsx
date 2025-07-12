import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, MessageCircle, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  profilePhoto: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
  rating: number;
  reviewCount: number;
}

interface HomePageProps {
  currentUser: any;
  onSendRequest: (recipientId: string) => void;
  onViewProfile: (userId: string) => void;
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Sakshi',
    email: 'sakshi@skillwise.in',
    location: 'Mumbai, Maharashtra',
    profilePhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    skillsOffered: ['Python', 'Machine Learning', 'Django', 'PostgreSQL', 'AWS', 'Docker'],
    skillsWanted: ['Kubernetes', 'Go', 'Rust', 'Blockchain Development', 'Unity'],
    availability: 'Weekends, Evenings',
    rating: 4.8,
    reviewCount: 12
  },
  {
    id: '2',
    name: 'Yashpal',
    email: 'yashpal@skillwise.in',
    location: 'Bangalore, Karnataka',
    profilePhoto: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    skillsOffered: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'GraphQL', 'MongoDB'],
    skillsWanted: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
    availability: 'Weekdays, Mornings',
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: '3',
    name: 'Ayan',
    email: 'ayan@skillwise.in',
    location: 'Delhi, NCR',
    profilePhoto: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    skillsWanted: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    availability: 'Weekends, Afternoons',
    rating: 4.7,
    reviewCount: 15
  },
  {
    id: '4',
    name: 'Tina',
    email: 'tina@skillwise.in',
    location: 'Pune, Maharashtra',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    skillsOffered: ['Cybersecurity', 'Penetration Testing', 'Network Security', 'Incident Response'],
    skillsWanted: ['Cloud Security', 'AI Security', 'Blockchain Security'],
    availability: 'Weekends, Mornings',
    rating: 4.9,
    reviewCount: 22
  },
  {
    id: '5',
    name: 'Shobhita',
    email: 'shobhita@skillwise.in',
    location: 'Chennai, Tamil Nadu',
    profilePhoto: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    skillsOffered: ['Unity', 'C#', 'Game Development', '3D Modeling', 'Animation'],
    skillsWanted: ['AI for Games', 'Multiplayer Networking', 'VR Development'],
    availability: 'Weekends, All Day',
    rating: 4.6,
    reviewCount: 9
  },
  {
    id: '6',
    name: 'Lakshya',
    email: 'lakshya@skillwise.in',
    location: 'Gurgaon, Haryana',
    profilePhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    skillsOffered: ['Data Science', 'Python', 'R', 'Statistical Analysis', 'Tableau', 'Power BI'],
    skillsWanted: ['MLOps', 'Apache Airflow', 'Kubernetes', 'Docker'],
    availability: 'Weekdays, Afternoons',
    rating: 4.8,
    reviewCount: 14
  }
];

export default function HomePage({ currentUser, onSendRequest, onViewProfile }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const usersPerPage = 4;

  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAvailability = filterAvailability === '' || 
      user.availability.toLowerCase().includes(filterAvailability.toLowerCase());
    
    return matchesSearch && matchesAvailability;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-green-500 p-2 rounded-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  Skill Wise
                </h1>
                <p className="text-sm text-gray-600">Discover Indian Tech Professionals</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Welcome, {currentUser?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{currentUser?.location || 'India'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by skills, name, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={filterAvailability}
                    onChange={(e) => setFilterAvailability(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">All Availability</option>
                    <option value="weekends">Weekends</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="mornings">Mornings</option>
                    <option value="evenings">Evenings</option>
                    <option value="afternoons">Afternoons</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {currentUsers.length} of {filteredUsers.length} professionals
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {currentUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="p-6">
                {/* User Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{user.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(user.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {user.rating} ({user.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Offered */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    💡 Skills Offered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skillsOffered.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{user.skillsOffered.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills Wanted */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    🎯 Skills Wanted
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{user.skillsWanted.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{user.availability}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => onViewProfile(user.id)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onSendRequest(user.id)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-all font-medium"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No professionals found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}