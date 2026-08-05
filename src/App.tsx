import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Task } from './types'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [text, setText] = useState('')

  const addTask = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ])
    setText('')
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="board">
      <h1>Task Board</h1>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力"
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクはありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? 'task completed' : 'task'}
            >
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.text}</span>
              </label>
              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label={`${task.text} を削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
