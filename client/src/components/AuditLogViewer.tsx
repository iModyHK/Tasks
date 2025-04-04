
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    axios.get('/api/auditlog', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      setLogs(res.data);
      setFilteredLogs(res.data);
    });
  }, []);

  useEffect(() => {
    let filtered = [...logs];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(l =>
        l.user?.name?.toLowerCase().includes(s) ||
        l.entityType?.toLowerCase().includes(s)
      );
    }
    if (actionFilter) {
      filtered = filtered.filter(l => l.action === actionFilter);
    }
    if (dateFrom) {
      filtered = filtered.filter(l => new Date(l.createdAt) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(l => new Date(l.createdAt) <= new Date(dateTo));
    }
    setFilteredLogs(filtered);
  }, [search, actionFilter, dateFrom, dateTo, logs]);

  const uniqueActions = [...new Set(logs.map(l => l.action))];

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>

      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search user or entity"
          className="border px-2 py-1 rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          value={actionFilter}
          onChange={e => setActionFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Actions</option>
          {uniqueActions.map(action => (
            <option key={action} value={action}>{action}</option>
          ))}
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 border">Date</th>
              <th className="px-2 py-1 border">User</th>
              <th className="px-2 py-1 border">Action</th>
              <th className="px-2 py-1 border">Entity</th>
              <th className="px-2 py-1 border">Meta</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log._id} className="border-t">
                <td className="px-2 py-1">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="px-2 py-1">{log.user?.name || 'System'}</td>
                <td className="px-2 py-1 font-semibold">{log.action}</td>
                <td className="px-2 py-1">{log.entityType || ''}</td>
                <td className="px-2 py-1 text-xs">{JSON.stringify(log.meta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLogs.length === 0 && <p className="text-center py-4">No logs found.</p>}
      </div>
    </div>
  );
};

export default AuditLogViewer;
