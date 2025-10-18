import React, { useEffect, useState } from 'react';
import './FloatingHearts.css';

interface Heart {
  id: number;
  style: React.CSSProperties;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  // Helper to generate a random style for each heart
  const generateHeartStyle = (): React.CSSProperties => {
    const left = Math.random() * 100; 				// horizontal %
    const duration = 15 + Math.random() * 10; 		// 15–25s total float time
    const size = 15 + Math.random() * 25; 			// 15–40px

    const colors = [
      '#ff6b6b', '#ff8e8e', '#ff5252', '#e86648',
      '#ff79a7', '#ff6b9d', '#ff4081'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      left: `${left}%`,
      '--heart-size': `${size}px`,
      '--heart-color': color,
      '--float-duration': `${duration}s`,
    } as React.CSSProperties;
  };

  useEffect(() => {
    // periodically add new hearts
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        style: generateHeartStyle(),
      };
      setHearts(prev => [...prev, newHeart]);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={heart.style}
          onAnimationEnd={() => {
            // Remove heart when animation finishes
            setHearts(prev => prev.filter(h => h.id !== heart.id));
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;