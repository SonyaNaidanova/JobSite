import { createAsyncThunk } from '@reduxjs/toolkit';

export type Job = {
  id: number;
  name: string;
  company_name: string;
  city: string;
  salary: string;
  experience: string;
  space: 'office' | 'remote' | 'hybrid';
  skills: string;
};

export type JobDetails = Job & {
  description: string;
  about_company: string;
};

interface FetchJobsArgs {
  search: string;
  city: string | null;
  skills: string[];
  page: number;
}

// Загрузка списка вакансий
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (
    { search, city, skills, page }: FetchJobsArgs,
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      if (search) params.append('search', search);
      if (city && city !== 'Все') params.append('city', city);
      if (skills.length > 0) {
        params.append('skills', skills.join(','));
      }

      params.append('page', page.toString());
      params.append('limit', '10');

      const response = await fetch(
        `https://kata-jobs.onrender.com/api/jobs?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('Ошибка сервера!');
      }

      const data = await response.json();
return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Неизвестная ошибка загрузки'
      );
    }
  }
);

// Загрузка одной вакансии
export const fetchJobById = createAsyncThunk<
  JobDetails,
  string,
  { rejectValue: string }
>(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://kata-jobs.onrender.com/api/jobs/${id}`
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Вакансия не найдена'
            : 'Не удалось загрузить вакансию'
        );
      }

      const data: { success: boolean; job: JobDetails } =
  await response.json();

return data.job;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Неизвестная ошибка загрузки'
      );
    }
  }
);