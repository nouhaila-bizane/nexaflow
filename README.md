# NexaFlow

**NexaFlow** is a modern AI-powered workflow automation SaaS platform. This is a full-stack portfolio project demonstrating product design, React/TypeScript frontend, Node/Express API, MongoDB persistence, and JWT authentication.

> **Note:** This is a portfolio project. AI responses, payment processing, and third-party integrations are **simulated**. The architecture is structured so a real provider can be plugged in later.

## ✨ Features

### Marketing website
- Home, Features, Solutions, Pricing, About, Contact pages
- Responsive navigation, animated hero, workflow visualization
- FAQ, testimonials, pricing comparison, footer
- SEO meta tags, sitemap, robots.txt

### Authentication
- Register / Login / Logout
- bcrypt password hashing
- JWT with http-only-friendly storage pattern
- Protected dashboard routes
- Persistent sessions via `localStorage`

### Dashboard
- Overview with live stats, chart, recent activity, recent workflows
- Workflows: list, search, filter, create, edit, duplicate, toggle, delete
- Visual workflow builder with connected step cards
- AI Agents: CRUD with configuration (name, goal, instructions, tone, model)
- Integrations: 7 providers with simulated OAuth connect/disconnect
- Analytics: executions, success rate, time saved, activity chart, heatmap
- Team: members list, invite, remove, roles (owner/admin/member)
- Settings: profile, appearance (light/dark), password, notifications

### UX polish
- Loading skeletons, empty states, error states
- Toast notifications, confirmation modals
- Accessible focus states, semantic HTML, ARIA labels
- `prefers-reduced-motion` respected
- Fully responsive: 320px → 1440px+

## 🧰 Tech stack

| Layer      | Stack                                                           |
|------------|-----------------------------------------------------------------|
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, Lucide, Recharts |
| Backend    | Node.js, Express, TypeScript, express-validator                 |
| Database   | MongoDB, Mongoose                                               |
| Auth       | JWT (jsonwebtoken), bcryptjs                                    |
| Tooling    | npm, tsx (dev runner), dotenv                                   |

## 🏗 Architecture

```
nexaflow/
├── backend/           # Express + TypeScript API
│   └── src/
│       ├── config/    # env, db
│       ├── controllers/
│       ├── middleware/# auth, error, validate
│       ├── models/    # Mongoose schemas
│       ├── routes/
│       └── utils/     # jwt, password, seed
└── frontend/          # Vite + React + TS
    └── src/
        ├── components/
        │   ├── ui/        # Button, Input, Card, Modal, Badge, Toast, Skeleton, EmptyState
        │   ├── layout/    # MarketingLayout, DashboardLayout, Sidebar, TopNav
        │   └── marketing/ # Navbar, Footer, WorkflowVisual
        ├── contexts/  # AuthContext, ThemeContext
        ├── hooks/     # useAuth, useTheme
        ├── lib/       # api client, utils
        ├── pages/     # marketing/, auth/, dashboard/
        └── types/
```

## 🚀 Getting started

### Prerequisites
- Node.js 18+
- MongoDB running locally (default `mongodb://127.0.0.1:27017/nexaflow`) or a MongoDB Atlas URI

### 1. Clone and install

```bash
git clone <your-repo> nexaflow
cd nexaflow

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment

**Backend** — create `backend/.env` (see `backend/.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexaflow
JWT_SECRET=change-me-to-a-long-random-string
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend** — optional `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed demo data (optional but recommended)

```bash
cd backend
npm run seed
```

This creates a demo user: **`demo@nexaflow.app`** / **`password123`** with sample workflows, agents, and activity.

### 4. Run the app

In two terminals:

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

Open **http://localhost:5173**.

## 🔌 API overview

All routes are prefixed with `/api`.

| Method | Path                       | Auth | Description              |
|--------|----------------------------|------|--------------------------|
| POST   | `/auth/register`           | No   | Create account           |
| POST   | `/auth/login`              | No   | Sign in, returns JWT     |
| GET    | `/auth/me`                 | Yes  | Current user             |
| GET    | `/workflows`               | Yes  | List user's workflows    |
| POST   | `/workflows`               | Yes  | Create workflow          |
| GET    | `/workflows/:id`           | Yes  | Get workflow             |
| PUT    | `/workflows/:id`           | Yes  | Update workflow          |
| DELETE | `/workflows/:id`           | Yes  | Delete workflow          |
| GET    | `/agents`                  | Yes  | List agents              |
| POST   | `/agents`                  | Yes  | Create agent             |
| PUT    | `/agents/:id`              | Yes  | Update agent             |
| DELETE | `/agents/:id`              | Yes  | Delete agent             |
| GET    | `/analytics`               | Yes  | Summary + series         |
| GET    | `/integrations`            | Yes  | List connections         |
| POST   | `/integrations/toggle`     | Yes  | Connect/disconnect       |
| GET    | `/team`                    | Yes  | List members             |
| POST   | `/team/invite`             | Yes  | Invite member            |
| DELETE | `/team/:id`                | Yes  | Remove member            |

## 🗂 Database models

- **User** — name, email, password (hashed), avatar, workspace
- **Workflow** — user ref, name, description, status, trigger, steps[], executions, lastExecution
- **AIAgent** — user ref, name, description, goal, instructions, tone, model, status
- **Integration** — user ref, provider, connected, connectedAt (unique per user+provider)
- **Activity** — user ref, type, message, meta
- **TeamMember** — workspace ref, user ref, role, status, invitedEmail

## 📦 Build for production

```bash
cd backend && npm run build && npm start
cd frontend && npm run build   # outputs to frontend/dist/
```

Serve `frontend/dist/` with any static host (Vercel, Netlify, Cloudflare Pages, nginx) and point it at your deployed API.

## ⚠️ Known limitations (honest)

- **AI responses are simulated.** The agent model is a placeholder (`nexaflow-v1`). To integrate a real provider, add a service in `backend/src/services/ai.ts` and call it from a new controller.
- **Integrations are simulated.** OAuth flows return success after a 1.2s delay. Replace with real provider SDKs.
- **Payments are simulated.** The pricing page shows a confirmation modal explicitly labeled as a demo.
- **Emails are not sent.** Contact form and team invitations only show toasts.
- **No real-time / websockets.** Activity is polled on page load.

## 🔮 Future improvements

- Real AI provider integration (OpenAI / Anthropic) behind a service layer
- Stripe subscriptions for real payments
- Webhook-based workflow triggers
- Workflow execution history with per-run logs
- Drag-and-drop canvas builder (react-flow)
- Audit log for enterprise plan
- SSO (SAML/OIDC)
- Rate limiting and request logging
- E2E tests (Playwright) and API tests (Vitest)

## 📄 License

MIT — for portfolio / educational use.