
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserActivityReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/api/useractivity/activity', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => setReports(res.data));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">User Activity Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 border">Name</th>
              <th className="px-2 py-1 border">Email</th>
              <th className="px-2 py-1 border">Tasks Created</th>
              <th className="px-2 py-1 border">Comments</th>
              <th className="px-2 py-1 border">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.user.id} className="border-t">
                <td className="px-2 py-1">{report.user.name}</td>
                <td className="px-2 py-1">{report.user.email}</td>
                <td className="px-2 py-1">{report.tasksCreated}</td>
                <td className="px-2 py-1">{report.commentsMade}</td>
                <td className="px-2 py-1">
                  {report.lastActive ? new Date(report.lastActive).toLocaleString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && <p className="text-center py-4">No activity data found.</p>}
      </div>
    </div>
  );
};

export default UserActivityReport;
