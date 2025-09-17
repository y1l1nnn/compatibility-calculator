import React, { useEffect, useState } from 'react';
import './FloatingHearts.css';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => i);
    setHearts(initialHearts);

    // Function to add new hearts periodically
    const addHeart = () => {
      setHearts(prev => [...prev, Date.now()]);
    };

    const interval = setInterval(addHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  // Function to generate random styles for each heart
  const getHeartStyle = (index: number) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 8 + Math.random() * 8;
    const size = 15 + Math.random() * 20;
    
    // Random heart colors
    const colors = [
      '#ff6b6b', '#ff8e8e', '#ff5252', '#e86648', 
      '#ff79a7', '#ff6b9d', '#ff5252', '#ff4081'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      '--heart-size': `${size}px`,
      '--heart-color': color
    } as React.CSSProperties;
  };

  return (
    <div className="floating-hearts-container">
      {hearts.map((heart, index) => (
        <div
          key={heart}
          className="heart"
          style={getHeartStyle(index)}
          onAnimationEnd={() => {
            // Remove heart after animation completes
            setHearts(prev => prev.filter(h => h !== heart));
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;