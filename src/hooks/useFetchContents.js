import { useState } from 'react';
import { askingForContentIds, fetchItems, preparingLinks } from '../utils';

/**
 * @returns {[{fetchedData:[]; pending: boolean, error: null | false | object}, function]} - Returns Array with two elements. 
 * First is an object { } with 'fetchedData', 'pending' and 'error'.
 * Second is 'setFetchedData' function to receive and process variables needed for data fetching.
 */

export const useFetchContents = () => {
	const [fetchedData, setFetchedDataState] = useState(false);
	const [pending, setPending] = useState(true);
	const [error, setError] = useState(null);

	const setFetchedData = async (page, listObject, idsObject, isEmpty=false) => {
		setPending(true);
		// If page is My List, third argument "idsObject" must come. Otherwise we just exit this function (return).
		if (page === 'My List' && !idsObject && listObject.name !== 'Featured') {
			setPending(false);
			return;
		}
		// If list is empty we don't fetch.
		if (isEmpty) {
			setFetchedDataState(null);
			setPending(false);
			return;
		}

		let ids = {};
		
		// When it's just a normal list
		if (listObject.name !== 'My List') {
			ids[ids] = await askingForContentIds(page, listObject);
		} else {
			// When page is My List we receive the third argument "idsObject"
			ids = idsObject;
		}

		// We now have the ids so we can just prepare the proper urls
		const links = await preparingLinks(page, listObject, ids);

		// With urls we can fetch the contents data
		const itemsList = await fetchItems(links);

		// Return
		setFetchedDataState(itemsList);
		setError(false);
		setPending(false);
	};

	return [{ fetchedData, pending, error }, setFetchedData];
};
