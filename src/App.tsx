import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Todo, CreateTodo, UpdateTodo } from './types/todo'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async (todoData: CreateTodo) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([todoData])
        .select()
        .single()

      if (error) throw error
      setTodos(prev => [data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo')
    }
  }

  const updateTodo = async (id: string, updates: UpdateTodo) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setTodos(prev => prev.map(todo => todo.id === id ? data : todo))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>✨ Todo App</h1>
        <p>Stay organized and get things done</p>
      </div>

      {error && (
        <div className="error">
          {error}
          <button 
            onClick={() => setError(null)}
            style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      <TodoForm onSubmit={createTodo} />

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <TodoList 
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  )
}

export default App