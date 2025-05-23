
import { useState, useEffect } from 'react';
import { Compass, TrendingUp, Eye, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ClarityCompass = () => {
  const mockWeeklySummary = {
    topSignals: [
      {
        title: "Series A Follow-up from A16Z",
        category: "Fundraising",
        score: 95,
        summary: "High-priority investor communication requiring immediate attention"
      },
      {
        title: "Strategic Partnership Proposal",
        category: "Business Development",
        score: 88,
        summary: "Potential revenue opportunity with enterprise client"
      },
      {
        title: "Key Hire Resignation Notice",
        category: "Team Management",
        score: 82,
        summary: "Critical team change requiring succession planning"
      }
    ],
    missedBlindSpots: [
      "Market competitive analysis updates",
      "Customer churn rate tracking",
      "Technical debt assessment"
    ],
    focusAreas: ["Fundraising", "Product Development", "Team Scaling"],
    timeValueData: [
      { name: 'High Value', value: 35, color: '#10B981' },
      { name: 'Medium Value', value: 40, color: '#F59E0B' },
      { name: 'Low Value', value: 25, color: '#EF4444' }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Compass className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Clarity Compass</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Your weekly signal summary with insights on focus areas and missed opportunities.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Signals */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Top 3 High-Value Signals</h3>
          </div>
          
          <div className="space-y-4">
            {mockWeeklySummary.topSignals.map((signal, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{signal.title}</h4>
                  <span className="text-green-400 font-bold text-lg">{signal.score}</span>
                </div>
                <p className="text-gray-400 text-xs mb-2">{signal.category}</p>
                <p className="text-gray-300 text-sm">{signal.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time/Value Distribution */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Eye className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">Time/Value Distribution</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockWeeklySummary.timeValueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {mockWeeklySummary.timeValueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Missed Blind Spots */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Missed Blind Spots</h3>
          </div>
          
          <div className="space-y-3">
            {mockWeeklySummary.missedBlindSpots.map((blindSpot, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white text-sm">{blindSpot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Focus */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Compass className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Suggested Weekly Focus</h3>
          </div>
          
          <div className="space-y-3">
            {mockWeeklySummary.focusAreas.map((area, index) => (
              <div key={index} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <span className="text-purple-300 font-medium">{area}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <p className="text-cyan-300 text-sm">
              💡 <strong>AI Insight:</strong> Based on your signal patterns, consider allocating 60% of your time to fundraising activities this week, as you have multiple high-value investor touchpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClarityCompass;
