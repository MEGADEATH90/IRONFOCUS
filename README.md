# IRONFOCUS

A **premium**, mobile‑first todo / mission tracker built with **React**, **Vite**, **Tailwind CSS**, **Supabase** for authentication & data, and **Framer Motion** for smooth animations.

## ✨ Features
- 🔐 **Secure Authentication** – Sign‑up / login via Supabase
- 📋 **Smart Categorization** – Organize missions by Work, Gym, or Life
- ⏱️ **Completion Tracking** – Timestamps stored for every completed mission
- 📅 **Date Filtering** – View completed missions for specific dates using calendar picker
- 📊 **Circular Progress** – Beautiful visual progress indicator
- 🎨 **Dark/Light Mode** – Toggle between themes with persistent preference
- ✨ **Glassmorphism UI** – Modern, premium design with blur effects
- 🎉 **Confetti Celebrations** – Rewarding animations when completing missions
- 🌌 **Particle Background** – Dynamic, interactive particle canvas
- 📱 **Fully Responsive** – Works seamlessly on desktop, tablet, and mobile
- 🚀 **Deployed on Vercel** – Continuous deployment from GitHub

## 🎯 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Auth)
- **Animations**: Framer Motion, Canvas Confetti
- **UI Libraries**: Heroicons, React Circular Progressbar, TSParticles
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **Git**
- A **Supabase** project with a `todos` table

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
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup
Run the SQL commands in `setup_database.sql` in your Supabase SQL editor to create the `todos` table with proper RLS policies.

### Development
```bash
npm run dev
```
Open <http://localhost:5173> in your browser.

### Build & Deploy
```bash
npm run build              # creates production bundle in /dist
npx vercel --prod          # deploys to Vercel
```

## 📖 Usage
1. **Sign up / log in** with your email
2. Enter a mission in the **Next Mission…** field
3. Select a category (**Work**, **Gym**, or **Life**)
4. Press the **+** button to add
5. Click the checkbox to mark as completed (enjoy the confetti! 🎉)
6. Use the **calendar icon** to filter completed missions by date
7. Toggle **dark/light mode** in the top-right corner
8. Click **Logout** to end your session

## 🎨 UI Features
- **Circular Progress Bar** – Visual representation of completion rate
- **Glassmorphism Cards** – Semi-transparent, blurred containers
- **Particle Background** – Interactive particle canvas with hover effects
- **Confetti Animation** – Celebration burst when completing missions
- **Smooth Transitions** – Framer Motion animations throughout
- **Premium Typography** – Inter font family for clean, modern look

## 🤝 Contributing
Feel free to open issues or submit pull requests. Follow the existing code style and run `npm run lint` before committing.

## 📄 License
© 2025 IRONFOCUS – Built with discipline and determination.

---

**Live Demo**: [https://ironfocus-f6c7ynl1v-kaibalyapreetambalrj-2327s-projects.vercel.app](https://ironfocus-f6c7ynl1v-kaibalyapreetambalrj-2327s-projects.vercel.app)
