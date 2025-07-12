import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import RequestsPage from './components/RequestsPage';
import SendRequestModal from './components/SendRequestModal';
import { MessageCircle, User, Bell, LogOut } from 'lucide-react';

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
  }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'home' | 'profile' | 'requests'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewingProfile, setViewingProfile] = useState<User | null>(null);
  const [showSendRequestModal, setShowSendRequestModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would validate credentials
    const user = sampleUsers.find(u => u.email === email) || sampleUsers[0];
    setCurrentUser(user);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setViewingProfile(null);
  };

  const handleViewProfile = (userId: string) => {
    const user = sampleUsers.find(u => u.id === userId) || currentUser;
    setViewingProfile(user);
    setCurrentScreen('profile');
  };

  const handleSendRequest = (recipientId: string) => {
    const recipient = sampleUsers.find(u => u.id === recipientId);
    if (recipient) {
      setSelectedRecipient(recipient);
      setShowSendRequestModal(true);
    }
  };

  const handleSendRequestSubmit = (data: any) => {
    console.log('Sending request:', data);
    // In real app, this would send the request to backend
    alert('Request sent successfully!');
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting request:', requestId);
    alert('Request accepted!');
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    alert('Request rejected!');
  };

  const handleUpdateProfile = (updates: any) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      setViewingProfile(updatedUser);
    }
  };

  if (currentScreen === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onShowSignup={() => alert('Signup functionality coming soon!')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      {currentScreen !== 'login' && (
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-green-500 p-2 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    Skill Wise
                  </h1>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentScreen === 'home'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Home
                </button>
                
                <button
                  onClick={() => setCurrentScreen('requests')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors relative ${
                    currentScreen === 'requests'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                <button
                  onClick={() => handleViewProfile(currentUser?.id || '1')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentScreen === 'profile'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <User className="w-5 h-5" />
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      {currentScreen === 'home' && (
        <HomePage
          currentUser={currentUser}
          onSendRequest={handleSendRequest}
          onViewProfile={handleViewProfile}
        />
      )}

      {currentScreen === 'profile' && viewingProfile && (
        <ProfilePage
          user={viewingProfile}
          isOwnProfile={viewingProfile.id === currentUser?.id}
          onUpdateProfile={handleUpdateProfile}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'requests' && (
        <RequestsPage
          onBack={() => setCurrentScreen('home')}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      )}

      {/* Send Request Modal */}
      {showSendRequestModal && selectedRecipient && currentUser && (
        <SendRequestModal
          isOpen={showSendRequestModal}
          onClose={() => setShowSendRequestModal(false)}
          recipient={selectedRecipient}
          currentUserSkills={currentUser.skillsOffered}
          onSendRequest={handleSendRequestSubmit}
        />
      )}
    </div>
  );
}

export default App;