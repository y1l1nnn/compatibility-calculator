import express from 'express';
import cors from 'cors';
import {Person} from './types'

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

function getScore(attr: keyof Person, a: string, b: string): number {
    return 1
}

app.post('/api/calculate', (req, res) => {
    const {personA, personB} = req.body 
    res.json({})
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});