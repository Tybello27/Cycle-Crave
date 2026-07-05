import { Recipe } from '../types';

export const RECIPES_DATABASE: Recipe[] = [
  {
    id: 'dark-chocolate-avocado-mousse',
    title: 'Rich Cacao & Avocado Silk Mousse',
    subtitle: 'Decadent, creamy, and loaded with anti-cramping magnesium',
    category: 'Craving Swap',
    targetPhases: ['Luteal', 'Menstrual'],
    targetCravings: ['Chocolate', 'Sweet', 'Carbs'],
    targetSymptoms: ['Cramps', 'Mood Swings', 'Anxiety', 'Fatigue'],
    prepTimeMinutes: 10,
    calories: 220,
    imageUrl: 'https://images.pexels.com/photos/1334130/pexels-photo-1334130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Magnesium-Rich', 'Sugar-Free', 'Serotonin Boost', 'Anti-Cramping'],
    ingredients: [
      '1 ripe avocado',
      '3 tbsp raw unrefined cacao powder',
      '2 tbsp pure maple syrup or honey',
      '3 tbsp unsweetened almond milk',
      '1/2 tsp vanilla extract',
      'Pinch of sea salt',
      'Toppings: Raspberries & cacao nibs'
    ],
    instructions: [
      'Scoop avocado flesh into a high-speed blender or food processor.',
      'Add cacao powder, maple syrup, almond milk, vanilla, and sea salt.',
      'Blend until completely silky smooth and fluffy, scraping down sides as needed.',
      'Spoon into small ramekins and chill in fridge for 20 minutes.',
      'Top with fresh antioxidant-rich raspberries and cacao nibs before serving.'
    ],
    whyItHelps: 'Raw cacao provides a powerful dose of magnesium to relax uterine contractions and boost serotonin, while healthy avocado fats stabilize blood sugar spikes.',
    nutrientHighlights: [
      { label: 'Magnesium', value: '115mg (28% DV)' },
      { label: 'Healthy Fats', value: '14g' },
      { label: 'Fiber', value: '7g' }
    ]
  },
  {
    id: 'ginger-turmeric-golden-milk',
    title: 'Warm Golden Ginger Milk Tea',
    subtitle: 'Soothing anti-inflammatory tonic for bloating and cramps',
    category: 'Anti-Bloating',
    targetPhases: ['Menstrual', 'Luteal'],
    targetCravings: ['Sweet', 'Other'],
    targetSymptoms: ['Cramps', 'Bloating', 'Fatigue', 'Headache'],
    prepTimeMinutes: 8,
    calories: 140,
    imageUrl: 'https://images.pexels.com/photos/7243127/pexels-photo-7243127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Anti-Inflammatory', 'Cramps Relief', 'Gut Soothing', 'Warm Comfort'],
    ingredients: [
      '1.5 cups oat milk or coconut milk',
      '1 tsp ground turmeric powder or fresh grated turmeric',
      '1/2 tsp fresh grated ginger',
      '1/4 tsp ground cinnamon',
      'Pinch of black pepper (enhances curcumin absorption)',
      '1 tsp raw honey or agave'
    ],
    instructions: [
      'In a small saucepan, gently warm oat milk over medium-low heat.',
      'Whisk in turmeric, grated ginger, cinnamon, and black pepper.',
      'Simmer gently for 5 minutes without boiling to infuse all spices.',
      'Strain into a cozy mug, stir in honey, and enjoy while warm.'
    ],
    whyItHelps: 'Ginger inhibits prostaglandin synthesis (the chemical that causes menstrual cramps), while curcumin in turmeric reduces abdominal fluid retention and bloating.',
    nutrientHighlights: [
      { label: 'Curcumin', value: 'Active Compound' },
      { label: 'Calcium', value: '300mg' },
      { label: 'Potassium', value: '240mg' }
    ]
  },
  {
    id: 'salmon-quinoa-power-bowl',
    title: 'Wild Salmon & Quinoa Nourish Bowl',
    subtitle: 'Omega-3 fatty acids and iron to restore energy and relieve cramps',
    category: 'Energy Booster',
    targetPhases: ['Menstrual', 'Luteal'],
    targetCravings: ['Salty', 'Fast Food'],
    targetSymptoms: ['Fatigue', 'Low Energy', 'Cramps', 'Brain Fog'],
    prepTimeMinutes: 20,
    calories: 480,
    imageUrl: 'https://images.pexels.com/photos/14775610/pexels-photo-14775610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Omega-3', 'Iron-Rich', 'High Protein', 'Hormone Balance'],
    ingredients: [
      '150g wild-caught salmon fillet',
      '1 cup cooked fluffy quinoa',
      '1/2 cup steamed baby spinach or kale',
      '1/2 sliced ripe avocado',
      '1 tbsp pumpkin seeds (pepitas)',
      'Lemon tahini dressing (1 tbsp tahini, 1 tbsp lemon juice, warm water)'
    ],
    instructions: [
      'Season salmon with sea salt, black pepper, and paprika.',
      'Pan-sear salmon in a skillet with olive oil for 3-4 minutes per side until golden.',
      'Assemble quinoa, steamed greens, and avocado in a deep bowl.',
      'Flake salmon over the top and sprinkle with pumpkin seeds.',
      'Drizzle with rich lemon tahini dressing.'
    ],
    whyItHelps: 'Wild salmon provides EPA & DHA Omega-3s that reduce inflammatory prostaglandin levels, while spinach and pumpkin seeds deliver zinc and iron to restore blood loss.',
    nutrientHighlights: [
      { label: 'Omega-3', value: '1.8g' },
      { label: 'Iron', value: '4.2mg (23% DV)' },
      { label: 'Protein', value: '34g' }
    ]
  },
  {
    id: 'matcha-chia-overnight-pudding',
    title: 'Matcha & Chia Seed Energy Pudding',
    subtitle: 'Sustained, jitters-free energy with steady L-theanine focus',
    category: 'Energy Booster',
    targetPhases: ['Follicular', 'Ovulatory', 'Luteal'],
    targetCravings: ['Sweet', 'Carbs'],
    targetSymptoms: ['Fatigue', 'Low Energy', 'Brain Fog'],
    prepTimeMinutes: 5,
    calories: 210,
    imageUrl: 'https://images.pexels.com/photos/4552127/pexels-photo-4552127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['L-Theanine', 'Fiber-Rich', 'Sustained Energy', 'Estrogen Metabolism'],
    ingredients: [
      '3 tbsp chia seeds',
      '1 cup unsweetened coconut or almond milk',
      '1 tsp ceremonial grade matcha powder',
      '1 tbsp maple syrup',
      '1/2 tsp vanilla extract',
      'Fresh blueberries & coconut flakes for topping'
    ],
    instructions: [
      'Whisk matcha powder with 2 tbsp warm water until smooth and frothy.',
      'In a jar, mix chia seeds, milk, matcha mixture, maple syrup, and vanilla.',
      'Stir vigorously for 1 minute, wait 5 minutes, and stir again to prevent clumping.',
      'Cover and refrigerate overnight or for at least 2 hours.',
      'Top with fresh blueberries and unsweetened coconut flakes.'
    ],
    whyItHelps: 'Matcha releases caffeine slowly alongside L-theanine for calm alertness without adrenal stress, while chia seeds slow down carbohydrate absorption.',
    nutrientHighlights: [
      { label: 'Fiber', value: '10g' },
      { label: 'Antioxidants', value: 'High EGCG' },
      { label: 'Omega-3', value: '2.5g' }
    ]
  },
  {
    id: 'cucumber-watermelon-fennel-salad',
    title: 'Hydrating Cucumber & Fennel Mint Bowl',
    subtitle: 'Flushes excess sodium, reduces bloating, and cools hormonal heat',
    category: 'Anti-Bloating',
    targetPhases: ['Ovulatory', 'Luteal'],
    targetCravings: ['Salty', 'Sweet'],
    targetSymptoms: ['Bloating', 'Headache', 'Breast Tenderness'],
    prepTimeMinutes: 10,
    calories: 160,
    imageUrl: 'https://images.pexels.com/photos/4552231/pexels-photo-4552231.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Diuretic', 'Hydrating', 'Potassium-Rich', 'De-Bloat'],
    ingredients: [
      '1.5 cups cubed fresh watermelon',
      '1 cup thinly sliced Persian cucumber',
      '1/2 cup shaved fennel bulb',
      '1/4 cup crumbled feta cheese or dairy-free alternative',
      '2 tbsp fresh mint leaves, torn',
      'Lime juice & extra virgin olive oil drizzle'
    ],
    instructions: [
      'Combine watermelon, cucumber, and shaved fennel in a chilled bowl.',
      'Gently toss with fresh lime juice and olive oil.',
      'Garnish with crumbled feta and torn mint leaves.',
      'Serve chilled for maximum refreshing de-bloating effects.'
    ],
    whyItHelps: 'Fennel contains anethole which relaxes gastrointestinal smooth muscles, while potassium in watermelon and cucumber neutralizes excess salt retention.',
    nutrientHighlights: [
      { label: 'Potassium', value: '420mg' },
      { label: 'Water Content', value: '92%' },
      { label: 'Vitamin C', value: '35mg' }
    ]
  },
  {
    id: 'baked-sweet-potato-fries-tahini',
    title: 'Crispy Baked Sweet Potato Wedges & Tahini',
    subtitle: 'Complex carb craving cure that stabilizes progesterone drop',
    category: 'Comfort Food',
    targetPhases: ['Luteal', 'Menstrual'],
    targetCravings: ['Salty', 'Carbs', 'Fast Food'],
    targetSymptoms: ['Mood Swings', 'Anxiety', 'Sugar Spikes'],
    prepTimeMinutes: 25,
    calories: 290,
    imageUrl: 'https://images.pexels.com/photos/31336116/pexels-photo-31336116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Complex Carbs', 'B6-Boost', 'Serotonin Support', 'Comforting'],
    ingredients: [
      '2 medium sweet potatoes, sliced into wedges',
      '1 tbsp avocado oil',
      '1/2 tsp smoked paprika & garlic powder',
      'Pinch of sea salt',
      'Dipping Sauce: 2 tbsp tahini, 1 tbsp lemon juice, 1 tsp maple syrup, garlic'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C) and line a baking sheet with parchment paper.',
      'Toss sweet potato wedges with avocado oil, paprika, garlic powder, and salt.',
      'Spread in a single layer without overcrowding for crispiness.',
      'Bake for 22-25 minutes, flipping halfway through.',
      'Whisk tahini dipping sauce ingredients together and serve alongside hot fries.'
    ],
    whyItHelps: 'Sweet potatoes are packed with Vitamin B6, which is crucial for progesterone production and serotonin synthesis during the premenstrual late luteal phase.',
    nutrientHighlights: [
      { label: 'Vitamin B6', value: '0.6mg (35% DV)' },
      { label: 'Beta-Carotene', value: '380% DV' },
      { label: 'Fiber', value: '5g' }
    ]
  },
  {
    id: 'creamy-berry-oatmeal-nut-butter',
    title: 'Warm Cinnamon Berry Oatmeal with Almond Butter',
    subtitle: 'Nourishing warm bowl that grounds mood and curbs PMS hunger',
    category: 'Comfort Food',
    targetPhases: ['Menstrual', 'Luteal'],
    targetCravings: ['Sweet', 'Carbs'],
    targetSymptoms: ['Fatigue', 'Mood Swings', 'Sugar Spikes', 'Cramps'],
    prepTimeMinutes: 12,
    calories: 360,
    imageUrl: 'https://images.pexels.com/photos/1334130/pexels-photo-1334130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Slow Digesting', 'Magnesium', 'Beta-Glucan', 'Comforting'],
    ingredients: [
      '1/2 cup rolled oats',
      '1 cup almond milk or water',
      '1/2 tsp Ceylon cinnamon',
      '1/2 cup mixed dark berries (blueberries, blackberries)',
      '1 tbsp creamy almond butter',
      '1 tsp flaxseed meal or hemp seeds'
    ],
    instructions: [
      'Bring almond milk and cinnamon to a gentle simmer in a small pot.',
      'Stir in rolled oats and reduce heat to low, cooking for 5-7 minutes until creamy.',
      'Fold in half of the berries so they burst and swirl through the oats.',
      'Transfer to a bowl and top with remaining berries, almond butter drizzle, and flaxseeds.'
    ],
    whyItHelps: 'Slow-releasing beta-glucan fiber prevents blood sugar crashes that trigger anxiety and irritability, while cinnamon boosts insulin sensitivity.',
    nutrientHighlights: [
      { label: 'Beta-Glucan', value: '3.8g' },
      { label: 'Magnesium', value: '95mg' },
      { label: 'Manganese', value: '1.2mg' }
    ]
  },
  {
    id: 'spicy-edamame-sesame-crunch',
    title: 'Spicy Chili Garlic Edamame',
    subtitle: 'Satisfies spicy and salty cravings while delivering phytoestrogens',
    category: 'Craving Swap',
    targetPhases: ['Follicular', 'Ovulatory', 'Luteal'],
    targetCravings: ['Spicy', 'Salty', 'Fast Food'],
    targetSymptoms: ['Low Energy', 'Mood Swings'],
    prepTimeMinutes: 10,
    calories: 190,
    imageUrl: 'https://images.pexels.com/photos/7243127/pexels-photo-7243127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Phytoestrogen', 'Plant Protein', 'High Fiber', 'Spicy Satisfier'],
    ingredients: [
      '2 cups frozen edamame in pods',
      '1 tsp sesame oil',
      '1 tsp chili crisp or sriracha',
      '1 clove minced garlic',
      '1 tbsp tamari or low-sodium soy sauce',
      'Toasted sesame seeds & flaky sea salt'
    ],
    instructions: [
      'Boil or steam edamame pods for 4-5 minutes until tender; drain well.',
      'In a warm skillet, heat sesame oil, minced garlic, and chili crisp for 1 minute.',
      'Add edamame pods and tamari, tossing for 2 minutes until coated and fragrant.',
      'Transfer to a bowl, sprinkle with toasted sesame seeds and flaky sea salt.'
    ],
    whyItHelps: 'Edamame offers gentle plant phytoestrogens that balance fluctuating hormone levels, plus 17g of clean protein to stop compulsions to binge on junk food.',
    nutrientHighlights: [
      { label: 'Protein', value: '17g' },
      { label: 'Folate', value: '482mcg (120% DV)' },
      { label: 'Fiber', value: '8g' }
    ]
  },
  {
    id: 'berry-kefir-anti-bloat-smoothie',
    title: 'Wild Berry & Kefir Gut-Restore Smoothie',
    subtitle: 'Probiotic-rich elixir that restores digestion and calms PMS gut',
    category: 'Anti-Bloating',
    targetPhases: ['Luteal', 'Menstrual'],
    targetCravings: ['Sweet', 'Other'],
    targetSymptoms: ['Bloating', 'Brain Fog', 'Mood Swings'],
    prepTimeMinutes: 5,
    calories: 230,
    imageUrl: 'https://images.pexels.com/photos/4552127/pexels-photo-4552127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Probiotic', 'Gut-Brain Axis', 'Antioxidants', 'Light & Fresh'],
    ingredients: [
      '1 cup plain goat milk kefir or coconut kefir',
      '3/4 cup frozen wild blueberries',
      '1/2 cup fresh strawberries',
      '1 tbsp chia seeds',
      '1/2 inch fresh ginger piece',
      '1 tsp raw honey (optional)'
    ],
    instructions: [
      'Add kefir, frozen berries, fresh strawberries, chia seeds, and ginger into blender.',
      'Blend on high for 60 seconds until completely velvety and vibrant pink-purple.',
      'Pour into a tall glass and enjoy immediately for optimal active probiotic benefit.'
    ],
    whyItHelps: 'Kefir rebalances gut microbiota affected by progesterone slow-down, eliminating sluggish digestion and abdominal distention.',
    nutrientHighlights: [
      { label: 'Probiotics', value: '12 Live Strains' },
      { label: 'Calcium', value: '350mg' },
      { label: 'Vitamin C', value: '45mg' }
    ]
  },
  {
    id: 'cauliflower-truffle-mac-cheese',
    title: 'Creamy Cauliflower & Cashew "Mac & Cheese"',
    subtitle: 'Ultra-comforting pasta swap that won\'t cause a heavy food coma',
    category: 'Comfort Food',
    targetPhases: ['Luteal', 'Menstrual'],
    targetCravings: ['Fast Food', 'Salty', 'Carbs'],
    targetSymptoms: ['Fatigue', 'Bloating', 'Mood Swings'],
    prepTimeMinutes: 25,
    calories: 380,
    imageUrl: 'https://images.pexels.com/photos/31336116/pexels-photo-31336116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tags: ['Low GI', 'B-Vitamins', 'Comfort Swap', 'Dairy-Free Friendly'],
    ingredients: [
      '2 cups steamed cauliflower florets',
      '1/2 cup raw cashews (soaked in warm water 15 min)',
      '3 tbsp nutritional yeast (cheesy B12 flavor)',
      '1/2 tsp garlic powder & onion powder',
      '1/2 cup vegetable broth',
      '1.5 cups chickpea or whole grain pasta',
      'Pinch of sea salt & black pepper'
    ],
    instructions: [
      'Cook pasta according to package instructions; drain and set aside.',
      'Blend steamed cauliflower, soaked cashews, nutritional yeast, garlic, onion powder, and broth until silky smooth.',
      'Pour cheesy sauce over warm pasta in a saucepan and stir over low heat for 2 minutes.',
      'Serve warm topped with cracked pepper and fresh parsley.'
    ],
    whyItHelps: 'Nutritional yeast delivers vital B-vitamins (B6, B12) that support neurotransmitters during PMS, while cauliflower lowers carb overload.',
    nutrientHighlights: [
      { label: 'Vitamin B12', value: '2.4mcg (100% DV)' },
      { label: 'Fiber', value: '9g' },
      { label: 'Protein', value: '16g' }
    ]
  }
];

export const PHASE_INFOS = {
  Menstrual: {
    name: 'Menstrual',
    dayRange: 'Days 1 – 5',
    color: '#E879F9',
    bgLight: 'bg-pink-100 text-pink-900 dark:text-pink-300',
    bgDark: 'dark:bg-pink-950/40',
    borderColor: 'border-pink-400 dark:border-pink-800',
    hormoneStatus: 'Estrogen & Progesterone at lowest levels',
    description: 'Your uterine lining is shedding. Rest, hydrate, and nourish with warm, iron-rich, and easy-to-digest foods.',
    nutritionFocus: ['Iron & Vitamin C pairing', 'Magnesium for cramps', 'Warm soups & stews', 'Anti-inflammatory teas'],
    recommendedFoods: ['Warm bone/veggie broth', 'Wild salmon', 'Dark cacao', 'Spinach & berries', 'Ginger tea'],
    foodsToLimit: ['Excess sodium', 'Refined sugar', 'Iced/cold drinks', 'High alcohol']
  },
  Follicular: {
    name: 'Follicular',
    dayRange: 'Days 6 – 13',
    color: '#818CF8',
    bgLight: 'bg-indigo-100 text-indigo-900 dark:text-indigo-300',
    bgDark: 'dark:bg-indigo-950/40',
    borderColor: 'border-indigo-400 dark:border-indigo-800',
    hormoneStatus: 'Estrogen gradually rising • Energy building',
    description: 'Follice stimulating hormone (FSH) matures follicles. Brain power and physical stamina climb!',
    nutritionFocus: ['Fermented gut foods', 'Fresh vibrant salads', 'Lean protein', 'Complex light grains'],
    recommendedFoods: ['Kimchi & kefir', 'Matcha chia bowls', 'Avocado', 'Sprouted quinoa', 'Broccoli sprouts'],
    foodsToLimit: ['Heavy greasy foods', 'Excess caffeine']
  },
  Ovulatory: {
    name: 'Ovulatory',
    dayRange: 'Days 14 – 16',
    color: '#34D399',
    bgLight: 'bg-emerald-100 text-emerald-900 dark:text-emerald-300',
    bgDark: 'dark:bg-emerald-950/40',
    borderColor: 'border-emerald-400 dark:border-emerald-800',
    hormoneStatus: 'Estrogen peaks • Testosterone surge • High energy',
    description: 'An egg is released. Energy, social drive, and metabolism are at their absolute monthly peak.',
    nutritionFocus: ['Antioxidant-rich berries', 'Raw crisp vegetables', 'Fiber for estrogen detox', 'Hydrating fruits'],
    recommendedFoods: ['Watermelon & cucumber', 'Fresh berries', 'Cruciferous veggies', 'Flaxseeds', 'Edamame'],
    foodsToLimit: ['Heavy fried foods', 'Processed sodium']
  },
  Luteal: {
    name: 'Luteal',
    dayRange: 'Days 17 – 28',
    color: '#F59E0B',
    bgLight: 'bg-amber-100 text-amber-900 dark:text-amber-300',
    bgDark: 'dark:bg-amber-950/40',
    borderColor: 'border-amber-400 dark:border-amber-800',
    hormoneStatus: 'Progesterone peaks then drops • PMS window',
    description: 'Metabolism speeds up by ~100-300 calories. Cravings for carbs, chocolate, and comfort foods rise.',
    nutritionFocus: ['Vitamin B6 for mood', 'Magnesium for cravings', 'Slow complex carbs', 'Potassium for bloating'],
    recommendedFoods: ['Baked sweet potato', 'Dark chocolate mousse', 'Turmeric golden milk', 'Tahini & seeds', 'Roasted chickpeas'],
    foodsToLimit: ['White sugar spikes', 'Excess salt', 'Late night caffeine']
  }
} as const;
