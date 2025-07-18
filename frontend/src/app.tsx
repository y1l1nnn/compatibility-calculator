import { useState } from 'react';
import axios from 'axios';
import {Person, CompatibilityResult} from '../../backend/src/types';

const [result, setResult] = useState(null);     // holds compatibility calculation response
const [loading, setLoading] = useState(false);  // track waiting for API response

