# PrepEasy 🍳

**Easy Recipe & Weekly Meal Planner for Students**

PrepEasy helps university and high school students discover budget-friendly, quick recipes, plan their weekly meals, and save their own custom dishes — all in one place.

🔗 **Live demo:** [prep-easy-beta.vercel.app](https://prep-easy-beta.vercel.app/)

---

## Features

- **Browse & Search Recipes** — filter by prep time, budget, and dietary tags (Vegan, Vegetarian, High Protein, Gluten-Free, and more)
- **Favorites** — save recipes you love for quick access later
- **Weekly Meal Planner** — a 7-day × 3-meal grid to plan breakfast, lunch, and dinner
- **Custom Recipes** — sign up, submit your own recipes, and manage them in "My Recipes"
- **Guest Mode** — try the app instantly without creating an account (runs on local storage)
- **Authentication** — email/password sign-up and login via Supabase Auth

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend / Database / Auth | Supabase (Postgres + Auth) |
| Hosting | Vercel |

## Data Model

Three core tables in Supabase, secured with Row Level Security (RLS):

- **`recipes`** — library and user-submitted recipes (`owner_id` + `is_user_submitted` distinguishes ownership)
- **`favorites`** — join table linking users to their favorited recipes
- **`meal_plan_entries`** — one row per user, per day, per meal slot

RLS policies ensure users can only read/write their own favorites, meal plans, and submitted recipes, while the recipe library remains publicly readable.

## Running Locally

1. Clone the repo:
   ```
   git clone https://github.com/heruni99/PrepEasy.git
   cd PrepEasy
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root with your own Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   (Without a `.env` file, the app falls back to a local-storage-only demo mode — no setup required to try it out.)

4. Run the schema and seed recipes in your Supabase project's SQL Editor:
   - First run [`supabase/schema.sql`](./supabase/schema.sql) to create the tables and RLS policies.
   - Then run [`supabase/seed.sql`](./supabase/seed.sql) to populate the 22 seed recipes into the database.

5. Start the dev server:
   ```
   npm run dev
   ```

## Roadmap / Stretch Goals

- Auto-generated shopping list from the week's meal plan
- Nutrition estimates via a free API
- Public recipe sharing between users
- Drag-and-drop meal planner
- Dark mode

---

Built as a portfolio project to demonstrate full-stack fundamentals: authentication, relational data modeling, Row Level Security, and deployment.