import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThemeSettings from './ThemeSettings';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/users', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => setUsers(res.data));
  }, []);

  const updateRole = (userId, role) => {
    axios.post('/api/admin/update-role', { userId, role }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(() => {
      setUsers(users.map(user => user.id === userId ? { ...user, role } : user));
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <table className="border-collapse border w-full mb-6">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <select value={user.role} onChange={(e) => updateRole(user.id, e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="team_leader">Team Leader</option>
                  <option value="member">Member</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add ThemeSettings */}
      <ThemeSettings />
    </div>
  );
}

export default AdminPanel;
