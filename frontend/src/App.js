import React, { useState, useEffect, useCallback } from 'react';
import ImageDisplay from './components/ImageDisplay';
import TimerSlider from './components/TimerSlider';
import ImageCarousel from './components/ImageCarousel';

function App() {
  const [images, setImages] = useState([]); // Utilisez un tableau pour stocker l'historique des images
  const [currentImage, setCurrentImage] = useState(''); // Image actuelle pour l'affichage
  const [duration, setDuration] = useState(0);

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    // Ici, vous pouvez utiliser `newDuration` pour déclencher un timer
  };

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
  }, [fetchNewImage]); // Dépendance ajoutée pour éviter l'exécution multiple

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        width: '250px',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
      }}>
        <TimerSlider onDurationChange={handleDurationChange} />
        <button onClick={fetchNewImage}>Nouvelle Image</button>
        <ImageCarousel images={images} />
      </div>
      <ImageDisplay imageUrl={currentImage} />
    </div>
  );
}

export default App;
