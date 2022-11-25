import { Featured, List } from '../components';


export function MyListPage() {

	const page = 'My List';

	return (
		<>
			<Featured page={page} />

			<List listTitle=	{{name: page, id: null}} page={page} /> 

		</>
	);
}


