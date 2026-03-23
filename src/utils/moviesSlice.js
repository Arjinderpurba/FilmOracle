import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,    // Changed to lowercase
        topRatedMovies: null,   // Changed to lowercase
        upcomingMovies: null,   // Changed to lowercase
    },
    reducers: {
        addNowPlayingMovies : (state,action) =>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies : (state,action) =>{
            state.popularMovies = action.payload;  // Changed to lowercase
        },
        addTopRatedMovies : (state,action) =>{
            state.topRatedMovies = action.payload;  // Changed to lowercase
        },
        addUpcomingMovies : (state,action) =>{
            state.upcomingMovies = action.payload;  // Changed to lowercase
        },
        addTrailerVideo: (state,action) =>{
            state.trailerVideo = action.payload;
        }
    }
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpcomingMovies } = moviesSlice.actions;
export default moviesSlice.reducer;