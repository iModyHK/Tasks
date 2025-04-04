
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800 text-white">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <h1 className="text-lg font-semibold">Task Manager</h1>
      </div>

      {/* Sidebar */}
      <div className={`bg-gray-900 text-white w-64 h-full fixed top-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-50 md:relative md:h-screen`}>
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
          <nav className="flex flex-col space-y-2">
            <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
            <Link to="/tasks" className="hover:bg-gray-700 p-2 rounded">Tasks</Link>
            <Link to="/calendar" className="hover:bg-gray-700 p-2 rounded">Calendar</Link>
            <Link to="/settings" className="hover:bg-gray-700 p-2 rounded">Settings</Link>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile when menu is open */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
