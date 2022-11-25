import axios from 'axios';

export const fetchItems = async (linksArray = []) => {
	const results = [];
	let counter = 0;
	try {
		do {
			const content = await axios.get(linksArray[counter]);
			results.push(content.data);
			++counter;
		} while (counter < linksArray.length);
	} catch (err) {
		console.error(err);
	}
	return results;
};
