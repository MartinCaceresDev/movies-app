import { useState } from 'react';
import axios from 'axios';
import { movieGenres, tvGenres } from '../utils/links';

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
