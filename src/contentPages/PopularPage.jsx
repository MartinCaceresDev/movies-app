import { Featured, List } from '../components';


export function PopularPage() {

	const page = 'New & Popular';

	return (
		<>
			<Featured page={page} />
        
			<List listTitle= {{name: 'Popular', id: null}} page={page} />

		</>
	);
}


