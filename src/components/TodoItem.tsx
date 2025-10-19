import { useState } from 'react'
import { Todo, UpdateTodo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, updates: UpdateTodo) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  const handleToggleComplete = async () => {
    setUpdating(true)
    try {
      await onUpdate(todo.id, { completed: !todo.completed })
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return
    
    setDeleting(true)
    try {
      await onDelete(todo.id)
    } finally {
      setDeleting(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return
    
    setUpdating(true)
    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined
      })
      setIsEditing(false)
    } finally {
      setUpdating(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
  }

  if (isEditing) {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={updating}
        />

        <div className="todo-content">
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Todo title..."
              autoFocus
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description (optional)..."
              rows={2}
            />
            <div className="edit-actions">
              <button
                className="btn btn-small btn-success"
                onClick={handleSaveEdit}
                disabled={!editTitle.trim() || updating}
              >
                {updating ? 'Saving...' : 'Save'}
              </button>
              <button
                className="btn btn-small btn-secondary"
                onClick={handleCancelEdit}
                disabled={updating}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={updating}
      />

      <div className="todo-content">
        <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </div>
        {todo.description && (
          <div className="todo-description">
            {todo.description}
          </div>
        )}
        <div className="todo-timestamp">
          🕒 Created {formatDate(todo.created_at)}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="btn btn-small btn-secondary"
          onClick={handleEdit}
          disabled={updating || deleting}
          title="Edit todo"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={handleDelete}
          disabled={deleting || updating}
          title="Delete todo"
        >
          {deleting ? 'Deleting...' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  )
}