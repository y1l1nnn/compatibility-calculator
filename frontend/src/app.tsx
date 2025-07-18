import { useState } from 'react';
import { Person, CompatibilityResult } from '../../backend/src/types';
import { calculateCompatibility } from './api';

// collects user input and calls api 
export default function App() {
	const [personA, setPersonA] = useState<Person>({
		initials: '',
		starSign: '',
		mbti: '',
		zodiac: '',
		blood: ''
  	});
  	const [personB, setPersonB] = useState<Person>({
		initials: '',
		starSign: '',
		mbti: '',
		zodiac: '',
		blood: ''
  	});
  	// holds compatibility calculation response
	const [result, setResult] = useState<CompatibilityResult | null>(null); 

	const handleSubmit = async() => {
		const result = await calculateCompatibility(personA, personB);
		setResult(result)
	};
	return (<h1>Compatibility Calculator</h1>);
}
