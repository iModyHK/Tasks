
import { useEffect, useState } from 'react';
import axios from 'axios';

function AutoSaveTask({ task }) {
  const [currentTask, setCurrentTask] = useState(task);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.post('/api/tasks/save', currentTask);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentTask]);

  return (
    <input 
      value={currentTask.title} 
      onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })} 
    />
  );
}

export default AutoSaveTask;
