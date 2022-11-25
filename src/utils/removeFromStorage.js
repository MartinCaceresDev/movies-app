/**
 *
 * @param {String} page
 * @param {String} id
 * @param {String} runtime - If this is truthy it indicates the content is a movie.
 * @param {String} number_of_seasons  - If this is truthy it indicates the content is a tv show.
 */

export const removeFromStorage = (page, id, runtime, number_of_seasons) => {
	const storage = JSON.parse(localStorage.getItem('users'));
	if (page === 'Movies') {
		const idToRemove = storage[storage.length - 1].addedList.movies.findIndex(
			(item) => item === id
		);
		storage[storage.length - 1].addedList.movies.splice(idToRemove, 1);
	} else if (page === 'TV') {
		const idToRemove = storage[storage.length - 1].addedList.tv.findIndex(
			(item) => item === id
		);
		storage[storage.length - 1].addedList.tv.splice(idToRemove, 1);
	} else if (page === 'New & Popular' || page === 'My List') {
		if (runtime) {
			const idToRemove = storage[storage.length - 1].addedList.movies.findIndex(
				(item) => item === id
			);
			storage[storage.length - 1].addedList.movies.splice(idToRemove, 1);
		}
		if (number_of_seasons) {
			const idToRemove = storage[storage.length - 1].addedList.tv.findIndex(
				(item) => item === id
			);
			storage[storage.length - 1].addedList.tv.splice(idToRemove, 1);
		}
	}
	localStorage.setItem('users', JSON.stringify(storage));
};
