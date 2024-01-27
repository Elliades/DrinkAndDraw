import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaSyncAlt } from 'react-icons/fa'; 

const TimerControls = ({ isRunning, onStart, onPause, onReset }) => {
  return (
    <div className="timer-controls">
      {isRunning ? (
        <FaPause onClick={onPause} className="icon" />
      ) : (
        <FaPlay onClick={onStart} className="icon" />
      )}
      <FaSyncAlt onClick={onReset} className="icon" />
    </div>
  );
};

export default TimerControls;
