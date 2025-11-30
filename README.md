# 📌 TODO Flow — Task Management App

A modern task-management application with support for tags, subtasks, filtering, sorting, and search.
Built with **Next.js + TypeScript + Tailwind** and powered by a **FastAPI + Beanie + MongoDB** backend.


## 🚀 Features

### ✅ Task Management

* Create, edit, and delete tasks
* Support for **subtasks**
* Task statuses: *today*, *future*, *done*
* Automatic status calculation based on due date
* Change status between *done* / *in process*

### 🎨 Tags

* Built-in default tags
* User-created tags
* Color picker for custom tag styling
* Tag-based filtering

### 🔍 Search & Sorting

* Title search with debounce
* Tag-based search
* Sorting options:

  * by priority
  * by date
  * none

### 🗂 Clean UI for task navigation

* 4 task columns:

  * **All**
  * **On today**
  * **Future & Overdue**
  * **Done**
* Smooth column scrolling
* Framer Motion animations

### 🔐 Authentication

* Register & login
* JWT stored in cookies
* Protected routes (tasks, tags)

### ✨ UI/UX Experience

* Custom UI components (shadcn/ui)
* Full dark theme
* Smooth transitions & hover effects
* Clean and cosy sidebar navigation
* Consistent typography
* High-quality icons and animations


## 🛠 Tech Stack

### Frontend

* **Next.js 16 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Framer Motion**
* **Axios**


### Backend

* **FastAPI**
* **Beanie (MongoDB ODM)**
* **MongoDB**
* JWT authentication
* Pydantic models

## 📂 Project Structure (Frontend)

```
├── app/
│    ├── auth/           # Login / Register pages
│    ├── new-task/       # Create task form
│    ├── tags/           # Tags list & tag creation
│    └── page.tsx        # Home page with task columns
├── components/
│    ├── TaskCard/
│    ├── EditTaskForm/
│    ├── Tag/
│    ├── SideNavbar/
│    ├── ui/             # shadcn/ui components
├── api/
│    ├── tasks.ts
│    └── tags.ts
├── lib/
│    ├── date.ts.        # Converts ISO date to more "human" format
│    ├── config.ts       # Config the API url
│    └── api.ts          # Axios instance
└── types/
    ├── taskType.ts
    └── tagType.ts
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd todo-flow
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create environment file

`.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4️⃣ Run development server

```bash
npm run dev
```

Frontend will be available at:
👉 [http://localhost:3000](http://localhost:3000)


## 🗄 Backend Setup

### 1️⃣ Install Python dependencies

```bash
poetry install
```

### 2️⃣ Environment variables

`.env`:

```
MONGO_URI=mongodb://localhost:27017
SECRET_KEY=your_secret
```

### 3️⃣ Run FastAPI server

```bash
poetry run uvicorn app.main:app --reload
```

API available at:
👉 [http://localhost:8000](http://localhost:8000)


## 🧪 API Endpoints (Short Overview)

### Tasks

```
GET    /tasks
POST   /tasks
PATCH  /tasks/{id}
DELETE /tasks/{id}
GET    /tasks/search?q=...
```

### Tags

```
GET    /tags
POST   /tags
DELETE /tags/{id}
```

### Auth

```
POST   /auth/signup
POST   /auth/signin
```


## 📝 Roadmap

* Grag-n-drop
* Shared workspaces / team projects
* Notifications


# 👨‍💻 Author

**Alexander Ivanitskiy**

Frontend / Full-stack Developer
🔥 Passionate about clean UI, animations, and high-quality code architecture.

