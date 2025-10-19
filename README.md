# Modern Todo App ✨

A beautiful, modern todo application built with React, TypeScript, and Supabase featuring real-time updates, edit functionality, and a stunning glass-morphism design.

![Todo App Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Modern+Todo+App)

## 🚀 Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete todos
- ✏️ **Inline Editing** - Edit todos directly in the interface
- 🎨 **Modern Design** - Glass-morphism UI with gradient backgrounds
- ⚡ **Real-time Updates** - Powered by Supabase for instant sync
- 📊 **Progress Tracking** - Visual progress indicator with completion percentage
- 🕒 **Smart Timestamps** - Shows when tasks were created with relative time
- 🔒 **Secure** - Row Level Security (RLS) enabled
- 📱 **Responsive** - Works perfectly on all devices
- 🎭 **Smooth Animations** - Delightful hover effects and transitions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Supabase (PostgreSQL)
- **Styling**: Modern CSS with glass-morphism effects
- **Security**: Row Level Security (RLS)

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── TodoForm.tsx    # Form for adding new todos
│   ├── TodoItem.tsx    # Individual todo item with edit functionality
│   └── TodoList.tsx    # List of todos with progress tracking
├── lib/
│   └── supabase.ts     # Supabase client configuration
├── types/
│   └── todo.ts         # TypeScript type definitions
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Modern styling with glass-morphism
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Jcoding7/modern-todo-app.git
cd modern-todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

Run the SQL commands in `database/setup.sql` in your Supabase SQL editor to create the todos table and set up RLS policies.

### 4. Configure Supabase

Update `src/lib/supabase.ts` with your Supabase project credentials:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## 📊 Database Schema

The `todos` table structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `title` | TEXT | Todo title (required) |
| `description` | TEXT | Optional description |
| `completed` | BOOLEAN | Completion status (default: false) |
| `created_at` | TIMESTAMPTZ | Creation timestamp (auto-generated) |
| `updated_at` | TIMESTAMPTZ | Last update timestamp (auto-updated) |

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Anonymous access configured for demo purposes
- In production, implement proper authentication

## 🎨 Design Features

- **Glass-morphism**: Translucent elements with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Smooth Animations**: Hover effects and transitions
- **Modern Typography**: Clean, readable fonts
- **Responsive Layout**: Works on all screen sizes

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with modern CSS techniques
- Icons from Unicode emojis

---

Made with ❤️ by [Jcoding7](https://github.com/Jcoding7)