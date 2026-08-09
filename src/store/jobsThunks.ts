import { createAsyncThunk } from "@reduxjs/toolkit";


export type Job = {
    id: number; 
    name: string; 
    company_name: string; 
    city: string;
    salary: string;
    experience: string;
    space: 'office' | 'remote' | 'hybrid';
    skills: string;
}

interface FetchJobsArgs {
    search: string;
    city: string | null;
    skills: string[];
    page: number;
}

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async function({ search, city, skills, page }: FetchJobsArgs, { rejectWithValue }) {
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (city && city !== 'Все') params.append('city', city);
            if (skills.length > 0) params.append('skills', skills.join(','));
            params.append('page', page.toString());
            params.append('limit', '10');

            const response = await fetch(`https://kata-jobs.onrender.com/api/jobs?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error('Ошибка сервера!');
            }
    
            const data = await response.json();

return data;
            
        } catch (error) {
            const err = error as Error;
            return rejectWithValue(err.message);
        }
    }
);