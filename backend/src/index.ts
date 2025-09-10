import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {Person} from './types'

const app = express();
const port = 5001; 

app.use(cors());
app.use(express.json());

// read attr_compatibility.json 
const pathname = path.join(__dirname, 'attr_compat_scores.json');
const data = fs.readFileSync(pathname, 'utf-8');
const compatibilityData = JSON.parse(data);

// get score of given attribute 
function getScore(attr: keyof Person, a: string, b: string): number {
	const score = compatibilityData[attr][a][b];
	return score;
}

// calculate score for name 
function getNameScore(a: string, b: string): number {
	a = a.trim();
	b = b.trim();
	const regexp = /^[a-zA-Z]+$/;
	if (!a || !b) {
		throw new Error("Empty name");
	} else if (!regexp.test(a) || !regexp.test(b)) {
		throw new Error("Nonalphabetical characters");
	}
	return 0;
}

// endpoint to calculate results 
app.post('/api/calculate', (req, res) => {
	const {personA, personB} = req.body
	try {
		if (!personA || !personB) {
      		res.status(400).json({error: 'Both personA and personB are required'});
    	}
		const nameScore = getNameScore(personA.name, personB.name);
		const starScore = getScore("starSign", personA.starSign, personB.starSign);
		const mbtiScore = getScore("mbti", personA.mbti, personB.mbti);
		const zodiacScore = getScore("zodiac", personA.zodiac, personB.zodiac); 
		const bloodScore = getScore("blood", personA.blood, personB.blood);  
		const finalScore = Math.round(
			nameScore * 0.1 + 
			starScore * 0.3 + 
			mbtiScore * 0.4 + 
			bloodScore * 0.1 +
			zodiacScore * 0.1
		);
		res.json({ 
			score: finalScore,
			breakdown: {
				name: nameScore,
				starSign: starScore,
				mbti: mbtiScore,
				zodiac: zodiacScore, 
				blood: bloodScore
			}
		});
	} catch (err) {
    	res.status(401).json({error: (err as Error).message});
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
});