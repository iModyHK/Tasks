
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const fieldsOptions = ['title', 'status', 'dueDate', 'assignedTo', 'createdBy', 'createdAt'];

const CustomReport = () => {
  const [fields, setFields] = useState(['title', 'status']);
  const [filters, setFilters] = useState({});
  const [reportData, setReportData] = useState([]);

  const toggleField = (field) => {
    setFields(fields.includes(field)
      ? fields.filter(f => f !== field)
      : [...fields, field]);
  };

  const generateReport = async () => {
    const res = await axios.post('/api/customreport/generate', { fields, filters }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setReportData(res.data);
  };

  const exportCSV = () => {
    if (!reportData.length) return;
    const headers = fields.join(',');
    const rows = reportData.map(item => fields.map(f => {
      if (typeof item[f] === 'object') return item[f]?.name || item[f]?.email || '';
      return item[f];
    }).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'report.csv');
  };

  const exportPDF = async () => {
    const content = reportData.map(item => fields.map(f => {
      if (typeof item[f] === 'object') return item[f]?.name || item[f]?.email || '';
      return item[f];
    }).join(' | ')).join('\n');

    const blob = new Blob([content], { type: 'application/pdf' });
    saveAs(blob, 'report.pdf');
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Custom Reports</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Select Fields</h3>
        <div className="flex flex-wrap gap-2">
          {fieldsOptions.map(field => (
            <label key={field} className="inline-flex items-center space-x-2">
              <input type="checkbox" checked={fields.includes(field)}
                     onChange={() => toggleField(field)} />
              <span>{field}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <input type="text" placeholder="Status" className="border px-2 py-1 rounded w-full"
               onChange={e => setFilters({ ...filters, status: e.target.value })} />
        <input type="date" placeholder="Created After" className="border px-2 py-1 rounded w-full"
               onChange={e => setFilters({ ...filters, createdAfter: e.target.value })} />
        <input type="date" placeholder="Created Before" className="border px-2 py-1 rounded w-full"
               onChange={e => setFilters({ ...filters, createdBefore: e.target.value })} />
      </div>

      <button onClick={generateReport} className="bg-green-600 text-white px-4 py-2 rounded mr-2">
        Generate Report
      </button>
      <button onClick={exportCSV} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
        Export CSV
      </button>
      <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded">
        Export PDF
      </button>

      {reportData.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                {fields.map(f => (
                  <th key={f} className="px-2 py-1 border">{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, idx) => (
                <tr key={idx}>
                  {fields.map(f => (
                    <td key={f} className="px-2 py-1 border">
                      {typeof row[f] === 'object' ? (row[f]?.name || row[f]?.email || '') : row[f]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomReport;
