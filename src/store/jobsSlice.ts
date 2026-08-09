import { createSlice } from "@reduxjs/toolkit";
import { fetchJobs, type Job} from "./jobsThunks";

interface JobsState {
    jobsList: Job[];
    totalPages: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: JobsState = {
    jobsList: [],
    totalPages: 1,
    isLoading: false,
    error: null,
}

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
                state.error = action.payload as string;
            });
    }
});

export default jobsSlice.reducer;