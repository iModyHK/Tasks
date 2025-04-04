
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => setTasks(res.data));
  }, []);

  const columns = ['todo', 'in-progress', 'done'];

  return (
    <div className="flex p-4 space-x-4">
      {columns.map(status => (
        <div key={status} className="flex-1 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold capitalize mb-4">{status.replace('-', ' ')}</h2>
          {tasks.filter(t => t.status === status).map(task => (
            <div key={task.id} className="bg-white p-2 mb-2 shadow rounded">
              <h3>{task.title}</h3>
              <p className="text-sm">{task.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
