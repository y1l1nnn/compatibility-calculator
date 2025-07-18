import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {Person} from './types'

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

// read attr_compatibility.json 
const pathname = path.join(__dirname, 'compatibility.json');
const data = fs.readFileSync(pathname, 'utf-8');
const compatibilityData = JSON.parse(data);

// get score of given attribute 
function getScore(attr: keyof Person, a: string, b: string): number {
    const score = compatibilityData[attr][a][b];
    return score;
}

// endpoint to calculate results 
app.post('/api/calculate', (req, res) => {
    const {personA, personB} = req.body 
    const initialsScore = 0;
    const starScore = getScore("starSign", personA.starSign, personB.starSign);
    const mbtiScore = getScore("mbti", personA.mbti, personB.mbti);
    const zodiacScore = getScore("zodiac", personA.zodiac, personB.zodiac); 
    const bloodScore = getScore("blood", personA.blood, personB.blood);  
    const finalScore = Math.round(initialsScore * 0.1 + starScore * 0.3 + mbtiScore * 0.4 + zodiacScore * 0.1 + bloodScore * 0.1);
    res.json({ 
        score: finalScore,
        breakdown: {
            initials: initialsScore,
            starSign: starScore,
            mbti: mbtiScore,
            zodiac: zodiacScore, 
            blood: bloodScore
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});