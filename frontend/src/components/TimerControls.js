import React, { useState, useEffect } from 'react';

const TimerControls = ({ duration, onTimerComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onTimerComplete();
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  return (
    <div>
      <button onClick={handleStart}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
      <div>Temps restant : {timeLeft}</div>
    </div>
  );
};

export default TimerControls;
