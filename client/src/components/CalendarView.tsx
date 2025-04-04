
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function CalendarView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      setEvents(res.data.map(task => ({
        title: task.title,
        start: task.dueDate || new Date().toISOString().split('T')[0]
      })));
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Calendar View</h2>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
    </div>
  );
}

export default CalendarView;
