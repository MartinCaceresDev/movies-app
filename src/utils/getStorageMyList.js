export const getStorageMyList = (listTitle, page, setFetchedData) => {
	let contentIds = [];
	const storage = JSON.parse(localStorage.getItem('users'));
	if (page !== 'My List') {
		setFetchedData(page, listTitle);
		return;
	} else if (page === 'My List') {
		contentIds = !!storage && storage[storage.length - 1]?.addedList;
	}

	if (contentIds.movies?.length || contentIds.tv?.length) {
		setFetchedData(page, listTitle, contentIds);
	} else {
		setFetchedData(false, false, false, 'empty');
	}
};
