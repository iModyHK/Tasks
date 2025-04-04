
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AutomationManager = () => {
  const [automations, setAutomations] = useState([]);
  const [newAuto, setNewAuto] = useState({
    name: '',
    condition: { field: 'status', operator: 'equals', value: 'Done' },
    action: { type: 'notify', payload: { role: 'Team Leader', message: 'Task completed.' } },
    enabled: true
  });

  useEffect(() => {
    axios.get('/api/automation', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => setAutomations(res.data));
  }, []);

  const createAutomation = () => {
    axios.post('/api/automation', newAuto, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      setAutomations([...automations, res.data]);
      setNewAuto({
        name: '',
        condition: { field: 'status', operator: 'equals', value: 'Done' },
        action: { type: 'notify', payload: { role: 'Team Leader', message: 'Task completed.' } },
        enabled: true
      });
    });
  };

  const deleteAutomation = id => {
    axios.delete('/api/automation/' + id, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(() => setAutomations(automations.filter(a => a._id !== id)));
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Workflow Automation</h2>

      <div className="mb-4 space-y-2">
        <input type="text" placeholder="Automation Name"
          value={newAuto.name} onChange={e => setNewAuto({ ...newAuto, name: e.target.value })}
          className="border px-2 py-1 rounded w-full" />

        <div className="flex gap-2">
          <select className="border px-2 py-1 rounded"
            value={newAuto.condition.field}
            onChange={e => setNewAuto({ ...newAuto, condition: { ...newAuto.condition, field: e.target.value } })}>
            <option value="status">Status</option>
            <option value="dueDate">Due Date</option>
          </select>
          <select className="border px-2 py-1 rounded"
            value={newAuto.condition.operator}
            onChange={e => setNewAuto({ ...newAuto, condition: { ...newAuto.condition, operator: e.target.value } })}>
            <option value="equals">Equals</option>
            <option value="not_equals">Not Equals</option>
            <option value="passed">Passed</option>
          </select>
          <input type="text" className="border px-2 py-1 rounded"
            value={newAuto.condition.value}
            onChange={e => setNewAuto({ ...newAuto, condition: { ...newAuto.condition, value: e.target.value } })} />
        </div>

        <div className="flex gap-2">
          <select className="border px-2 py-1 rounded"
            value={newAuto.action.type}
            onChange={e => setNewAuto({ ...newAuto, action: { ...newAuto.action, type: e.target.value } })}>
            <option value="notify">Notify</option>
          </select>
          <input type="text" className="border px-2 py-1 rounded"
            placeholder="Role to notify"
            value={newAuto.action.payload.role}
            onChange={e => setNewAuto({ ...newAuto, action: { ...newAuto.action, payload: { ...newAuto.action.payload, role: e.target.value } } })} />
          <input type="text" className="border px-2 py-1 rounded"
            placeholder="Message"
            value={newAuto.action.payload.message}
            onChange={e => setNewAuto({ ...newAuto, action: { ...newAuto.action, payload: { ...newAuto.action.payload, message: e.target.value } } })} />
        </div>

        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={createAutomation}>
          Create Automation
        </button>
      </div>

      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">Name</th>
            <th className="px-2 py-1 border">Condition</th>
            <th className="px-2 py-1 border">Action</th>
            <th className="px-2 py-1 border">Enabled</th>
            <th className="px-2 py-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {automations.map(auto => (
            <tr key={auto._id} className="border-t">
              <td className="px-2 py-1">{auto.name}</td>
              <td className="px-2 py-1">{auto.condition.field} {auto.condition.operator} {auto.condition.value}</td>
              <td className="px-2 py-1">{auto.action.type} → {auto.action.payload?.role}: {auto.action.payload?.message}</td>
              <td className="px-2 py-1">{auto.enabled ? 'Yes' : 'No'}</td>
              <td className="px-2 py-1">
                <button onClick={() => deleteAutomation(auto._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutomationManager;
