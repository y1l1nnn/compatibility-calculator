import { useState } from 'react';
import { Person, CompatibilityResult } from '../../backend/src/types';
import { calculateCompatibility } from './api';

// collects user input and calls api 
export default function App() {
	const [personA, setPersonA] = useState<Person>({
		initials: '',
		starSign: 'Aries', // random default values 
		mbti: 'ENTP',
		zodiac: 'Rat',
		blood: 'A'
  	});
  	const [personB, setPersonB] = useState<Person>({
		initials: '',
		starSign: 'Aries',
		mbti: 'ENTP',
		zodiac: 'Rat',
		blood: 'A'
  	});
  	// holds compatibility calculation response
	const [result, setResult] = useState<CompatibilityResult | null>(null); 

	const handleSubmit = async() => {
		const result = await calculateCompatibility(personA, personB);
		setResult(result)
	};
	return (<h1>Compatibility Calculator</h1>);
}
