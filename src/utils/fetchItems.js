import axios from 'axios';

/**
 * 
 * @param {string[]} linksArray - (string[]) Receives an array of content url to fetch.
 * @returns {Promise<object[]>} Array - Returns an array of content objects.
 */

// export const fetchItems = async (linksArray = []) => {
// 	const results = [];
// 	let counter = 0;
// 	try {
// 		do {
// 			const content = await axios.get(linksArray[counter]);
// 			content?.data && results.push(content.data);
// 			++counter;
// 		} while (counter < linksArray.length);
// 	} catch (err) {
// 		console.error(err);
// 	}
// 	return results;
// };

export const fetchItemsNew = async (linksArray = []) => {
	const results = [];
	let counter = 0;

	while (counter < linksArray.length) {
		const content = await axios.get(linksArray[counter]);
		content?.data && results.push(content.data);
		++counter;
	};
	
	return results;
};

