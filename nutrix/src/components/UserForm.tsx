import React from 'react';

interface UserFormProps {
  onSubmit: (userData: UserData) => void;
}

export interface UserData {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: string;
  goal: string;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = React.useState<UserData>({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClassName = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-gray-700 bg-white/50";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            className={inputClassName}
            min="1"
            max="120"
          />
        </div>

        <div>
          <label className={labelClassName}>Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
            className={inputClassName}
            min="30"
            max="300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Height (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
            className={inputClassName}
            min="100"
            max="250"
          />
        </div>

        <div>
          <label className={labelClassName}>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
            className={inputClassName}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClassName}>Activity Level</label>
        <select
          value={formData.activityLevel}
          onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
          className={inputClassName}
        >
          <option value="sedentary">Sedentary (Little to no exercise)</option>
          <option value="light">Light (Exercise 1-3 times/week)</option>
          <option value="moderate">Moderate (Exercise 3-5 times/week)</option>
          <option value="active">Very Active (Exercise 6-7 times/week)</option>
        </select>
      </div>

      <div>
        <label className={labelClassName}>Goal</label>
        <select
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className={inputClassName}
        >
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
      >
        Calculate Nutrition Plan
      </button>
    </form>
  );
}