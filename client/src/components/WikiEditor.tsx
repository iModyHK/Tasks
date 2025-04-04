
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const WikiEditor = ({ projectId }) => {
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWiki = () => {
    axios.get(`/api/wiki/${projectId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      if (res.data) setContent(res.data.content);
      setLoading(false);
    });
  };

  const saveWiki = () => {
    axios.post(`/api/wiki/${projectId}`, { content }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(() => setEditing(false));
  };

  useEffect(() => {
    fetchWiki();
  }, [projectId]);

  if (loading) return <div>Loading wiki...</div>;

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Project Wiki</h3>
        <button onClick={() => setEditing(!editing)} className="bg-blue-600 text-white px-3 py-1 rounded">
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {editing ? (
        <div>
          <textarea
            rows="10"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />
          <button onClick={saveWiki} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      ) : (
        <div className="prose max-w-none">
          <ReactMarkdown>{content || '_No wiki content yet._'}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default WikiEditor;
