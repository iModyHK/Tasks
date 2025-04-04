
import React from 'react';
import TimeLogger from './TimeLogger';

const TaskDetail = ({ task }) => {
  if (!task) return <div>Select a task</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p className="mb-4">{task.description}</p>

      {/* Time Logger for this task */}
      <TimeLogger taskId={task._id} />
    </div>
  );
};

export default TaskDetail;
