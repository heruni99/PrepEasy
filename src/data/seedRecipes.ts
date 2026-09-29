import type { Recipe } from '../types';

// Deterministic UUIDs for seed recipes — never change these after seeding Supabase,
// so that favorites / meal-plan FK references stay valid forever.
export const SEED_RECIPES: Recipe[] = [
  {
    id: 'a1b2c3d4-0001-4000-8000-000000000001',
    title: '10-Minute Peanut Butter Chili Oil Noodles',
    prep_time_minutes: 10,
    cost_level: 1,
    diet_tags: ['Vegan', 'Quick (<15m)', 'Budget', 'One-Pot'],
    image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 pack instant noodles (e.g. Maggi or Prima, discard/save seasoning sachet)',
      '1.5 tbsp creamy peanut butter',
      '1 tbsp dark soy sauce',
      '1 tbsp chili oil / chili paste (kochchi / chili flakes in oil)',
      '1 tsp sesame oil or coconut oil',
      '2 cloves garlic, finely minced',
      '2 tbsp spring onions or leeks, thinly sliced',
      '2 tbsp hot noodle water'
    ],
    steps: [
      'Boil instant noodles in boiling water for 3 minutes until tender.',
      'In a heatproof bowl, mix peanut butter, soy sauce, chili oil, sesame oil, and minced garlic.',
      'Ladle 2 tablespoons of hot starchy noodle boiling water into the bowl and whisk vigorously until smooth and creamy.',
      'Drain cooked noodles and toss directly into the sauce until glossy and well coated.',
      'Garnish with sliced spring onions or leeks and extra chili flakes before serving hot!'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0002-4000-8000-000000000002',
    title: '5-Minute Microwave Egg Fried Rice',
    prep_time_minutes: 5,
    cost_level: 1,
    diet_tags: ['Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 cup leftover cold cooked white rice (samba, keeri samba, or basmati)',
      '1 large fresh egg',
      '2 tbsp finely diced carrots and leeks',
      '1 tbsp soy sauce',
      '1 tsp sesame oil or melted butter',
      '1 sprig spring onion or leek greens, chopped',
      '1/4 tsp crushed black pepper & pinch of salt'
    ],
    steps: [
      'Place cold cooked rice and diced veggies into a large microwave-safe mug or bowl.',
      'Cover with a damp paper towel or microwave lid and heat on high for 1 minute.',
      'Crack the egg directly into the hot rice, add soy sauce, sesame oil, salt, and black pepper. Beat briskly with a fork to combine thoroughly.',
      'Microwave covered for another 60 to 80 seconds until the egg is fluffy and set.',
      'Fluff with a fork, top with fresh spring onions or leeks, and enjoy immediately.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0003-4000-8000-000000000003',
    title: 'Crispy Tempered Chickpea & Sweet Potato Bowl',
    prep_time_minutes: 25,
    cost_level: 1,
    diet_tags: ['Vegan', 'Gluten-Free', 'Meal Prep', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 can (400g) chickpeas (kadala), rinsed and dried (or 1.5 cups boiled kadala)',
      '1 medium sweet potato (bathala), peeled and cubed',
      '1.5 tbsp coconut oil or vegetable oil',
      '1 tsp red chili powder or chili flakes (kochu kudu)',
      '1 tsp roasted Sri Lankan curry powder or cumin powder',
      '1/2 tsp turmeric powder (kaha kudu)',
      '1 sprig fresh curry leaves (karapincha)',
      'Salt and black pepper to taste',
      '2 cups fresh gotukola, kankun, or baby spinach leaves',
      '2 tbsp thick buffalo curd (meekiri) or lime-tahini dressing'
    ],
    steps: [
      'Preheat oven to 200°C (400°F) or prepare a large heavy skillet/thachchiya on the stovetop.',
      'Toss chickpeas and cubed sweet potatoes with coconut oil, chili powder, curry powder, turmeric, curry leaves, salt, and pepper.',
      'Roast on a lined baking tray for 22-25 minutes (or pan-fry on medium-high for 12-15 minutes until crispy and golden).',
      'Assemble meal bowl with shredded gotukola, kankun, or spinach leaves at the base, topped with warm spiced sweet potatoes and chickpeas.',
      'Drizzle with thick curd or fresh lime dressing before digging in.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0004-4000-8000-000000000004',
    title: 'Loaded Spiced Kidney Bean & Cheese Quesadilla',
    prep_time_minutes: 12,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '2 medium flour tortillas (or flat parathas / godamba rotis)',
      '1/2 cup cooked red kidney beans (rajma) or black beans, lightly mashed',
      '1/2 cup shredded Cheddar or processed cheese (e.g. Happy Cow)',
      '2 tbsp fresh tomato-onion salsa (chopped tomato, onion, green chili & lime)',
      '1/4 cup sweet corn kernels',
      '1/2 tsp cumin powder & pinch of chili flakes',
      '1 tbsp butter or oil for the pan skillet'
    ],
    steps: [
      'In a bowl, lightly mash the cooked beans with corn, salsa, cumin powder, and chili flakes.',
      'Heat a flat frying pan (thawa) over medium heat and melt a knob of butter.',
      'Place one tortilla or flat roti on the pan, sprinkle half the cheese, spread the bean mixture evenly, then top with remaining cheese and the second tortilla.',
      'Toast for 3-4 minutes until golden crisp underneath, carefully flip with a spatula, and cook another 3 minutes.',
      'Cut into wedges and serve with yogurt dip, chili sauce, or tomato salsa.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0005-4000-8000-000000000005',
    title: 'One-Pot Creamy Coconut Tomato & Spinach Pasta',
    prep_time_minutes: 18,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'One-Pot', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281895?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '225g (half packet) penne, macaroni, or spiral/fusilli pasta',
      '1 can (400g) diced tomatoes (or 3 ripe fresh tomatoes, finely chopped)',
      '2 cups water (or 1 vegetable soup cube dissolved in 2 cups warm water)',
      '3 cloves garlic, finely minced',
      '1/3 cup thick coconut milk (first extract / pol kiri) or dairy cooking cream',
      '2 cups fresh spinach, kankun, or gotukola, washed and shredded',
      '3 tbsp grated Cheddar or Parmesan cheese',
      '1 tsp dried oregano or Italian seasoning',
      'Salt, black pepper, and crushed red chili flakes to taste'
    ],
    steps: [
      'In a medium saucepan, combine dry pasta, chopped tomatoes with juices, minced garlic, oregano, and water/broth.',
      'Bring to a rolling boil over high heat, then lower heat to medium. Cover and simmer for 10-12 minutes, stirring occasionally so pasta does not stick.',
      'Pour in the thick coconut milk (pol kiri) and fold in fresh chopped greens. Simmer for 2 minutes until greens wilt and sauce turns rich and velvety.',
      'Turn off heat, stir in grated cheese, season with salt, black pepper, and chili flakes, and serve immediately.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0006-4000-8000-000000000006',
    title: 'Avocado Toast with Crispy Fried Egg & Chili Flakes',
    prep_time_minutes: 8,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '2 thick slices fresh bakery bread (kade paan, sandwich bread, or roast paan)',
      '1 ripe local butter fruit (avocado)',
      '2 large fresh eggs',
      '1 tbsp coconut oil or butter',
      '1 tsp fresh lime juice',
      'Salt, freshly cracked black pepper, and crushed red chili flakes (kochu kudu)'
    ],
    steps: [
      'Toast bread slices in a toaster or on a hot dry pan until golden brown and crispy.',
      'Cut ripe avocado in half, scoop the flesh into a bowl, and mash with fresh lime juice, salt, and black pepper.',
      'Heat oil or butter in a frying pan over medium-high heat. Crack the eggs in and fry until edges are crispy and lacy with yolks cooked to your liking.',
      'Spread the seasoned avocado generously across both slices of warm toast.',
      'Crown each slice with a crispy fried egg, sprinkle generously with crushed chili flakes and black pepper, and enjoy.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0007-4000-8000-000000000007',
    title: 'High-Protein Buffalo Curd & Kithul Parfait Bowl',
    prep_time_minutes: 5,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'High Protein', 'Gluten-Free'],
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 cup thick buffalo curd (meekiri) or plain set Greek-style yogurt',
      '1/2 cup crunchy toasted granola (or dry-roasted rolled oats with chopped cashews)',
      '1 ripe banana (kolikuttu / ambul) or ripe papaya slices',
      '1 tbsp chia seeds or toasted sesame seeds',
      '1.5 tbsp pure kithul treacle (kithul pani) or bee honey',
      '1 tbsp creamy peanut butter'
    ],
    steps: [
      'Spoon thick buffalo curd into a wide breakfast bowl or mason jar.',
      'Layer sliced bananas or fresh tropical fruits over the curd.',
      'Scatter crunchy granola or roasted oats and cashews on top for texture.',
      'Warm the peanut butter slightly and drizzle together with pure kithul treacle.',
      'Sprinkle with chia seeds or sesame seeds for an extra boost of fiber and omega-3.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0008-4000-8000-000000000008',
    title: '3-Minute Chocolate Chip Microwave Mug Cake',
    prep_time_minutes: 3,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '3 tbsp all-purpose wheat flour (maida)',
      '1.5 tbsp white or brown sugar',
      '1/2 tsp baking powder',
      '3 tbsp fresh liquid milk (Highland, Pelwatte, or coconut milk)',
      '1 tbsp melted butter or refined coconut oil',
      '1/2 tsp vanilla essence',
      '1.5 tbsp chocolate chips (or chopped local Kandos / cooking chocolate)'
    ],
    steps: [
      'In a microwave-safe ceramic coffee mug, combine flour, sugar, and baking powder using a fork.',
      'Add liquid milk, melted butter/oil, and vanilla essence. Stir briskly until a lump-free, silky batter forms.',
      'Fold in most of the chopped chocolate pieces, dropping a few extra on top of the batter.',
      'Microwave on high power for 60 to 70 seconds. The cake will rise and dome nicely.',
      'Let cool for 1 minute before digging into the warm, gooey molten chocolate sponge.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0009-4000-8000-000000000009',
    title: 'Garlic Butter Chicken Bites & Sautéed Veggies',
    prep_time_minutes: 20,
    cost_level: 2,
    diet_tags: ['High Protein', 'Gluten-Free', 'One-Pot', 'Halal'],
    image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '450g boneless chicken thigh or breast fillets, cut into bite-sized cubes',
      '2 cups broccoli florets, yardlong beans (ma karal), or capsicum chunks',
      '2 tbsp butter',
      '1 tbsp vegetable oil',
      '4 cloves garlic, finely minced',
      '1/2 tsp chili powder or paprika',
      '1/2 tsp black pepper and salt to taste',
      'Fresh lime wedge for serving'
    ],
    steps: [
      'Season cubed chicken pieces with salt, black pepper, and chili powder.',
      'Heat oil and 1 tablespoon of butter in a frying pan over medium-high heat. Add chicken pieces and sear for 5-6 minutes until golden brown on all sides and thoroughly cooked. Transfer chicken to a plate.',
      'In the same buttery pan, add remaining butter, minced garlic, and vegetables. Sauté for 3-4 minutes until tender-crisp and aromatic.',
      'Return chicken to the pan, toss well with garlic butter pan juices, squeeze fresh lime juice over top, and serve warm.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0010-4000-8000-000000000010',
    title: 'Sri Lankan Spiced Tuna Melt Sandwich',
    prep_time_minutes: 10,
    cost_level: 1,
    diet_tags: ['Quick (<15m)', 'Budget', 'High Protein'],
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 can (160g) canned tuna in brine (e.g. Oceanpick or local tuna), drained',
      '2 tbsp mayonnaise or thick plain curd',
      '2 tbsp finely chopped red onions (rathu lunu)',
      '1 green chili (amu miris), deseeded and finely chopped',
      '1/4 tsp crushed black pepper & squeeze of fresh lime',
      '4 slices bakery white bread or roast paan',
      '2 slices cheese (processed slice or Cheddar)',
      '1 tbsp butter for pan-toasting'
    ],
    steps: [
      'In a bowl, flake the drained tuna with a fork. Add mayonnaise or curd, chopped red onion, green chili, black pepper, lime juice, and a pinch of salt. Mix thoroughly.',
      'Butter one side of each slice of bread.',
      'Place one bread slice butter-side down in a hot pan. Add a slice of cheese, mound the spicy tuna mix on top, place second cheese slice, and top with the second bread slice butter-side up.',
      'Grill over medium heat for 3 minutes per side until the bread is crunchy golden and the cheese is fully melted.',
      'Cut diagonally and serve warm with chili sauce.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0011-4000-8000-000000000011',
    title: 'Crusty Cheesy Garlic Roast Paan Toast',
    prep_time_minutes: 10,
    cost_level: 1,
    diet_tags: ['Vegetarian', 'Quick (<15m)', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '4 thick slices crusty bakery bread (roast paan or kade paan)',
      '2.5 tbsp softened butter',
      '4 cloves garlic, crushed into paste',
      '1/2 cup grated mozzarella or Cheddar cheese',
      '1 sprig fresh curry leaves (karapincha), finely shredded (or dried oregano)',
      'Pinch of chili flakes (kochu kudu) & salt'
    ],
    steps: [
      'In a small bowl, mix softened butter, crushed garlic, shredded curry leaves, salt, and chili flakes into an aromatic spread.',
      'Spread the garlic butter thickly onto each slice of roast paan.',
      'Generously top each slice with grated cheese.',
      'Bake in a toaster oven at 200°C (400°F) for 7-8 minutes, or toast covered in a flat skillet on low heat until cheese is bubbling and bottom is extra crispy.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0012-4000-8000-000000000012',
    title: 'Crispy Tofu & Capsicum Stir-Fry',
    prep_time_minutes: 20,
    cost_level: 1,
    diet_tags: ['Vegan', 'High Protein', 'Gluten-Free', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 block (350g) firm white tofu, pressed dry with a paper towel and cubed',
      '2 capsicums (malu miris) or bell peppers, sliced into strips',
      '1 cup shredded cabbage, carrots, or leeks',
      '1.5 tbsp vegetable oil',
      '2 tbsp cornflour (cornstarch)',
      'Sauce: 2 tbsp soy sauce, 1 tbsp kithul treacle or brown sugar, 1 tsp coconut/sesame oil, 1 tsp grated ginger, 1 tsp cornflour dissolved in 3 tbsp water'
    ],
    steps: [
      'Toss cubed tofu with 2 tbsp cornflour until all pieces are lightly coated.',
      'Heat oil in a wok or deep skillet over high heat. Pan-fry tofu cubes for 6-8 minutes, turning often until golden and crispy. Remove tofu and set aside.',
      'In the same hot pan, stir-fry the capsicums and vegetables for 3 minutes until tender yet crunchy.',
      'Stir the sauce bowl, pour into the hot pan over veggies, and return crispy tofu. Toss continuously for 1-2 minutes until sauce turns into a glossy savory glaze.',
      'Serve steaming hot with boiled rice or noodles.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0013-4000-8000-000000000013',
    title: 'Hearty 1-Pot Mysore Dhal & Tomato Soup',
    prep_time_minutes: 25,
    cost_level: 1,
    diet_tags: ['Vegan', 'Meal Prep', 'Budget', 'One-Pot', 'Gluten-Free'],
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1 cup red split lentils (mysore dhal / paruppu), washed and drained',
      '2 ripe tomatoes, chopped (or 1 can 400g crushed tomatoes)',
      '3.5 cups water or vegetable stock',
      '1 medium red onion, finely chopped',
      '3 cloves garlic and 1/2-inch ginger, minced',
      '1 tsp cumin powder & 1 tsp unroasted curry powder',
      '1/2 tsp turmeric powder (kaha kudu)',
      '1 sprig fresh curry leaves (karapincha)',
      '1/2 cup thin coconut milk (pol kiri) for creaminess',
      '1 tbsp coconut oil or vegetable oil',
      'Salt, black pepper, and fresh lime juice'
    ],
    steps: [
      'Heat coconut oil in a medium soup pot over medium heat. Sauté chopped onion, garlic, ginger, and curry leaves for 2-3 minutes until fragrant.',
      'Add washed red dhal, chopped tomatoes, water/stock, cumin, curry powder, and turmeric.',
      'Bring to a boil, then cover with lid, reduce heat to low, and simmer for 18-20 minutes until dhal is completely soft and broken down.',
      'Pour in coconut milk, stir well, and simmer gently for 2 more minutes. Season with salt and squeeze fresh lime juice.',
      'Enjoy as a comforting wholesome soup, or ladle over warm rice.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0014-4000-8000-000000000014',
    title: 'Quick Spiced Chicken & Capsicum Roti Wrap',
    prep_time_minutes: 15,
    cost_level: 2,
    diet_tags: ['High Protein', 'Quick (<15m)', 'Halal'],
    image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1.5 cups cooked shredded chicken (boiled chicken breast or shredded curry chicken)',
      '1 large capsicum (malu miris) or bell pepper, cut into thin strips',
      '1 red onion, thinly sliced',
      '1 tsp roasted chili powder, cumin & black pepper mix',
      '2 large flour tortillas or godamba / paratha rotis',
      '1/4 cup shredded cheese or garlic mayonnaise/curd dressing',
      '1 tbsp vegetable oil for sautéing'
    ],
    steps: [
      'Heat oil in a skillet over high heat. Add sliced capsicum and red onions, sprinkle spice mix, and stir-fry for 3-4 minutes until aromatic and blistered.',
      'Add cooked shredded chicken and toss for 1-2 minutes until thoroughly heated.',
      'Warm the rotis or tortillas on a dry pan for 15 seconds per side until soft and pliable.',
      'Spoon spiced chicken and veggies into each roti, drizzle with garlic sauce or cheese, roll into snug wraps, and enjoy.'
    ],
    is_user_submitted: false
  },
  {
    id: 'a1b2c3d4-0015-4000-8000-000000000015',
    title: 'Ceylon Cinnamon & Kithul Overnight Oats',
    prep_time_minutes: 5,
    cost_level: 1,
    diet_tags: ['Vegan', 'Quick (<15m)', 'Meal Prep', 'Gluten-Free', 'Budget'],
    image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '1/2 cup rolled oats (e.g. Captain Oats or Quaker)',
      '1 tbsp chia seeds (or sabja / sweet basil seeds)',
      '3/4 cup fresh liquid milk (Highland, Kotmale, or coconut/soy milk)',
      '1.5 tbsp pure kithul treacle (kithul pani) or bee honey',
      '1/4 tsp true Ceylon cinnamon powder (kurundu kudu)',
      '1/3 cup sliced banana (ambul or kolikuttu) or fresh seasonal fruits'
    ],
    steps: [
      'In a clean glass jar or tupperware container, combine rolled oats, chia seeds, milk, kithul treacle, and Ceylon cinnamon.',
      'Stir well with a spoon, fasten lid tightly, and chill in the refrigerator overnight (or for at least 3 hours).',
      'In the morning, stir the creamy oats, top with sliced bananas or fresh fruit, and enjoy a nourishing grab-and-go breakfast!'
    ],
    is_user_submitted: false
  }
];
