import React, { useState } from 'react';
import { MapPin, Star, Clock, Mail, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  isOwnProfile: boolean;
  onUpdateProfile?: (updates: any) => void;
  onBack: () => void;
}

export default function ProfilePage({ user, isOwnProfile, onUpdateProfile, onBack }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    availability: user?.availability || '',
    skillsOffered: user?.skillsOffered || [],
    skillsWanted: user?.skillsWanted || [],
  });
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(editData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      location: user?.location || '',
      availability: user?.availability || '',
      skillsOffered: user?.skillsOffered || [],
      skillsWanted: user?.skillsWanted || [],
    });
    setIsEditing(false);
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setEditData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setEditData(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted('');
    }
  };

  const removeSkillOffered = (index: number) => {
    setEditData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((_, i) => i !== index)
    }));
  };

  const removeSkillWanted = (index: number) => {
    setEditData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter((_, i) => i !== index)
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const sampleFeedback = [
    {
      from: 'Yashpal',
      rating: 5,
      comment: 'Excellent Python and ML mentor! Helped me understand TensorFlow deeply.',
      date: '2 weeks ago'
    },
    {
      from: 'Ayan',
      rating: 4,
      comment: 'Great Django tutorial, learned clean architecture patterns!',
      date: '1 month ago'
    },
    {
      from: 'Tina',
      rating: 5,
      comment: 'Solid cybersecurity knowledge sharing, learned about secure coding practices!',
      date: '1 month ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            {isOwnProfile && (
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-all"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-all"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-green-500 px-8 py-12">
            <div className="flex items-start space-x-6">
              <img
                src={user?.profilePhoto || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex-1 text-white">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-3xl font-bold bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white placeholder-white/70 border border-white/30"
                    placeholder="Your name"
                  />
                ) : (
                  <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                )}
                
                <div className="flex items-center mb-2">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="text-white/90">{user?.email}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white placeholder-white/70 border border-white/30"
                      placeholder="Your location"
                    />
                  ) : (
                    <span className="text-white/90">{user?.location}</span>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(user?.rating || 4.8)}
                    <span className="ml-2 text-white/90">
                      {user?.rating || 4.8} ({user?.reviewCount || 12} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {/* Availability */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-orange-500" />
                Availability
              </h2>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.availability}
                  onChange={(e) => setEditData(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Weekends, Evenings"
                />
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {user?.availability || 'Not specified'}
                </p>
              )}
            </div>

            {/* Skills Offered */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 Skills Offered</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {(isEditing ? editData.skillsOffered : user?.skillsOffered || []).map((skill, index) => (
                  <div key={index} className="relative group">
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                      {skill}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkillOffered(index)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkillOffered()}
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Add a skill you can teach"
                  />
                  <button
                    onClick={addSkillOffered}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Skills Wanted */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Skills Wanted</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {(isEditing ? editData.skillsWanted : user?.skillsWanted || []).map((skill, index) => (
                  <div key={index} className="relative group">
                    <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium">
                      {skill}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkillWanted(index)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkillWanted()}
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Add a skill you want to learn"
                  />
                  <button
                    onClick={addSkillWanted}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Feedback Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">💬 Recent Feedback</h2>
              <div className="space-y-4">
                {sampleFeedback.map((feedback, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">{feedback.from}</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(feedback.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{feedback.date}</span>
                    </div>
                    <p className="text-gray-600">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}