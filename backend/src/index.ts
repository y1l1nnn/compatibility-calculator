import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Person } from './types';

const app = express();
const port = 5001; 

app.use(cors());
app.use(express.json());

// read attr_compat_scores.json and attr_compat_comments.json 
const pathname = path.join(__dirname, 'attr_compat_scores.json');
const data = fs.readFileSync(pathname, 'utf-8');
const compatibilityData = JSON.parse(data);

const pathname2 = path.join(__dirname, 'attr_compat_comments.json');
const data2 = fs.readFileSync(pathname2, 'utf-8');
const commentsData = JSON.parse(data2);

// get score of given attributes 
function getScore(attr: keyof Person, a: string, b: string): number {
	const score = compatibilityData[attr][a][b];
	return score;
}

// get comments on given attributes
function getComment(attr: keyof Person, a: string, b: string): string {
	const comment = commentsData[attr][a][b];
	return comment;
}

// calculate score for name 
function getNameScore(a: string, b: string): number {
	a = a.trim().toLowerCase();
	b = b.trim().toLowerCase();
	const regexp = /^[a-zA-Z]+$/;
	if (!a || !b) {
		throw new Error("Empty name");
	} else if (!regexp.test(a) || !regexp.test(b)) {
		throw new Error("Nonalphabetical characters");
	}
	const aNamank = calculateNameNumber(a).toString();
	const bNamank = calculateNameNumber(b).toString();

	return getScore("name", aNamank, bNamank);
}

// calculate the name number for a name
function calculateNameNumber(name: string) : number {
	const namankMap = new Map<number, string[]>();
	namankMap.set(1, ['a', 'j', 's']);
	namankMap.set(2, ['b', 'k', 't']);
	namankMap.set(3, ['c', 'l', 'u']);
	namankMap.set(4, ['d', 'm', 'v']);
	namankMap.set(5, ['e', 'n', 'w']);
	namankMap.set(6, ['f', 'o', 'x']);
	namankMap.set(7, ['g', 'p', 'y']);
	namankMap.set(8, ['h', 'q', 'z']);
	namankMap.set(9, ['i', 'r']);
	// get name character sum
	let namank = 0;
	for (const char of name) {
		namank += getKey(namankMap, char);
	}
	// reduce to single-digit number
	const single_digit = 9;
	while (namank > single_digit) {
		namank = namank.toString().split('').map(Number).reduce((a, b) => a + b, 0);
	}
	return namank;
}

// get key from value in Map
function getKey(map: Map<number, string[]>, char: string): number {
	for (let [key, values] of map.entries()) {
		if (values.includes(char)) return key;
	}
	throw new Error(`Unexpected character: ${char}`);
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
		const starComment = getComment("starSign", personA.starSign, personB.starSign);
		const mbtiComment = getComment("mbti", personA.mbti, personB.mbti);
		const zodiacComment = getComment("zodiac", personA.zodiac, personB.zodiac); 
		const bloodComment = getComment("blood", personA.blood, personB.blood);  

		console.log(starComment);
		res.json({ 
			score: finalScore,
			breakdown: {
				name: nameScore,
				starSign: starScore,
				mbti: mbtiScore,
				zodiac: zodiacScore,
				blood: bloodScore
			},
			comments: {
				starSign: starComment,
				mbti: mbtiComment,
				zodiac: zodiacComment,
				blood: bloodComment
			}
		});
	} catch (err) {
    	res.status(401).json({error: (err as Error).message});
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
});