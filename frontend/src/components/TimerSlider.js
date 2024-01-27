import React, { useState } from 'react';

const TimerSlider = ({ onDurationChange }) => {
  const stepValues = [30, 60, 180, 300, 600, 900, 1800, 3600, 7200]; // Durées en secondes

  const [duration, setDuration] = useState(stepValues[0]);

  const formatDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds} secondes`;
    } else if (seconds < 3600) {
      return `${Math.round(seconds / 60)} minutes`;
    } else {
      return `${Math.round(seconds / 3600)} heures`;
    }
  };

  const handleChange = (event) => {
    const newDuration = Number(event.target.value);
    setDuration(newDuration);
    onDurationChange(newDuration);
  };

  return (
    <div>
      <input
        type="range"
        min={stepValues[0]}
        max={stepValues[stepValues.length - 1]}
        value={duration}
        onChange={handleChange}
        list="tickmarks"
      />
      <datalist id="tickmarks">
        {stepValues.map((value, index) => (
          <option key={index} value={value} />
        ))}
      </datalist>
      <div>Durée: {formatDuration(duration)}</div>
    </div>
  );
};

export default TimerSlider;
