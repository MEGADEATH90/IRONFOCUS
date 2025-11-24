# IRONFOCUS

A premium, mobile‑first todo / mission tracker built with **React**, **Vite**, **Tailwind CSS**, **Supabase** for authentication & data, and **Framer Motion** for smooth animations.

## Features
- Sign‑up / login via Supabase.
- Add missions with categories (Work, Gym, Life).
- Mark missions as completed; timestamps are stored.
- Filter completed missions by date using a calendar icon.
- Progress bar visualising completed vs total missions.
- Responsive design – works on desktop, tablet, and mobile.
- Deployed on Vercel (continuous deployment from GitHub).

## Getting Started
### Prerequisites
- **Node.js** (v18+ recommended)
- **Git**
- A **Supabase** project with a `todos` table (see `setup_database.sql`).

### Installation
```bash
# Clone the repo
git clone https://github.com/MEGADEATH90/IRONFOCUS.git
cd IRONFOCUS

# Install dependencies
npm install
```

### Environment Variables
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Development
```bash
npm run dev
```
Open <http://localhost:5173> in your browser.

### Build & Deploy
```bash
npm run build   # creates a production bundle in /dist
npx vercel --prod   # deploys to Vercel (requires Vercel CLI login)
```

## Usage
1. **Sign up / log in**.
2. Enter a mission in the **Next Mission…** field, select a category, and press the **+** button.
3. Toggle a mission to mark it completed – it moves to the **Completed Missions** section.
4. Use the **calendar icon** next to the date filter to view completed missions for a specific day.
5. Click **Logout** to end the session.

## Contributing
Feel free to open issues or submit pull requests. Follow the existing code style (Prettier + ESLint) and run `npm run lint` before committing.

---
© 2025 IRONFOCUS – built with love and discipline.
