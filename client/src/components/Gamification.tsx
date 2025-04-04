
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gamification() {
  const [progress, setProgress] = useState({ completedTasks: 0, achievements: [] });

  useEffect(() => {
    axios.get('/api/milestones', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => setProgress(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Milestone Tracking & Gamification</h2>
      <p>Completed Tasks: {progress.completedTasks}</p>
      <h3 className="mt-2">Achievements:</h3>
      <ul>
        {progress.achievements.length === 0 ? <p>No achievements yet</p> :
          progress.achievements.map((ach, index) => <li key={index} className="badge">{ach}</li>)}
      </ul>
    </div>
  );
}

export default Gamification;
