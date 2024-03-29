/**
 * 
 * @param {{name: string; id: string | null}} listTitle - (Object) With name and id of the list.
 * @param {String} page - (String) Name of the page.
 * @param {Function} setFetchedData - (Function)
 */

// export const getStorageMyList = (listTitle, page, setFetchedData) => {

// 	if (page !== 'My List') {
// 		setFetchedData(page, listTitle);
// 		return;
// 	}
	
// 	let contentIds = [];
// 	const storage = JSON.parse(localStorage.getItem('users'));
	
// 	contentIds = !!storage && storage[storage.length - 1]?.addedList;

// 	if (contentIds.movies?.length || contentIds.tv?.length) {
// 		setFetchedData(page, listTitle, contentIds);
// 	} else {
// 		// fourth argument (optional) indicates if list is empty
// 		setFetchedData(false, false, false, true);
// 	}
// };

export const getStorageMyListNew = () => {
	
	let contentIds = [];
	const storage = JSON.parse(localStorage.getItem('users'));
	
	contentIds = !!storage && storage[storage.length - 1]?.addedList;

	if (contentIds.movies?.length || contentIds.tv?.length) {
		return contentIds;
	} else return null;
};
