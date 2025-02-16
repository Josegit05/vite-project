import  { useReducer, useState } from "react";
import "./TaskManager.css";

// Estado inicial
const initialState = [];

// Reducer para manejar el estado
function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

export const TaskManager = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput.trim()) {
      dispatch({ type: "ADD_TASK", payload: taskInput });
      setTaskInput("");
    }
  };

  return (
    <div className="task-manager">
      <h2>Gestor de Tareas</h2>
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button id="button1" onClick={handleAddTask}>Agregar</button>
      </div>
      <ul className="task-list">
        {state.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <span onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}>
              {task.text}
            </span>
            <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
