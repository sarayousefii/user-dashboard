# User Dashboard

**A modern user management dashboard built with Next.js and TailwindCSS, featuring role-based access control, responsive design, and mock backend support. The project includes authentication via NextAuth, reusable UI components, and JSON Server for user data.**

---

## Features

* Authentication with NextAuth.js  
* Role-based access control (Admin / Regular User)  
* View, edit, and delete users (Admin only)  
* Responsive UI for desktop and mobile  
* Reusable UI components: Card, Button, Table, Form, Modal  
* Paginated and sortable users table  
* Form validation with React Hook Form and Zod  
* Mock backend with JSON Server  
* TailwindCSS for styling  
* Animated UI interactions  

---

## Technologies / Stack

* **Frontend:** Next.js 14, React 19, TypeScript, TailwindCSS  
* **Authentication:** NextAuth.js  
* **Mock Backend:** JSON Server  
* **Form Handling & Validation:** React Hook Form, Zod  
* **UI Components:** Radix UI, Lucide React  
* **Utilities:** clsx, class-variance-authority, tailwind-merge, react-hot-toast  
* **Dev Tools:** ESLint, Concurrently, ts-node  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sarayousefii/user-dashboard.git


2. Navigate to the project folder:

```bash
cd user-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```
6. Configure environment variables (.env):

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

```
JSON server will run on http://localhost:5000

Next.js frontend will run on http://localhost:3000
```
## Deployment

The project can be deployed on any Node.js hosting service.
For local development, use npm run dev to run both frontend and JSON server concurrently.

## Live Demo

🎯 **Check out the live version:**

## Scripts

npm run server       # Start JSON Server only
npm run frontend     # Start Next.js frontend only
npm run dev          # Run both server and frontend concurrently
npm run build        # Build Next.js production version
npm run start        # Start Next.js production server
npm run lint         # Run ESLint


## License

This project is open-source and free to use.
