import { useEffect } from 'react';
import { useFetchGenres } from '../hooks/useFetchGenres';
import { Featured, List } from '../components';
import { customListsTitles } from '../utils'


export function MoviesPage() {
	const [ { fetchedGenres: fetchedMovieGenres }, setFetchedMovieGenres ] = useFetchGenres();
	const page = 'Movies';

	useEffect(()=>{
		setFetchedMovieGenres('MovieGenres');
	},[]);

	return (
		<>
			<Featured page={page} />
			
			{ customListsTitles.map((title)=> <List key={title.name} page={page} listTitle={title} />) }
			{ fetchedMovieGenres && fetchedMovieGenres.map((title)=> <List key={title.name} page={page} listTitle={title} />)}

		</>
	);
}


