import { Featured, List } from '../components';
import { useGetGenres } from '../hooks/useGetGenres';
import { customListsTitles } from '../utils';

const page = 'TV';


export function TVPage() {

	const { genres, error, isLoading } = useGetGenres(page);

	return (
		<>
			<Featured page={page} />

			{customListsTitles.map((title) => <List key={title.name} page={page} listTitle={title} />)}
			{genres && genres.map((title) => <List key={title.name} page={page} listTitle={title} />)}

		</>
	);
}


