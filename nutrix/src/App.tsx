import React, { useState } from 'react';
import { UserForm, UserData } from './components/UserForm';
import { RecommendationDisplay } from './components/RecommendationDisplay';
import { NutritionModel, NutritionRecommendation } from './models/NutritionModel';
import { Logo } from './components/Logo';

export default function App() {
  const [model] = useState(() => new NutritionModel());
  const [recommendation, setRecommendation] = useState<NutritionRecommendation | null>(null);

  const handleSubmit = (userData: UserData) => {
    const result = model.predict(userData);
    setRecommendation(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Logo className="h-12 mx-auto mb-6" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Smart Nutrition Planning
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get personalized nutrition recommendations powered by machine learning, tailored to your unique profile and goals
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-gray-800">Your Profile</h2>
              </div>
              <UserForm onSubmit={handleSubmit} />
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100/50">
              {recommendation ? (
                <RecommendationDisplay recommendation={recommendation} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500 max-w-sm">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-600 mb-2">Ready to Begin</p>
                    <p className="text-sm text-gray-500">Fill in your details to receive your personalized nutrition plan</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}