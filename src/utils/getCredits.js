import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * 
 * @param {String} id - (String) Receives the content id.
 * @param {String} type - (String) Receives the content type.
 * @returns {string[]} String[] - Returns an array of actor/actress names.
 */

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
