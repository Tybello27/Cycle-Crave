import { useState, useEffect } from 'react';
import { 
  UserProfile, 
  CravingLog, 
  SymptomLog, 
  MealLog, 
  WaterLog, 
  CyclePhase, 
  ReliefRating,
  SymptomName
} from '../types';
import { 
  getInitialUserProfile, 
  getInitialCravingLogs, 
  getInitialSymptomLogs, 
  getInitialMealLogs, 
  getInitialWaterLogs,
  formatDate 
} from '../data/seedData';

const STORAGE_KEY = 'cyclecrave.data.v1';

export function getCurrentCycleDayAndPhase(lastPeriodStartDate: string, cycleLength = 28, periodLength = 5): { day: number; phase: CyclePhase } {
  const start = new Date(lastPeriodStartDate);
  const now = new Date();
  
  // Clear time portions for accurate day calc
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  let currentDay = (diffDays % cycleLength) + 1;
  if (currentDay <= 0) currentDay += cycleLength;
  
  let phase: CyclePhase = 'Luteal';
  if (currentDay <= periodLength) {
    phase = 'Menstrual';
  } else if (currentDay <= 13) {
    phase = 'Follicular';
  } else if (currentDay <= 16) {
    phase = 'Ovulatory';
  } else {
    phase = 'Luteal';
  }
  
  return { day: currentDay, phase };
}

export function useCycleData() {
  const [profile, setProfile] = useState<UserProfile>(getInitialUserProfile);
  const [cravings, setCravings] = useState<CravingLog[]>(getInitialCravingLogs);
  const [symptoms, setSymptoms] = useState<SymptomLog[]>(getInitialSymptomLogs);
  const [meals, setMeals] = useState<MealLog[]>(getInitialMealLogs);
  const [water, setWater] = useState<WaterLog[]>(getInitialWaterLogs);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.cravings) setCravings(parsed.cravings);
        if (parsed.symptoms) setSymptoms(parsed.symptoms);
        if (parsed.meals) setMeals(parsed.meals);
        if (parsed.water) setWater(parsed.water);
      }
    } catch (e) {
      console.error('Failed to parse cyclecrave localStorage', e);
    }
  }, []);

  // Save state whenever it updates
  useEffect(() => {
    const dataToStore = {
      profile,
      cravings,
      symptoms,
      meals,
      water
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (e) {
      console.error('Failed to store cyclecrave localStorage', e);
    }
  }, [profile, cravings, symptoms, meals, water]);

  const { day: currentCycleDay, phase: currentPhase } = getCurrentCycleDayAndPhase(
    profile.lastPeriodStartDate,
    profile.cycleLength,
    profile.periodLength
  );

  const todayStr = formatDate(new Date());

  // Water level for today
  const todayWaterLog = water.find(w => w.date === todayStr);
  const todayWaterMl = todayWaterLog ? todayWaterLog.amountMl : 0;

  const addWater = (amountMl: number) => {
    setWater(prev => {
      const existing = prev.find(w => w.date === todayStr);
      if (existing) {
        return prev.map(w => w.date === todayStr ? { ...w, amountMl: Math.max(0, w.amountMl + amountMl) } : w);
      } else {
        return [...prev, { date: todayStr, amountMl: Math.max(0, amountMl) }];
      }
    });
  };

  const addCraving = (newCraving: Omit<CravingLog, 'id' | 'timestamp' | 'date' | 'phase'>) => {
    const log: CravingLog = {
      ...newCraving,
      id: 'cr-' + Date.now(),
      timestamp: new Date().toISOString(),
      date: todayStr,
      phase: currentPhase
    };
    setCravings(prev => [log, ...prev]);
    
    // Increment streak if not logged today yet
    if (profile.lastLoggedDate !== todayStr) {
      setProfile(prev => ({
        ...prev,
        streakCount: prev.streakCount + 1,
        lastLoggedDate: todayStr
      }));
    }
  };

  const addSymptom = (newSymptom: Omit<SymptomLog, 'id' | 'timestamp' | 'date' | 'phase'>) => {
    const log: SymptomLog = {
      ...newSymptom,
      id: 'sym-' + Date.now(),
      timestamp: new Date().toISOString(),
      date: todayStr,
      phase: currentPhase
    };
    setSymptoms(prev => [log, ...prev]);

    if (profile.lastLoggedDate !== todayStr) {
      setProfile(prev => ({
        ...prev,
        streakCount: prev.streakCount + 1,
        lastLoggedDate: todayStr
      }));
    }
  };

  const addMeal = (newMeal: Omit<MealLog, 'id' | 'timestamp' | 'date' | 'phase'>) => {
    const log: MealLog = {
      ...newMeal,
      id: 'ml-' + Date.now(),
      timestamp: new Date().toISOString(),
      date: todayStr,
      phase: currentPhase
    };
    setMeals(prev => [log, ...prev]);

    if (profile.lastLoggedDate !== todayStr) {
      setProfile(prev => ({
        ...prev,
        streakCount: prev.streakCount + 1,
        lastLoggedDate: todayStr
      }));
    }
  };

  const updateMealRelief = (mealId: string, rating: ReliefRating, symptom?: SymptomName | string) => {
    setMeals(prev => prev.map(m => m.id === mealId ? { ...m, helpedRating: rating, helpedSymptom: symptom || m.helpedSymptom } : m));
  };

  const deleteLog = (type: 'craving' | 'symptom' | 'meal', id: string) => {
    if (type === 'craving') {
      setCravings(prev => prev.filter(c => c.id !== id));
    } else if (type === 'symptom') {
      setSymptoms(prev => prev.filter(s => s.id !== id));
    } else if (type === 'meal') {
      setMeals(prev => prev.filter(m => m.id !== id));
    }
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const resetToSeed = () => {
    setProfile(getInitialUserProfile());
    setCravings(getInitialCravingLogs());
    setSymptoms(getInitialSymptomLogs());
    setMeals(getInitialMealLogs());
    setWater(getInitialWaterLogs());
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    profile,
    currentCycleDay,
    currentPhase,
    cravings,
    symptoms,
    meals,
    water,
    todayWaterMl,
    todayStr,
    addWater,
    addCraving,
    addSymptom,
    addMeal,
    updateMealRelief,
    deleteLog,
    updateProfile,
    resetToSeed
  };
}
