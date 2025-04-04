
import React from 'react';

const roles = ['Admin', 'Team Leader', 'Member'];
const permissions = [
  'Create Task', 'Edit Task', 'Delete Task',
  'Assign Task', 'View Reports', 'Access Settings',
  'Edit Wiki', 'View Logs'
];

const rolePermissions = {
  Admin: ['Create Task', 'Edit Task', 'Delete Task', 'Assign Task', 'View Reports', 'Access Settings', 'Edit Wiki', 'View Logs'],
  'Team Leader': ['Create Task', 'Edit Task', 'Assign Task', 'View Reports', 'Edit Wiki'],
  Member: ['Create Task', 'Edit Task', 'Edit Wiki']
};

const PermissionMatrix = () => {
  return (
    <div className="p-4 bg-white rounded shadow mt-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Permission Matrix</h2>
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">Permission</th>
            {roles.map(role => (
              <th key={role} className="px-2 py-1 border text-center">{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map(perm => (
            <tr key={perm} className="border-t">
              <td className="px-2 py-1 border">{perm}</td>
              {roles.map(role => (
                <td key={role} className="px-2 py-1 border text-center">
                  {rolePermissions[role].includes(perm) ? '✔️' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionMatrix;
