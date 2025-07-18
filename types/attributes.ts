export interface Person {
    initials: string;
    starSign: StarSign;
    mbti: MBTI;
    zodiac: ZodiacAnimal;
    blood: BloodType;
}

export type StarSign = 
    "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | 
    "Virgo" | "Libra" | "Scorpio" | "Saggitarius" | 
    "Capricorn" | "Aquarius" | "Pisces";   

export type MBTI = `${'E'|'I'}${'S'|'N'}${'T'|'F'}${'J'|'P'}`;

export type ZodiacAnimal = 
    "Rat" | "Ox" | "Tiger" | "Rabbit" | 
    "Dragon" | "Snake" | "Horse" | "Goat" |
    "Monkey" | "Rooster" | "Dog" | "Pig";

export type BloodType = "A" | "B" | "O" | "AB";

export interface CompatibilityResult {
  score: number;
  breakdown: {
    initials: number;
    starSigns: number;
    mbti: number;
    zodiac: number;
    blood: number;
  };
}
