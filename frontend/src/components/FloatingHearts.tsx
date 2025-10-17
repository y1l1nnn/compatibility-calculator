import React, { useEffect, useState } from 'react';
import './FloatingHearts.css';

// Imports CSS styles for this component 
const FloatingHearts: React.FC = () => {
	// State hook that manages an array of heart identifiers
	const [hearts, setHearts] = useState<number[]>([]);
	// hearts 		Current array of heart IDs
	// setHearts 	Function to update the hearts array
	// <number[]> 	TypeScript type for an array of numbers
	// [] 			Initial empty array

	useEffect(() => {
		// Create initial hearts
		// Creates an array of 80 hearts with initial IDs (0, 1, 2, ..., 79)
		const initialHearts = Array.from({ length: 50 }, (_, i) => i);
		// Array.from({ length: 80 }): Creates array with 80 empty slots
		// (_, i) => i: Fills array with index values
		setHearts(initialHearts);

		// Function to add new hearts periodically
		const addHeart = () => {
			// Uses current timestamp as unique ID and spreads existing hearts
			setHearts(prev => [...prev, Date.now()]); 
		};

		const interval = setInterval(addHeart, 500); 
		return () => clearInterval(interval);
	}, []);

	// Function to generate random styles for each heart
	const getHeartStyle = (index: number) => {
		const left = Math.random() * 100;  // random horizontal position 0-100%
		const delay = Math.random() * 3; // random animation delay 0-3secs 
		const duration = 20 + Math.random() * 10; // Random animation duration 20-30secs
		const size = 20 + Math.random() * 20; // Random heart size 30-50px
		
		// Random heart colors
		const colors = [
			'#ff6b6b', '#ff8e8e', '#ff5252', '#e86648', 
			'#ff79a7', '#ff6b9d', '#ff5252', '#ff4081'
		];
		// Array of possible heart colors
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