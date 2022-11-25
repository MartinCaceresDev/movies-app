
import { useEffect } from 'react';
import { useFetchGenres } from '../hooks/useFetchGenres';
import { Featured, List } from '../components';
import { customListsTitles } from '../utils'


export function TVPage() {
	const [ { fetchedGenres: fetchedTVGenres }, setFetchedTVGenres ] = useFetchGenres();
	const page = 'TV';

	useEffect(()=>{
		setFetchedTVGenres('TVGenres');
	},[]);

	return (
		<>
			<Featured page={page} />
			
			{ customListsTitles.map((title)=> <List key={title.name} page={page} listTitle={title} />) }
			{ fetchedTVGenres && fetchedTVGenres.map((title)=> <List key={title.name} page={page} listTitle={title} />) }
				
		</>
	);
}


