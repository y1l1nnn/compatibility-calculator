import { useState } from 'react'
import axios from 'axios';
import { type Person, type CompatibilityResult } from '../../backend/src/types';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// collects user input 
function App() {
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
  	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		
		try {
			const response = await axios.post<CompatibilityResult>(
				'http://localhost:6000/api/calculate',
				{ personA, personB }
			);
			setResult(response.data);
		} catch (error) {
			console.error('Error calculating compatibility:', error);
		} finally {
			setLoading(false);
		}
  	};

  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
