import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

// const tvLink = `https://api.themoviedb.org/3/tv/{tv_id}/credits?language=en-US`;
// const movieLink = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

export const getCredits = async (id, type) => {
	try {
		if (type === 'movie') {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
			);
			return data.cast;
		} else if (type === 'TV') {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
			);
			return data.cast;
		}
	} catch (err) {
		console.log(err);
	}
};
