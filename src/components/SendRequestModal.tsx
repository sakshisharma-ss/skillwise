import React, { useState } from 'react';
import { X, ArrowRight, Send } from 'lucide-react';

interface SendRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    email: string;
    profilePhoto: string;
    skillsOffered: string[];
    skillsWanted: string[];
  };
  currentUserSkills: string[];
  onSendRequest: (data: {
    offeredSkill: string;
    requestedSkill: string;
    message: string;
  }) => void;
}

export default function SendRequestModal({
  isOpen,
  onClose,
  recipient,
  currentUserSkills,
  onSendRequest
}: SendRequestModalProps) {
  const [formData, setFormData] = useState({
    offeredSkill: '',
    requestedSkill: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.offeredSkill && formData.requestedSkill && formData.message.trim()) {
      onSendRequest(formData);
      setFormData({ offeredSkill: '', requestedSkill: '', message: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Send Skill Exchange Request</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipient Info */}
        <div className="p-6 bg-gradient-to-r from-orange-50 to-green-50">
          <div className="flex items-center space-x-4">
            <img
              src={recipient.profilePhoto}
              alt={recipient.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">{recipient.name}</h3>
              <p className="text-gray-600">{recipient.email}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Skill Exchange Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Your Skill */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                💡 Skill You'll Teach
              </label>
              <select
                value={formData.offeredSkill}
                onChange={(e) => setFormData(prev => ({ ...prev, offeredSkill: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select a skill you can teach</option>
                {currentUserSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            {/* Their Skill */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎯 Skill You Want to Learn
              </label>
              <select
                value={formData.requestedSkill}
                onChange={(e) => setFormData(prev => ({ ...prev, requestedSkill: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select a skill you want to learn</option>
                {recipient.skillsOffered.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Exchange Preview */}
          {formData.offeredSkill && formData.requestedSkill && (
            <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Skill Exchange Preview</h4>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium mb-1">
                    {formData.offeredSkill}
                  </div>
                  <p className="text-xs text-gray-600">You teach</p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
                <div className="text-center">
                  <div className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg font-medium mb-1">
                    {formData.requestedSkill}
                  </div>
                  <p className="text-xs text-gray-600">You learn</p>
                </div>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              💬 Personal Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder={`Hi ${recipient.name}! I'd love to learn ${formData.requestedSkill || '[skill]'} from you. I can teach you ${formData.offeredSkill || '[skill]'} in return. Let me know if you're interested!`}
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Introduce yourself and explain why you'd like to exchange skills
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.offeredSkill || !formData.requestedSkill || !formData.message.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-xl hover:from-orange-600 hover:to-green-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}