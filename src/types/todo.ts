export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface CreateTodo {
  title: string
  description?: string
}

export interface UpdateTodo {
  title?: string
  description?: string
  completed?: boolean
}