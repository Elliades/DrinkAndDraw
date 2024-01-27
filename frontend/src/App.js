import React, { useState, useEffect, useCallback } from 'react';
import ImageDisplay from './components/ImageDisplay';
import TimerSlider from './components/TimerSlider';
import ImageCarousel from './components/ImageCarousel';
import TimerControls from './components/TimerControls';

function App() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [duration, setDuration] = useState(30); // Valeur initiale du slider en secondes
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Récupération des images
  const fetchNewImage = useCallback(() => {
    fetch('http://127.0.0.1:5000/api/random-image')
      .then(response => response.blob()) // Traiter la réponse comme un blob binaire
      .then(imageBlob => {
        // Créer une URL locale pour le blob de l'image
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setCurrentImage(imageObjectURL); // Mettre à jour l'image actuelle pour l'affichage
        setImages(prevImages => [...prevImages, imageObjectURL]); // Ajoutez au tableau pour l'historique
      })
      .catch(error => console.error('Error fetching image:', error));
  }, []);

  useEffect(() => {
    fetchNewImage();
  }, [fetchNewImage]);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      fetchNewImage(); // Supposons que vous vouliez récupérer une nouvelle image lorsque le timer se termine
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleStartTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    if (timeLeft === 0) {
      setTimeLeft(duration); // Seulement réinitialiser le temps restant si le timer a atteint 0
    }
  };
  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };
  
  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(duration); // Réinitialiser le temps à la durée définie
  };

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return [hours, minutes, remainingSeconds]
      .map(unit => String(unit).padStart(2, '0')) // Ajoute 0 si nécessaire pour avoir 2 chiffres
      .join(':');
  }
  
  // Mise à jour de la durée du timer à partir du TimerSlider
  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setTimeLeft(newDuration); // Réinitialise le temps restant si la durée est mise à jour
  };

  return (
    <div className="App">
      <div className="sidebar">
      <div className="timer-display">
          {timeLeft > 0 ? (
            <h1 className='timer'>{formatTime(timeLeft)}</h1>
          ) : (
            <h1>Définir le Timer</h1>
          )}
      </div>
      <div className="timer-controls-container">
        <TimerSlider onDurationChange={handleDurationChange} />
        <TimerControls
          isRunning={isTimerRunning}
          onStart={handleStartTimer}
          onPause={handlePauseTimer}
          onReset={handleResetTimer}
        />
      </div>
      <ImageCarousel images={images} />
      <button onClick={fetchNewImage}>Nouvelle Image</button>
      </div>
      <div className="main-content">
        <ImageDisplay imageUrl={currentImage} />
        {/* Reste du contenu principal */}
      </div>
    </div>
  );
}

export default App;
