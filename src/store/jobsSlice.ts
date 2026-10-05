import { createSlice } from '@reduxjs/toolkit';
import {
  fetchJobs,
  fetchJobById,
  type Job,
  type JobDetails,
} from './jobsThunks';

interface JobsState {
  jobsList: Job[];
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  currentJob: JobDetails | null;
  isDetailsLoading: boolean;
  detailsError: string | null;
}

const initialState: JobsState = {
  jobsList: [],
  totalPages: 1,
  isLoading: false,
  error: null,

  currentJob: null,
  isDetailsLoading: false,
  detailsError: null,
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobsList = action.payload.jobs;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          'Ошибка загрузки списка';
      })

      // Одна вакансия
      .addCase(fetchJobById.pending, (state) => {
        state.isDetailsLoading = true;
        state.detailsError = null;
        state.currentJob = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isDetailsLoading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isDetailsLoading = false;
        state.detailsError =
          action.payload ??
          action.error.message ??
          'Ошибка загрузки вакансии';
      });
  },
});

export default jobsSlice.reducer;