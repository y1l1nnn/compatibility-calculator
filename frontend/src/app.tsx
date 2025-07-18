import { useState } from 'react';
import { Person, CompatibilityResult } from '../../backend/src/types';
import { calculateCompatibility } from './api';

// collects user input and calls api 
export default function app() {
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
	// track waiting for API response
	const [loading, setLoading] = useState(false); 

	const handleSubmit = async() => {

	}
}
