import axios from 'axios';
import {Person, CompatibilityResult} from '../../backend/src/types';

// handles communication with backend 
export async function calculateCompatibility(personA: Person, personB: Person): Promise<CompatibilityResult> {
    const response = await axios.post<CompatibilityResult>(
        "http://localhost:6000/api/calculate", 
        { personA, personB }
    );
    return response.data;
}