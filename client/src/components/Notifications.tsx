
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/api/notifications', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => setNotifications(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? <p>No notifications</p> : (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index} className="border p-2 mb-2">{notif.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
