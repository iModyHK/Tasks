
import React, { useEffect, useState, useRef } from 'react';

const PomodoroTimer = ({ currentTaskId }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min default
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const intervalRef = useRef(null);

  const switchMode = () => {
    const nextMode = mode === 'work' ? 'break' : 'work';
    const nextTime = nextMode === 'work' ? 25 * 60 : 5 * 60;
    setMode(nextMode);
    setTimeLeft(nextTime);
    new Audio('/ding.mp3').play();
    alert(`Time for a ${nextMode === 'work' ? 'focus session' : 'short break'}!`);
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            switchMode();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="p-4 border rounded bg-white shadow mt-4">
      <h3 className="text-lg font-bold mb-2">Pomodoro Timer</h3>
      <div className="text-2xl font-mono mb-2">{minutes}:{seconds}</div>
      <div className="mb-2">Mode: {mode === 'work' ? 'Focus' : 'Break'}</div>
      <button onClick={toggleTimer} className="bg-green-600 text-white px-4 py-2 rounded">
        {isRunning ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default PomodoroTimer;
