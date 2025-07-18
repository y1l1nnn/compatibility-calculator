import axios from 'axios';
import {Person, CompatibilityResult} from '../../backend/src/types';

// handles communication with backend 
export async function calculateCompatibility(personA: Person, personB: Person): Promise<CompatibilityResult> {
  const response = await fetch("http://localhost:5000/api/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personA, personB }),
  });
  const data = await response.json();
  return data as CompatibilityResult;
}