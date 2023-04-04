import { useState } from 'react';
import axios from 'axios';
import { movieGenres, tvGenres } from '../utils/links';

/**
 * 
 * @returns {[{ fetchedGenres: {name: string; id: string | null}[]; pending: boolean; error: any }, function]} - Returns array with two arguments:
 * First one is an object with three properties: "fetchedGenres" array of objects, pending (boolean) and error.
 * Second one is a function to fetch genres.
 */

export const useFetchGenres = () => {
	const [fetchedGenres, setFetchedGenresState] = useState(false);
	const [pending, setPending] = useState(true);
	const [error, setError] = useState(null);

	const setFetchedGenres = async (listName) => {
		setPending(true);
		try {
			if (listName === 'MovieGenres' || listName === 'TVGenres') {
				const genresLink = listName === 'MovieGenres' ? movieGenres : tvGenres;
				const { data } = await axios.get(genresLink);
				setFetchedGenresState(data.genres);
				return;
			}
			setPending(false);
		} catch (err) {
			console.log(err);
			setError(err);
			setPending(false);
		}
	};

	return [{ fetchedGenres, pending, error }, setFetchedGenres];
};
