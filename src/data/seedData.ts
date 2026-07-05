import { CravingLog, MealLog, SymptomLog, UserProfile, WaterLog } from '../types';

// Helper to format YYYY-MM-DD
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Subtract days helper
export function subDays(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export function getInitialUserProfile(): UserProfile {
  // Set last period start date to 19 days ago, placing Kishi currently in Day 19 (Luteal Phase)
  const lastPeriod = subDays(19);
  
  return {
    name: 'Kishi',
    avatarUrl: 'https://images.pexels.com/photos/1334130/pexels-photo-1334130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStartDate: formatDate(lastPeriod),
    dailyWaterGoalMl: 2000,
    streakCount: 6,
    lastLoggedDate: formatDate(new Date()),
    unlockedBadges: [
      'Magnesium Master 🍫',
      'Hydration Hero 💧',
      'Phase Synchronizer 🌸',
      'Symptom Listener 🎧'
    ],
    theme: 'light'
  };
}

export function getInitialCravingLogs(): CravingLog[] {
  const todayStr = formatDate(new Date());
  const yesterdayStr = formatDate(subDays(1));
  const d2Str = formatDate(subDays(2));
  const d3Str = formatDate(subDays(3));
  const d7Str = formatDate(subDays(7));
  const d12Str = formatDate(subDays(12));
  const d18Str = formatDate(subDays(18));

  return [
    {
      id: 'cr-1',
      timestamp: new Date().toISOString(),
      date: todayStr,
      phase: 'Luteal',
      category: 'Chocolate',
      intensity: 8,
      trigger: 'PMS',
      notes: 'Strong afternoon cocoa craving around 3:30 PM.'
    },
    {
      id: 'cr-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      date: todayStr,
      phase: 'Luteal',
      category: 'Salty',
      intensity: 6,
      trigger: 'Fatigue',
      notes: 'Wanted crunchy sea salt chips during work.'
    },
    {
      id: 'cr-3',
      timestamp: subDays(1).toISOString(),
      date: yesterdayStr,
      phase: 'Luteal',
      category: 'Chocolate',
      intensity: 9,
      trigger: 'PMS',
      notes: 'Needed dark chocolate after dinner.'
    },
    {
      id: 'cr-4',
      timestamp: subDays(2).toISOString(),
      date: d2Str,
      phase: 'Luteal',
      category: 'Carbs',
      intensity: 7,
      trigger: 'PMS',
      notes: 'Craving warm sourdough bread with butter.'
    },
    {
      id: 'cr-5',
      timestamp: subDays(3).toISOString(),
      date: d3Str,
      phase: 'Luteal',
      category: 'Sweet',
      intensity: 8,
      trigger: 'Stress',
      notes: 'Ice cream craving late evening.'
    },
    {
      id: 'cr-6',
      timestamp: subDays(7).toISOString(),
      date: d7Str,
      phase: 'Ovulatory',
      category: 'Spicy',
      intensity: 5,
      trigger: 'Habit',
      notes: 'Wanted spicy ramen.'
    },
    {
      id: 'cr-7',
      timestamp: subDays(12).toISOString(),
      date: d12Str,
      phase: 'Follicular',
      category: 'Sweet',
      intensity: 4,
      trigger: 'Social',
      notes: 'Boba tea with friends.'
    },
    {
      id: 'cr-8',
      timestamp: subDays(18).toISOString(),
      date: d18Str,
      phase: 'Menstrual',
      category: 'Fast Food',
      intensity: 8,
      trigger: 'PMS',
      notes: 'Craved hot greasy french fries for cramps.'
    }
  ];
}

export function getInitialSymptomLogs(): SymptomLog[] {
  const todayStr = formatDate(new Date());
  const yesterdayStr = formatDate(subDays(1));
  const d2Str = formatDate(subDays(2));
  const d18Str = formatDate(subDays(18));

  return [
    {
      id: 'sym-1',
      timestamp: new Date().toISOString(),
      date: todayStr,
      phase: 'Luteal',
      symptoms: [
        { name: 'Bloating', severity: 'Moderate' },
        { name: 'Mood Swings', severity: 'Mild' },
        { name: 'Fatigue', severity: 'Moderate' }
      ],
      notes: 'Mild PMS puffiness and tired in late afternoon.'
    },
    {
      id: 'sym-2',
      timestamp: subDays(1).toISOString(),
      date: yesterdayStr,
      phase: 'Luteal',
      symptoms: [
        { name: 'Bloating', severity: 'Severe' },
        { name: 'Headache', severity: 'Mild' }
      ],
      notes: 'Salty dinner caused noticeable morning bloating.'
    },
    {
      id: 'sym-3',
      timestamp: subDays(2).toISOString(),
      date: d2Str,
      phase: 'Luteal',
      symptoms: [
        { name: 'Cramps', severity: 'Mild' },
        { name: 'Anxiety', severity: 'Mild' }
      ]
    },
    {
      id: 'sym-4',
      timestamp: subDays(18).toISOString(),
      date: d18Str,
      phase: 'Menstrual',
      symptoms: [
        { name: 'Cramps', severity: 'Severe' },
        { name: 'Fatigue', severity: 'Severe' },
        { name: 'Low Energy', severity: 'Severe' }
      ],
      notes: 'Day 1 of cycle was heavy and sore.'
    }
  ];
}

export function getInitialMealLogs(): MealLog[] {
  const todayStr = formatDate(new Date());
  const yesterdayStr = formatDate(subDays(1));
  const d2Str = formatDate(subDays(2));
  const d18Str = formatDate(subDays(18));

  return [
    {
      id: 'ml-1',
      timestamp: new Date().toISOString(),
      date: todayStr,
      phase: 'Luteal',
      mealType: 'Snack',
      title: 'Rich Cacao & Avocado Silk Mousse',
      category: 'Craving Swap',
      tags: ['Magnesium-Rich', 'Serotonin Boost', 'Anti-Cramping'],
      imageUrl: 'https://images.pexels.com/photos/1334130/pexels-photo-1334130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      calories: 220,
      helpedRating: 'Helped Greatly',
      helpedSymptom: 'Chocolate Craving & Mood',
      notes: 'Totally satisfied my dark chocolate craving without sugar crash!'
    },
    {
      id: 'ml-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      date: todayStr,
      phase: 'Luteal',
      mealType: 'Lunch',
      title: 'Hydrating Cucumber & Fennel Mint Bowl',
      category: 'Anti-Bloating',
      tags: ['Diuretic', 'Potassium-Rich', 'Hydrating'],
      imageUrl: 'https://images.pexels.com/photos/4552231/pexels-photo-4552231.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      calories: 160,
      helpedRating: 'Helped Greatly',
      helpedSymptom: 'Bloating',
      notes: 'Abdomen felt noticeably lighter and less tight 1 hour after lunch.'
    },
    {
      id: 'ml-3',
      timestamp: subDays(1).toISOString(),
      date: yesterdayStr,
      phase: 'Luteal',
      mealType: 'Beverage',
      title: 'Warm Golden Ginger Milk Tea',
      category: 'Anti-Bloating',
      tags: ['Anti-Inflammatory', 'Gut Soothing'],
      imageUrl: 'https://images.pexels.com/photos/7243127/pexels-photo-7243127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      calories: 140,
      helpedRating: 'Helped Greatly',
      helpedSymptom: 'Bloating & Cramps',
      notes: 'Very comforting before bed.'
    },
    {
      id: 'ml-4',
      timestamp: subDays(2).toISOString(),
      date: d2Str,
      phase: 'Luteal',
      mealType: 'Dinner',
      title: 'Crispy Baked Sweet Potato Wedges & Tahini',
      category: 'Comfort Food',
      tags: ['Complex Carbs', 'B6-Boost'],
      imageUrl: 'https://images.pexels.com/photos/31336116/pexels-photo-31336116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      calories: 290,
      helpedRating: 'Helped Slightly',
      helpedSymptom: 'Mood Swings',
      notes: 'Felt calm and full.'
    },
    {
      id: 'ml-5',
      timestamp: subDays(18).toISOString(),
      date: d18Str,
      phase: 'Menstrual',
      mealType: 'Dinner',
      title: 'Wild Salmon & Quinoa Nourish Bowl',
      category: 'Energy Booster',
      tags: ['Omega-3', 'Iron-Rich', 'High Protein'],
      imageUrl: 'https://images.pexels.com/photos/14775610/pexels-photo-14775610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      calories: 480,
      helpedRating: 'Helped Greatly',
      helpedSymptom: 'Fatigue & Cramps',
      notes: 'Reduced cramps significantly within 2 hours.'
    }
  ];
}

export function getInitialWaterLogs(): WaterLog[] {
  const todayStr = formatDate(new Date());
  const yesterdayStr = formatDate(subDays(1));
  const d2Str = formatDate(subDays(2));
  const d3Str = formatDate(subDays(3));

  return [
    { date: todayStr, amountMl: 1750 },
    { date: yesterdayStr, amountMl: 2000 },
    { date: d2Str, amountMl: 1500 },
    { date: d3Str, amountMl: 2250 }
  ];
}
