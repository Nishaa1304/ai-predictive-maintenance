'use client'

import { MessageSquare, Star, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function FeedbackPage() {
  const feedbackData = [
    {
      id: 1,
      vehicleId: 'VIN12345',
      owner: 'John Smith',
      serviceDate: '2025-11-20',
      serviceCenter: 'AutoCare Center',
      rating: 5,
      nps: 10,
      sentiment: 'positive',
      comments: 'Excellent service! The AI predicted the battery issue perfectly. The technician was prepared and fixed it quickly. Very impressed!',
      categories: ['Prediction Accuracy', 'Service Quality', 'Speed']
    },
    {
      id: 2,
      vehicleId: 'VIN23456',
      owner: 'Sarah Johnson',
      serviceDate: '2025-11-19',
      serviceCenter: 'QuickFix Service',
      rating: 4,
      nps: 8,
      sentiment: 'positive',
      comments: 'Good experience overall. The voice call was helpful and the appointment was convenient. Minor wait time at the service center.',
      categories: ['Voice Agent', 'Convenience']
    },
    {
      id: 3,
      vehicleId: 'VIN67890',
      owner: 'Mike Brown',
      serviceDate: '2025-11-18',
      serviceCenter: 'Pro Service Station',
      rating: 3,
      nps: 6,
      sentiment: 'neutral',
      comments: 'The prediction was accurate but the service center was a bit far. Would prefer more options.',
      categories: ['Prediction Accuracy', 'Location']
    },
    {
      id: 4,
      vehicleId: 'VIN45678',
      owner: 'Emily Davis',
      serviceDate: '2025-11-17',
      serviceCenter: 'AutoCare Center',
      rating: 5,
      nps: 9,
      sentiment: 'positive',
      comments: 'Amazing! The AI called me before I even noticed any issues. Prevented a breakdown on my road trip. Thank you!',
      categories: ['Proactive', 'Prevention']
    },
  ]

  const stats = {
    totalFeedback: 156,
    avgRating: 4.6,
    avgNPS: 8.2,
    positiveRate: 87
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Feedback</h1>
        <p className="text-gray-600 mt-1">Post-service feedback and satisfaction metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Feedback</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalFeedback}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Rating</p>
              <div className="flex items-center mt-2">
                <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
                <Star className="w-6 h-6 text-yellow-600 ml-2 fill-yellow-600" />
              </div>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg NPS Score</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.avgNPS}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Positive Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.positiveRate}%</p>
            </div>
            <ThumbsUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sentiment Analysis</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <ThumbsUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">136</p>
            <p className="text-sm text-gray-600">Positive</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <MessageSquare className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-600">15</p>
            <p className="text-sm text-gray-600">Neutral</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <ThumbsDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">5</p>
            <p className="text-sm text-gray-600">Negative</p>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Feedback</h2>
        <div className="space-y-4">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{feedback.owner}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      feedback.sentiment === 'positive' 
                        ? 'bg-green-100 text-green-700' 
                        : feedback.sentiment === 'neutral'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {feedback.sentiment.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Vehicle: {feedback.vehicleId} | Service Date: {feedback.serviceDate}
                  </p>
                  <p className="text-sm text-gray-600">Service Center: {feedback.serviceCenter}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1">NPS: {feedback.nps}/10</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded mb-3">
                <p className="text-sm text-gray-800">{feedback.comments}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {feedback.categories.map((category, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
