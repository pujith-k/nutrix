import * as tf from '@tensorflow/tfjs';
import { UserData } from '../components/UserForm';

export interface NutritionRecommendation {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export class NutritionModel {
  private model: tf.LayersModel;

  constructor() {
    this.model = this.createModel();
    this.trainModel();
  }

  private createModel(): tf.LayersModel {
    const model = tf.sequential();

    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [6]
    }));

    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu'
    }));

    model.add(tf.layers.dense({
      units: 4,
      activation: 'linear'
    }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    return model;
  }

  private async trainModel() {
    // Generate synthetic training data
    const numSamples = 1000;
    const inputData = [];
    const outputData = [];

    for (let i = 0; i < numSamples; i++) {
      const age = Math.random() * 60 + 18;
      const weight = Math.random() * 100 + 45;
      const height = Math.random() * 50 + 150;
      const gender = Math.random() > 0.5 ? 1 : 0;
      const activity = Math.floor(Math.random() * 4);
      const goal = Math.floor(Math.random() * 3);

      inputData.push([age, weight, height, gender, activity, goal]);

      // Basic formula for calorie calculation (simplified BMR * activity factor)
      const bmr = gender === 1 
        ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

      const activityFactors = [1.2, 1.375, 1.55, 1.725];
      const goalFactors = [0.8, 1, 1.2];

      const calories = bmr * activityFactors[activity] * goalFactors[goal];
      const protein = weight * 2;
      const fats = (calories * 0.25) / 9;
      const carbs = (calories - (protein * 4) - (fats * 9)) / 4;

      outputData.push([calories, protein, carbs, fats]);
    }

    const xs = tf.tensor2d(inputData);
    const ys = tf.tensor2d(outputData);

    await this.model.fit(xs, ys, {
      epochs: 100,
      batchSize: 32,
      shuffle: true
    });

    xs.dispose();
    ys.dispose();
  }

  public predict(userData: UserData): NutritionRecommendation {
    const activityLevels = {
      'sedentary': 0,
      'light': 1,
      'moderate': 2,
      'active': 3
    };

    const goals = {
      'lose': 0,
      'maintain': 1,
      'gain': 2
    };

    const input = tf.tensor2d([[
      userData.age,
      userData.weight,
      userData.height,
      userData.gender === 'male' ? 1 : 0,
      activityLevels[userData.activityLevel],
      goals[userData.goal]
    ]]);

    const prediction = this.model.predict(input) as tf.Tensor;
    const values = prediction.dataSync();

    input.dispose();
    prediction.dispose();

    return {
      calories: Math.round(values[0]),
      protein: Math.round(values[1]),
      carbs: Math.round(values[2]),
      fats: Math.round(values[3])
    };
  }
}