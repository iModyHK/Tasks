
import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import GanttChart from '../components/GanttChart';
import TimelineView from '../components/TimelineView';
import CalendarView from '../components/CalendarView';
import TeamChat from '../components/TeamChat';
import Notifications from '../components/Notifications';
import Gamification from '../components/Gamification';
import DarkModeToggle from '../components/DarkModeToggle';
import AutoSaveTask from '../components/AutoSaveTask';
import AdminPanel from '../components/AdminPanel';

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl p-4">Dashboard</h1>
      <DarkModeToggle />
      <AutoSaveTask task={{ title: "New Task" }} />
      <AdminPanel />
      <KanbanBoard />
      <GanttChart />
      <TimelineView />
      <CalendarView />
      <TeamChat />
      <Notifications />
      <Gamification />
    </div>
  );
}

export default Dashboard;
