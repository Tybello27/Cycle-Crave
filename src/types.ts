export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulatory' | 'Luteal';

export type CravingCategory = 
  | 'Chocolate' 
  | 'Sweet' 
  | 'Salty' 
  | 'Spicy' 
  | 'Fast Food' 
  | 'Carbs' 
  | 'Other';

export type SymptomName = 
  | 'Cramps' 
  | 'Bloating' 
  | 'Fatigue' 
  | 'Headache' 
  | 'Mood Swings' 
  | 'Anxiety' 
  | 'Low Energy' 
  | 'Breast Tenderness' 
  | 'Brain Fog' 
  | 'Sugar Spikes';

export type SymptomSeverity = 'Mild' | 'Moderate' | 'Severe';

export interface SymptomItem {
  name: SymptomName;
  severity: SymptomSeverity;
}

export type CravingTrigger = 'PMS' | 'Stress' | 'Fatigue' | 'Boredom' | 'Habit' | 'Social';

export interface CravingLog {
  id: string;
  timestamp: string; // ISO string
  date: string; // YYYY-MM-DD
  phase: CyclePhase;
  category: CravingCategory;
  intensity: number; // 1 to 10
  trigger?: CravingTrigger;
  notes?: string;
}

export interface SymptomLog {
  id: string;
  timestamp: string;
  date: string; // YYYY-MM-DD
  phase: CyclePhase;
  symptoms: SymptomItem[];
  notes?: string;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Beverage';

export type ReliefRating = 'Helped Greatly' | 'Helped Slightly' | 'Neutral' | 'Didn\'t Help';

export interface MealLog {
  id: string;
  timestamp: string;
  date: string; // YYYY-MM-DD
  phase: CyclePhase;
  mealType: MealType;
  title: string;
  category?: 'Comfort Food' | 'Energy Booster' | 'Anti-Bloating' | 'Craving Swap' | 'Standard';
  tags: string[];
  imageUrl?: string;
  calories?: number;
  helpedRating?: ReliefRating;
  helpedSymptom?: SymptomName | string;
  notes?: string;
}

export interface WaterLog {
  date: string; // YYYY-MM-DD
  amountMl: number;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  cycleLength: number; // e.g. 28
  periodLength: number; // e.g. 5
  lastPeriodStartDate: string; // YYYY-MM-DD
  dailyWaterGoalMl: number; // e.g. 2000
  streakCount: number;
  lastLoggedDate: string;
  unlockedBadges: string[];
  theme: 'light' | 'dark' | 'system';
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'Comfort Food' | 'Energy Booster' | 'Anti-Bloating' | 'Craving Swap';
  targetPhases: CyclePhase[];
  targetCravings?: CravingCategory[];
  targetSymptoms?: SymptomName[];
  prepTimeMinutes: number;
  calories: number;
  imageUrl: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  whyItHelps: string;
  nutrientHighlights: Array<{ label: string; value: string }>;
}

export interface PhaseInfo {
  name: CyclePhase;
  dayRange: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderColor: string;
  hormoneStatus: string;
  description: string;
  nutritionFocus: string[];
  recommendedFoods: string[];
  foodsToLimit: string[];
}
