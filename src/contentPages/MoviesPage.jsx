import { Featured, List } from '../components';
import { customListsTitles } from '../utils';
import { useGetGenres } from '../hooks/useGetGenres';

const page = 'Movies';


export function MoviesPage() {

	const { genres, error, isLoading } = useGetGenres(page);

	return (
		<>
			<Featured page={page} />

			{customListsTitles.map((title) => <List key={title.name} page={page} listTitle={title} />)}
			{genres && genres.map((title) => <List key={title.name} page={page} listTitle={title} />)}

		</>
	);
}


