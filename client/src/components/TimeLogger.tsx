
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeLogger = ({ taskId }) => {
  const [logs, setLogs] = useState([]);
  const [note, setNote] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const fetchLogs = () => {
    axios.get('/api/timelog?taskId=' + taskId).then(res => setLogs(res.data));
  };

  const logTime = () => {
    const duration = (new Date(endTime) - new Date(startTime)) / 60000;
    axios.post('/api/timelog', {
      taskId,
      startTime,
      endTime,
      durationMinutes: duration,
      note
    }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(() => {
      fetchLogs();
      setNote('');
      setStartTime('');
      setEndTime('');
    });
  };

  useEffect(() => {
    fetchLogs();
  }, [taskId]);

  return (
    <div className="p-4 border rounded mt-4 bg-gray-50">
      <h3 className="text-lg font-bold mb-2">Time Logs</h3>
      <div className="space-y-2 mb-2">
        {logs.map(log => (
          <div key={log._id} className="text-sm text-gray-700">
            {new Date(log.startTime).toLocaleString()} → {new Date(log.endTime).toLocaleTimeString()} ({log.durationMinutes} min)
            <div className="italic">{log.note}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="p-1 border rounded" />
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} className="p-1 border rounded" />
        <input type="text" placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} className="p-1 border rounded" />
        <button onClick={logTime} className="bg-blue-600 text-white px-3 py-2 rounded">Log Time</button>
      </div>
    </div>
  );
};

export default TimeLogger;
