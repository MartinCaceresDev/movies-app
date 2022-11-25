import { useState } from 'react';
import { askingForContentIds, fetchItems, preparingLinks } from '../utils';

/**
 * @returns {Array} - Returns Array with two elements. First is an object { } with 'fetchedData', 'pending' and 'error'.
 * Second is 'setFetchedData' function to receive and process variables needed.
 */

export const useFetchContents = () => {
	const [fetchedData, setFetchedDataState] = useState(false);
	const [pending, setPending] = useState(true);
	const [error, setError] = useState(null);

	/**
	 * @param {String} page - Name of the page
	 * @param {Object} listObject - Object with two properties: 'name' (string) and 'id' (string) (optional).
	 * @param {String} listObject.name
	 * @param {String} listObject.id - (Optional)
	 * @param {Object} idsObject - (Optional) Object. If page is 'My List', must have properties 'movies' 
	 and/or 'tv' arrays of ids. For other pages it must only have 'ids' property (an array of ids).
	 * @param {String[]} idsObject.movies - Only in 'My List' page.
	 * @param {String[]} idsObject.tv - Only in 'My List' page.
	 * @param {String[]} idsObject.ids - For all pages except 'My List'.
	* @param {String} empty - (Optional) If page is 'My List' and list is empty, this param can receive a string 
	with "empty" term.
	 */

	const setFetchedData = async (page, listObject, idsObject, empty) => {
		setPending(true);
		if (page === 'My List' && !idsObject && listObject.name !== 'Featured') {
			setPending(false);
			return;
		}
		if (empty) {
			setFetchedDataState(null);
			setPending(false);
			return;
		}

		let ids = {};
		if (listObject.name !== 'My List') {
			ids[ids] = await askingForContentIds(page, listObject);
		} else {
			ids = idsObject;
		}
		const links = await preparingLinks(page, listObject, ids);
		const itemsList = await fetchItems(links);
		setFetchedDataState(itemsList);
		setError(false);
		setPending(false);
	};

	return [{ fetchedData, pending, error }, setFetchedData];
};
