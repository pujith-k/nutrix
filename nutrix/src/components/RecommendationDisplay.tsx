import React from 'react';
import { NutritionRecommendation } from '../models/NutritionModel';

interface RecommendationDisplayProps {
  recommendation: NutritionRecommendation | null;
}

export function RecommendationDisplay({ recommendation }: RecommendationDisplayProps) {
  if (!recommendation) return null;

  const cards = [
    {
      title: 'Daily Calories',
      value: recommendation.calories,
      unit: 'kcal',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Protein',
      value: recommendation.protein,
      unit: 'g',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      )
    },
    {
      title: 'Carbohydrates',
      value: recommendation.carbs,
      unit: 'g',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
    {
      title: 'Fats',
      value: recommendation.fats,
      unit: 'g',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50 to-pink-50',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <h2 className="text-2xl font-semibold text-gray-800">Your Nutrition Plan</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="relative overflow-hidden rounded-xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-50`}></div>
            <div className="relative p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                  {card.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {card.value}
                <span className="text-sm font-normal text-gray-500 ml-1">{card.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Macronutrient Distribution</h3>
        <div className="space-y-4">
          {[
            { name: 'Protein', value: Math.round((recommendation.protein * 4 / recommendation.calories) * 100), color: 'from-blue-500 to-indigo-500' },
            { name: 'Carbs', value: Math.round((recommendation.carbs * 4 / recommendation.calories) * 100), color: 'from-amber-500 to-orange-500' },
            { name: 'Fats', value: Math.round((recommendation.fats * 9 / recommendation.calories) * 100), color: 'from-rose-500 to-pink-500' }
          ].map((macro, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{macro.name}</span>
                <span className="text-gray-600">{macro.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full bg-gradient-to-r ${macro.color} transition-all duration-500 ease-out`}
                  style={{ width: `${macro.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}