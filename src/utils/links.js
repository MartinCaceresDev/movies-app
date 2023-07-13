const API_KEY = import.meta.env.VITE_API_KEY;

// MOVIES LINKS
export const movieGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
export const byGenderMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`;
export const movieBeforeMovieID = `https://api.themoviedb.org/3/movie/`;
export const movieAfterMovieID = `?api_key=${API_KEY}&append_to_response=videos,images`;

// TV SHOWS LINKS
export const tvGenres = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;
export const popularTVShows = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const topRatedTVShows = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
export const byGenderTV = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=`;
export const tvShowBeforeID = `https://api.themoviedb.org/3/tv/`;
export const tvShowAfterID = `?api_key=${API_KEY}&append_to_response=videos,images`;

