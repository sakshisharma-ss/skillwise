import React, { useState } from 'react';
import { MessageCircle, Clock, CheckCircle, XCircle, User, ArrowRight, X } from 'lucide-react';

interface SwapRequest {
  id: string;
  type: 'incoming' | 'outgoing';
  otherUser: {
    name: string;
    email: string;
    profilePhoto: string;
    location: string;
  };
  offeredSkill: string;
  requestedSkill: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface RequestsPageProps {
  onBack: () => void;
  onAcceptRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
}

const sampleRequests: SwapRequest[] = [
  {
    id: '1',
    type: 'incoming',
    otherUser: {
      name: 'Yashpal',
      email: 'yashpal@skillwise.in',
      profilePhoto: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      location: 'Bangalore, Karnataka'
    },
    offeredSkill: 'JavaScript',
    requestedSkill: 'Python',
    message: 'Hi! I\'d love to learn Python and ML from you. I can teach you modern JavaScript, TypeScript, and React in return!',
    status: 'pending',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    type: 'incoming',
    otherUser: {
      name: 'Ayan',
      email: 'ayan@skillwise.in',
      profilePhoto: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      location: 'Delhi, NCR'
    },
    offeredSkill: 'UI/UX Design',
    requestedSkill: 'Machine Learning',
    message: 'Hello! Would you be interested in learning UI/UX design? I need help understanding ML concepts and would love to exchange skills.',
    status: 'pending',
    createdAt: '1 day ago'
  },
  {
    id: '3',
    type: 'outgoing',
    otherUser: {
      name: 'Tina',
      email: 'tina@skillwise.in',
      profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      location: 'Pune, Maharashtra'
    },
    offeredSkill: 'Django',
    requestedSkill: 'Cybersecurity',
    message: 'Hi Tina! I can teach you Django and web development. Could you help me learn cybersecurity best practices?',
    status: 'accepted',
    createdAt: '3 days ago'
  },
  {
    id: '4',
    type: 'outgoing',
    otherUser: {
      name: 'Lakshya',
      email: 'lakshya@skillwise.in',
      profilePhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      location: 'Gurgaon, Haryana'
    },
    offeredSkill: 'Python',
    requestedSkill: 'Data Science',
    message: 'Hello! I\'d like to learn advanced data science techniques. I can help you with Python programming in return.',
    status: 'pending',
    createdAt: '5 days ago'
  }
];

export default function RequestsPage({ onBack, onAcceptRequest, onRejectRequest }: RequestsPageProps) {
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('incoming');

  const incomingRequests = sampleRequests.filter(req => req.type === 'incoming');
  const outgoingRequests = sampleRequests.filter(req => req.type === 'outgoing');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const renderRequest = (request: SwapRequest) => (
    <div key={request.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      {/* Request Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={request.otherUser.profilePhoto}
            alt={request.otherUser.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
          />
          <div>
            <h3 className="font-bold text-gray-800">{request.otherUser.name}</h3>
            <p className="text-sm text-gray-600">{request.otherUser.location}</p>
            <p className="text-xs text-gray-500">{request.createdAt}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
          {getStatusIcon(request.status)}
          <span className="text-sm font-medium">{getStatusText(request.status)}</span>
        </div>
      </div>

      {/* Skill Exchange */}
      <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium mb-1">
              {request.type === 'incoming' ? request.offeredSkill : request.requestedSkill}
            </div>
            <p className="text-xs text-gray-600">
              {request.type === 'incoming' ? 'They offer' : 'You want'}
            </p>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <div className="text-center">
            <div className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg font-medium mb-1">
              {request.type === 'incoming' ? request.requestedSkill : request.offeredSkill}
            </div>
            <p className="text-xs text-gray-600">
              {request.type === 'incoming' ? 'They want' : 'You offer'}
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Message:</h4>
        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">{request.message}</p>
      </div>

      {/* Action Buttons */}
      {request.type === 'incoming' && request.status === 'pending' && (
        <div className="flex space-x-3">
          <button
            onClick={() => onRejectRequest(request.id)}
            className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            Reject
          </button>
          <button
            onClick={() => onAcceptRequest(request.id)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-all font-medium"
          >
            Accept
          </button>
        </div>
      )}

      {request.status === 'accepted' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-800 text-sm font-medium">
            🎉 Great! You can now start exchanging skills. Contact {request.otherUser.name} at {request.otherUser.email}
          </p>
        </div>
      )}
    </div>
  );

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
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6 text-orange-500" />
              <h1 className="text-xl font-bold text-gray-800">Swap Requests</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'incoming'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Incoming Requests ({incomingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('outgoing')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'outgoing'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Outgoing Requests ({outgoingRequests.length})
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {activeTab === 'incoming' && (
            <>
              {incomingRequests.length > 0 ? (
                incomingRequests.map(renderRequest)
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No incoming requests</h3>
                  <p className="text-gray-500">When someone wants to exchange skills with you, their requests will appear here.</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'outgoing' && (
            <>
              {outgoingRequests.length > 0 ? (
                outgoingRequests.map(renderRequest)
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No outgoing requests</h3>
                  <p className="text-gray-500">Start browsing profiles and send skill exchange requests to connect with other professionals.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}