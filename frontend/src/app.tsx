import './App.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { scroller, Element } from "react-scroll";
import { useState, useEffect, useRef } from 'react';
import { 
	type Person, 
	type StarSign,
	type MBTI,
	type ZodiacAnimal, 
	type BloodType,
	type CompatibilityResult 
} from '../../backend/src/types';

// collects user input 
function App() {
	const [personA, setPersonA] = useState<Person>({
		name: '',
		starSign: 'Aries', // random default values 
		mbti: 'ENTP',
		zodiac: 'Rat',
		blood: 'A'
	});
	const [personB, setPersonB] = useState<Person>({
		name: '',
		starSign: 'Aries',
		mbti: 'ENTP',
		zodiac: 'Rat',
		blood: 'A'
	});
	const [result, setResult] = useState<CompatibilityResult | null>(null);  // holds calculation response
	const [loading, setLoading] = useState(false);  // add loading state 
	const [showResults, setShowResults] = useState(false);

	// Scroll to results when they become available
	useEffect(() => {
		if (showResults && result) {
			setTimeout(() => {
				scroller.scrollTo('results-section', {
					duration: 500,
					offset: -80,
					smooth: 'true',
				});
			}, 200);
		}
	}, [showResults, result]);

	// responds to submission event 
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // prevent default form submission 
		setLoading(true);
		
		// sends POST API request with axios 
		// URL - backend endpoint, data - persons object
		try {
			const response = await axios.post<CompatibilityResult>(
				'http://localhost:5001/api/calculate',
				{ personA, personB }
			);
			setResult(response.data);
		} catch (err) {
			let errorMsg = "";
			if (axios.isAxiosError(err)) { // Axios errors 
				if (err.response) { // server error 
					const e = err.response.data.error
					if (e === "Nonalphabetical characters") {
						errorMsg = "Please only enter alphabetical characters";
					} else if (e === "Empty name") {
						errorMsg = "Please enter both names";
					} else {
						errorMsg = e;
					}
				} else if (err.request) { // network error 
					errorMsg = "Network error";
				}
			} else if (err instanceof Error) { // non-Axios errors 
				errorMsg = err.message;
			}
 			toast.warning(errorMsg, {className: 'name-error-notif'});
			console.error('Error calculating compatibility:', err);
		} finally {
			setTimeout(() => setLoading(false), 1500);
			if (!loading) setShowResults(true);
		}
	};
	
  	return (
	<>
		<h1>Compatibility Calculator</h1>
			<div className="form-container">
			<form onSubmit={handleSubmit}>
				<h2 className="person">PERSON A</h2>
				<div className="fields">
					<label>
						<span>First Name:</span>
						<input 
							type="text"
							placeholder="Enter name"
							value={personA.name}
							onChange={(e) => setPersonA({ ...personA, name: e.target.value })}
							/>
					</label>
					<label>
						<span>Zodiac Star Sign:</span>
						<select value={personA.starSign} onChange={(e) => setPersonA({...personA, starSign: e.target.value as StarSign})}>
							<option value="Aries">Aries</option>
							<option value="Taurus">Taurus</option>
							<option value="Gemini">Gemini</option>
							<option value="Cancer">Cancer</option>
							<option value="Leo">Leo</option>
							<option value="Virgo">Virgo</option>
							<option value="Libra">Libra</option>
							<option value="Scorpio">Scorpio</option>
							<option value="Saggitarius">Saggitarius</option>
							<option value="Capricorn">Capricorn</option>
							<option value="Aquarius">Aquarius</option>
							<option value="Pisces">Pisces</option>
						</select>
					</label>
					<label>
						<span>MBTI:</span> 
						<select value={personA.mbti} onChange={(e) => setPersonA({...personA, mbti: e.target.value as MBTI})}>
							<option value="INFP">INFP</option>
							<option value="ENFP">ENFP</option>
							<option value="INFJ">INFJ</option>
							<option value="ENFJ">ENFJ</option>
							<option value="INTJ">INTJ</option>
							<option value="ENTJ">ENTJ</option>
							<option value="INTP">INTP</option>
							<option value="ENTP">ENTP</option>
							<option value="ISFP">ISFP</option>
							<option value="ESFP">ESFP</option>
							<option value="ISTP">ISTP</option>
							<option value="ESTP">ESTP</option>
							<option value="ISFJ">ISFJ</option>
							<option value="ESFJ">ESFJ</option>
							<option value="ISTJ">ISTJ</option>
							<option value="ESTJ">ESTJ</option>
						</select>
					</label>
					<label>
						<span>Chinese Zodiac Animal:</span>
						<select value={personA.zodiac} onChange={(e) => setPersonA({...personA, zodiac: e.target.value as ZodiacAnimal})}>
							<option value="Rat">Rat</option>
							<option value="Ox">Ox</option>
							<option value="Tiger">Tiger</option>
							<option value="Rabbit">Rabbit</option>
							<option value="Dragon">Dragon</option>
							<option value="Snake">Snake</option>
							<option value="Horse">Horse</option>
							<option value="Goat">Goat</option>
							<option value="Monkey">Monkey</option>
							<option value="Rooster">Rooster</option>
							<option value="Dog">Dog</option>
							<option value="Pig">Pig</option>
						</select>
					</label>
					<label>
						<span>Blood Type:</span>
						<select value={personA.blood} onChange={(e) => setPersonA({...personA, blood: e.target.value as BloodType})}>
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="AB">AB</option>
							<option value="O">O</option>
						</select>
					</label>
				</div>
			</form>

			<form onSubmit={handleSubmit}>
				<h2 className="person">PERSON B</h2>
				<div className="fields">
					<label>
						<span>First Name:</span>
						<input 
							type="text"
							placeholder="Enter name"
							value={personB.name}
							onChange={(e) => setPersonB({ ...personB, name: e.target.value })}
							/>
					</label>
					<label>
						<span>Zodiac Star Sign:</span>
						<select value={personB.starSign} onChange={(e) => setPersonB({...personB, starSign: e.target.value as StarSign})}>
							<option value="Aries">Aries</option>
							<option value="Taurus">Taurus</option>
							<option value="Gemini">Gemini</option>
							<option value="Cancer">Cancer</option>
							<option value="Leo">Leo</option>
							<option value="Virgo">Virgo</option>
							<option value="Libra">Libra</option>
							<option value="Scorpio">Scorpio</option>
							<option value="Saggitarius">Saggitarius</option>
							<option value="Capricorn">Capricorn</option>
							<option value="Aquarius">Aquarius</option>
							<option value="Pisces">Pisces</option>
						</select>
					</label>
					<label>
						<span>MBTI:</span> 
						<select value={personB.mbti} onChange={(e) => setPersonB({...personB, mbti: e.target.value as MBTI})}>
							<option value="INFP">INFP</option>
							<option value="ENFP">ENFP</option>
							<option value="INFJ">INFJ</option>
							<option value="ENFJ">ENFJ</option>
							<option value="INTJ">INTJ</option>
							<option value="ENTJ">ENTJ</option>
							<option value="INTP">INTP</option>
							<option value="ENTP">ENTP</option>
							<option value="ISFP">ISFP</option>
							<option value="ESFP">ESFP</option>
							<option value="ISTP">ISTP</option>
							<option value="ESTP">ESTP</option>
							<option value="ISFJ">ISFJ</option>
							<option value="ESFJ">ESFJ</option>
							<option value="ISTJ">ISTJ</option>
							<option value="ESTJ">ESTJ</option>
						</select>
					</label>
					<label>
						<span>Chinese Zodiac Animal:</span>
						<select value={personB.zodiac} onChange={(e) => setPersonB({...personB, zodiac: e.target.value as ZodiacAnimal})}>
							<option value="Rat">Rat</option>
							<option value="Ox">Ox</option>
							<option value="Tiger">Tiger</option>
							<option value="Rabbit">Rabbit</option>
							<option value="Dragon">Dragon</option>
							<option value="Snake">Snake</option>
							<option value="Horse">Horse</option>
							<option value="Goat">Goat</option>
							<option value="Monkey">Monkey</option>
							<option value="Rooster">Rooster</option>
							<option value="Dog">Dog</option>
							<option value="Pig">Pig</option>
						</select>
					</label>
					<label>
						<span>Blood Type:</span>
						<select value={personB.blood} onChange={(e) => setPersonB({...personB, blood: e.target.value as BloodType})}>
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="AB">AB</option>
							<option value="O">O</option>
						</select>
					</label>
				</div>
			</form>
		</div>

		<div className="button-container">
			<button type="button" onClick={handleSubmit} disabled={loading}>
				{loading ? 'Calculating...' : 'Calculate!'}
			</button>
		</div>	

		{showResults && result && (
			<Element name="results-section">
				<div className="results">
					<h3>Compatibility Score: {result.score}%</h3>
					<pre>{JSON.stringify(result, null, 2)}</pre>
				</div>
			</Element>
		)}

		<ToastContainer 
			aria-label={''}
			theme="colored"
			position="bottom-left"
			autoClose={2000}
			hideProgressBar={true}
			newestOnTop={false}
				closeButton={false}
			rtl={false}
			draggable
		/>
	</>
  	)
}

export default App
