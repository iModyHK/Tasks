
import React from 'react';
import sendEmailNotification from './sendEmailNotification';

function TaskUpdate({ task }) {
  const notifyUser = () => {
    sendEmailNotification(task.assignedToEmail, "Task Update", `Your task "${task.title}" has been updated.`);
  };

  return (
    <div>
      <p>{task.title}</p>
      <button onClick={notifyUser}>Notify User</button>
    </div>
  );
}

export default TaskUpdate;
