import { Todo, UpdateTodo } from '../types/todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: string, updates: UpdateTodo) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <div className="empty-state">
          <h3>🎯 Ready to be productive?</h3>
          <p>Add your first todo above to get started on your journey!</p>
        </div>
      </div>
    )
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="todo-list">
      <div style={{ 
        padding: '1rem 1.5rem', 
        borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
        background: 'rgba(102, 126, 234, 0.05)',
        fontSize: '0.9rem',
        color: '#4a5568',
        fontWeight: '500'
      }}>
        📊 Progress: {completedCount} of {totalCount} completed
        {completedCount > 0 && (
          <span style={{ marginLeft: '1rem', color: '#48bb78' }}>
            ({Math.round((completedCount / totalCount) * 100)}%)
          </span>
        )}
      </div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}