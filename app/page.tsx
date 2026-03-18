"use client";

import { useState, useRef } from "react";

type Filter = "all" | "active" | "done";

interface Task {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        text,
        done: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearDone = () => {
    setTasks((prev) => prev.filter((t) => !t.done));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.done).length;
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <main className="container">
      {/* Header */}
      <div className="header">
        <h1 className="header-title">Toodo</h1>
        <p className="header-subtitle">今日やることを整理しよう</p>
      </div>

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="stats">
          <div className="stat-chip">
            <span>{activeCount}</span>残り
          </div>
          <div className="stat-chip">
            <span>{doneCount}</span>完了
          </div>
        </div>
      )}

      {/* Input */}
      <div className="input-area">
        <input
          ref={inputRef}
          className="task-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="タスクを入力..."
          maxLength={200}
        />
        <button className="add-btn" onClick={addTask} aria-label="タスクを追加">
          +
        </button>
      </div>

      {/* Filter */}
      {tasks.length > 0 && (
        <div className="filter-row">
          <div className="filter-tabs">
            {(["all", "active", "done"] as Filter[]).map((f) => (
              <button
                key={f}
                className={`filter-tab${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "すべて" : f === "active" ? "未完了" : "完了済み"}
              </button>
            ))}
          </div>
          {doneCount > 0 && (
            <button className="clear-btn" onClick={clearDone}>
              完了済みを削除
            </button>
          )}
        </div>
      )}

      {/* Task List */}
      <ul className="task-list" style={{ listStyle: "none" }}>
        {filtered.length === 0 ? (
          <li>
            <div className="empty">
              <div className="empty-icon">
                {tasks.length === 0 ? "📝" : "✓"}
              </div>
              <p className="empty-text">
                {tasks.length === 0
                  ? "タスクを追加してみましょう"
                  : filter === "active"
                  ? "未完了のタスクはありません"
                  : "完了済みのタスクはありません"}
              </p>
            </div>
          </li>
        ) : (
          filtered.map((task) => (
            <li key={task.id}>
              <div className={`task-item${task.done ? " done" : ""}`}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`${task.text}を${task.done ? "未完了" : "完了"}にする`}
                />
                <span className="task-text">{task.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`${task.text}を削除`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
