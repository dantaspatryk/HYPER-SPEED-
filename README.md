# HYPER SPEED - Supabase React Frontend (Starter)

This is a starter frontend integrated with Supabase for the HYPER SPEED app.
It includes authentication, storage upload patterns, realtime listeners, feed, posts, profile and chat skeletons.

## Setup

1. Copy `.env.example` to `.env` and replace the values with your Supabase project info.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173

## Notes
- This is a starter scaffold. It expects Supabase tables / storage buckets to exist:
  - `users` (handled by Supabase Auth + profile row)
  - `posts` table (id, author, title, content, image_url, created_at, likes_count)
  - `comments` table (id, post_id, author, text, created_at)
  - `messages` table (id, sender, receiver, text, created_at)
- You'll need to create Supabase policies for secure access and RLS.
- See `src/services/supabaseClient.js` and components for usage examples.
