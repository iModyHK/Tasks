import React, { useState } from "react";
import axios from "axios";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [recurrence, setRecurrence] = useState("None");

  const createTask = () => {
    axios.post("/api/tasks", { title, recurrence }, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }).then(() => alert("Task created!"));
  };

  return (
    <div>
      <h2>Create Task</h2>
      <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} />

      <label>Repeat Task:</label>
      <select value={recurrence} onChange={e => setRecurrence(e.target.value)}>
        <option value="None">None</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>

      <button onClick={createTask}>Create Task</button>
    </div>
  );
}

export default TaskForm;
