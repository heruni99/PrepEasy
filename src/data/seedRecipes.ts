import type { Recipe } from '../types';

export const SEED_RECIPES: Recipe[] = [
  {
    id: 'seed-1',
    title: '10-Minute Peanut Butter Chili Oil Noodles',
    prep_time_minutes: 10,
    cost_level: 1,
    diet_tags: ['Vegan', 'Quick (<15m)', 'Budget', 'One-Pot'],
    image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 pack instant ramen noodles (discard or save flavor packet)',
      '1.5 tbsp creamy peanut butter',
      '1 tbsp soy sauce',
      '1 tbsp chili crisp / chili oil',
      '1 tsp sesame oil',
      '1 clove minced garlic',
      '1 chopped green onion',
      '2 tbsp hot noodle boiling water'
    ],
    steps: [
      'Boil ramen noodles in water for 3 minutes until tender.',
      'In a bowl, mix peanut butter, soy sauce, chili oil, sesame oil, and minced garlic.',
      'Ladle 2 tablespoons of hot noodle cooking water into the bowl and whisk until smooth and creamy.',
      'Drain noodles and toss into the sauce until well coated.',
      'Garnish with chopped green onions and extra chili crisp before serving!'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-2',
    title: '5-Minute Microwave Egg Fried Rice',
    prep_time_minutes: 5,
    cost_level: 1,
    diet_tags: ['Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 cup leftover cold cooked white rice (or microwavable rice pouch)',
      '1 large egg',
      '2 tbsp frozen peas and carrots',
      '1 tbsp soy sauce',
      '1 tsp sesame oil',
      '1 green onion, chopped',
      'Pinch of garlic powder'
    ],
    steps: [
      'Place cold rice and frozen veggies in a large microwave-safe mug or bowl.',
      'Cover with a damp paper towel and microwave on high for 1 minute.',
      'Crack egg directly into the rice, add soy sauce, sesame oil, and garlic powder. Beat vigorously with a fork to combine.',
      'Microwave covered for another 60 to 90 seconds until the egg is cooked through.',
      'Fluff with a fork, top with chopped green onion, and enjoy hot!'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-3',
    title: 'Sheet Pan Crispy Chickpea & Sweet Potato Bowls',
    prep_time_minutes: 25,
    cost_level: 1,
    diet_tags: ['Vegan', 'Gluten-Free', 'Meal Prep', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 can (15 oz) chickpeas, rinsed and dried',
      '1 medium sweet potato, cubed',
      '1 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp cumin powder',
      '1/2 tsp garlic powder',
      'Salt and black pepper to taste',
      '2 cups fresh baby spinach or kale',
      'Drizzle of tahini or Greek yogurt dressing'
    ],
    steps: [
      'Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.',
      'Toss dried chickpeas and cubed sweet potatoes with olive oil, paprika, cumin, garlic powder, salt, and pepper.',
      'Spread evenly on sheet pan and roast for 20-25 minutes until chickpeas are crispy and sweet potatoes are tender.',
      'Assemble bowls with spinach at the base, topped with roasted sweet potatoes and chickpeas.',
      'Drizzle generously with tahini sauce or yogurt dressing.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-4',
    title: 'Loaded Black Bean & Cheese Quesadilla',
    prep_time_minutes: 12,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '2 large flour tortillas',
      '1/2 cup canned black beans, rinsed and drained',
      '1/2 cup shredded Mexican blend cheese or Cheddar',
      '2 tbsp salsa or pico de gallo',
      '1/4 cup canned corn kernels',
      '1/2 tsp cumin',
      'Butter or oil for pan skillet'
    ],
    steps: [
      'In a small bowl, lightly mash black beans with corn, salsa, and cumin.',
      'Heat a skillet over medium heat and melt a small pat of butter.',
      'Place one tortilla in skillet, sprinkle half the cheese, spread the black bean mixture evenly, then top with remaining cheese and second tortilla.',
      'Cook for 3-4 minutes until golden brown on the bottom, carefully flip and cook another 3 minutes.',
      'Slice into quarters and serve with sour cream or guacamole.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-5',
    title: 'One-Pot Creamy Tomato & Spinach Pasta',
    prep_time_minutes: 18,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'One-Pot', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281895?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '8 oz (225g) penne or fusilli pasta',
      '1 can (14 oz) diced tomatoes',
      '2 cups vegetable broth or water',
      '2 cloves garlic, minced',
      '1/4 cup heavy cream or cream cheese',
      '2 cups fresh baby spinach',
      '1/4 cup grated Parmesan cheese',
      '1 tsp Italian seasoning',
      'Salt & red pepper flakes to taste'
    ],
    steps: [
      'In a pot, combine dry pasta, diced tomatoes (with juice), garlic, Italian seasoning, and vegetable broth.',
      'Bring to a boil, then reduce heat to medium-low. Cover and simmer for 10-12 minutes, stirring occasionally, until pasta is cooked.',
      'Stir in heavy cream and fresh spinach. Cook for 2 minutes until spinach wilts.',
      'Remove from heat, fold in grated Parmesan cheese, and season with salt and red pepper flakes.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-6',
    title: 'Avocado Toast with Crispy Fried Egg & Chili Flakes',
    prep_time_minutes: 8,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '2 slices whole wheat sourdough or rye bread',
      '1 ripe avocado',
      '2 large eggs',
      '1 tbsp olive oil',
      '1 tsp lemon juice',
      'Salt, black pepper, and red pepper flakes',
      'Optional: Everything Bagel Seasoning'
    ],
    steps: [
      'Toast bread slices until golden brown.',
      'In a small bowl, mash ripe avocado with lemon juice, salt, and black pepper.',
      'Heat olive oil in a skillet over medium-high heat. Crack eggs into the hot skillet and fry until edges are crispy and yolk is cooked to preference.',
      'Spread avocado mash thickly over toast slices.',
      'Top each slice with a fried egg, sprinkle with red pepper flakes and Everything Bagel Seasoning.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-7',
    title: 'High-Protein Greek Yogurt Parfait Bowl',
    prep_time_minutes: 5,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'High Protein', 'Gluten-Free'],
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 cup plain 0% or 2% Greek Yogurt',
      '1/2 cup crunchy granola',
      '1/2 cup mixed berries (fresh or thawed frozen blueberries/strawberries)',
      '1 tbsp chia seeds or flaxseed meal',
      '1 tbsp honey or maple syrup',
      '1 tbsp almond butter or peanut butter'
    ],
    steps: [
      'Spoon Greek yogurt into a clean bowl or glass mason jar.',
      'Layer fresh berries and crunchy granola over the yogurt.',
      'Drizzle warm honey and creamy almond butter over top.',
      'Finish with a sprinkle of chia seeds for extra fiber and protein.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-8',
    title: '5-Minute Chocolate Chip Mug Cake',
    prep_time_minutes: 3,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '3 tbsp all-purpose flour',
      '1.5 tbsp sugar',
      '1/2 tsp baking powder',
      '3 tbsp milk (dairy or plant-based)',
      '1 tbsp melted butter or vegetable oil',
      '1/2 tsp vanilla extract',
      '1.5 tbsp semi-sweet chocolate chips'
    ],
    steps: [
      'In a microwave-safe mug, whisk together flour, sugar, and baking powder.',
      'Add milk, melted butter, and vanilla extract. Stir with a fork until a smooth batter forms.',
      'Fold in chocolate chips, dropping a few extra on top.',
      'Microwave on high for 60 to 70 seconds. Let cool for 1 minute before digging in with a spoon!'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-9',
    title: 'Garlic Butter Chicken Thighs & Broccoli',
    prep_time_minutes: 20,
    cost_level: 2,
    diet_tags: ['High Protein', 'Gluten-Free', 'One-Pot', 'Halal'],
    image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 lb (450g) boneless, skinless chicken thighs',
      '2 cups broccoli florets',
      '2 tbsp butter',
      '1 tbsp olive oil',
      '3 cloves garlic, minced',
      '1/2 tsp paprika',
      '1/2 tsp dried oregano',
      'Salt and fresh ground black pepper',
      'Lemon wedges for serving'
    ],
    steps: [
      'Season chicken thighs generously with salt, pepper, paprika, and oregano.',
      'Heat olive oil and 1 tbsp butter in a skillet over medium-high heat. Add chicken and sear for 5-6 minutes per side until golden brown and cooked through (165°F). Remove chicken.',
      'In the same skillet, add remaining butter, minced garlic, and broccoli florets. Sauté for 4-5 minutes until broccoli is vibrant green and tender-crisp.',
      'Return chicken thighs to skillet, spoon garlic butter sauce over top, and serve with fresh lemon squeeze.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-10',
    title: 'Classic Tuna Melt Sandwich',
    prep_time_minutes: 10,
    cost_level: 1,
    diet_tags: ['Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 can (5 oz) canned tuna in water, drained',
      '2 tbsp mayonnaise or Greek yogurt',
      '1 tbsp finely chopped celery or red onion',
      '1 tsp Dijon mustard',
      '2 slices sourdough or sandwich bread',
      '2 slices Cheddar or Swiss cheese',
      '1 tbsp butter'
    ],
    steps: [
      'In a bowl, mix drained tuna, mayo, celery, mustard, salt, and pepper.',
      'Butter one side of each slice of bread.',
      'Place one slice butter-side down in a medium skillet. Top with one slice of cheese, the tuna salad mixture, second cheese slice, and top bread slice butter-side up.',
      'Grill on medium heat for 3-4 minutes per side until bread is golden crispy and cheese is completely melted.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-11',
    title: 'Cheesy Garlic Bread Toast',
    prep_time_minutes: 10,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '4 slices baguette or thick bread',
      '2 tbsp softened butter',
      '2 cloves garlic, finely minced',
      '1/2 cup shredded mozzarella cheese',
      '1 tbsp fresh parsley or dried oregano'
    ],
    steps: [
      'Mix softened butter, minced garlic, and parsley together in a bowl.',
      'Spread butter mixture generously over bread slices.',
      'Top each slice with shredded mozzarella.',
      'Bake in toaster oven or main oven at 400°F (200°C) for 7-10 minutes until cheese is bubbly and edges are toasted golden.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-12',
    title: 'Savory Tofu & Veggie Stir-Fry',
    prep_time_minutes: 20,
    cost_level: 1,
    diet_tags: ['Vegan', 'High Protein', 'Gluten-Free', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 block (14 oz) firm tofu, pressed and cubed',
      '1 cup bell peppers, sliced',
      '1 cup broccoli florets',
      '1 tbsp vegetable oil',
      '2 tbsp cornstarch',
      'Sauce: 2 tbsp soy sauce (or tamari), 1 tbsp maple syrup, 1 tsp sesame oil, 1 tsp minced ginger, 1 tsp cornstarch'
    ],
    steps: [
      'Toss cubed tofu with 2 tbsp cornstarch until lightly coated.',
      'Heat oil in a wok or large skillet over high heat. Fry tofu cubes for 6-8 minutes until golden crisp on all sides. Remove tofu.',
      'In the same skillet, stir-fry bell peppers and broccoli for 3-4 minutes.',
      'Whisk sauce ingredients together, pour into skillet with veggies and crispy tofu. Stir for 1-2 minutes until sauce thickens to a glossy glaze.',
      'Serve hot over steamed Jasmine rice.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-13',
    title: 'Hearty 1-Pot Lentil & Tomato Soup',
    prep_time_minutes: 25,
    cost_level: 1,
    diet_tags: ['Vegan', 'Meal Prep', 'Budget', 'One-Pot', 'Gluten-Free'],
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 cup dry brown or green lentils, rinsed',
      '1 can (14 oz) crushed tomatoes',
      '4 cups vegetable broth',
      '1 onion, chopped',
      '2 cloves garlic, minced',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '1 tbsp olive oil'
    ],
    steps: [
      'Heat olive oil in a soup pot over medium heat. Sauté onion and garlic for 3 minutes.',
      'Add dry lentils, crushed tomatoes, vegetable broth, cumin, and paprika.',
      'Bring to a boil, then cover pot and turn heat down to low.',
      'Simmer for 20 minutes until lentils are soft and tender.',
      'Season with salt, pepper, and lemon juice. Perfect for meal prep containers!'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-14',
    title: 'Quick Chicken Fajita Wrap',
    prep_time_minutes: 15,
    cost_level: 2,
    diet_tags: ['High Protein', 'Quick (<15m)', 'Halal'],
    image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 cup cooked shredded chicken breast',
      '1 bell pepper, thinly sliced',
      '1/2 red onion, thinly sliced',
      '1 tsp fajita seasoning',
      '2 large flour tortillas',
      '1/4 cup shredded cheese',
      '2 tbsp sour cream or salsa'
    ],
    steps: [
      'Sauté bell pepper and red onion in a skillet with a dash of oil and fajita seasoning for 4 minutes.',
      'Toss in cooked chicken breast to heat through.',
      'Warm flour tortillas in microwave for 15 seconds.',
      'Divide chicken and veggie mixture into tortillas, top with shredded cheese and sour cream, then roll tightly into wraps.'
    ],
    is_user_submitted: false
  },
  {
    id: 'seed-15',
    title: 'Easy Overnight Chia & Oats Jars',
    prep_time_minutes: 5,
    cost_level: 1,
    diet_tags: ['Vegan', 'Quick (<15m)', 'Meal Prep', 'Gluten-Free', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1/2 cup rolled oats',
      '1 tbsp chia seeds',
      '3/4 cup almond milk or oat milk',
      '1 tbsp maple syrup',
      '1/2 tsp cinnamon',
      '1/4 cup chopped banana or berries'
    ],
    steps: [
      'In a glass jar or tupperware container, combine rolled oats, chia seeds, milk, maple syrup, and cinnamon.',
      'Stir thoroughly, seal lid, and refrigerate overnight (or at least 3 hours).',
      'In the morning, give it a stir, top with sliced bananas or berries, and eat on the go!'
    ],
    is_user_submitted: false
  }
];
