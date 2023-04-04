/**
 *
 * @param {String} page - (String) Name of the page.
 * @param {String} id - (String) Id of the content.
 * @param {String} runtime - (String) If truthy the content is a movie.
 * @param {String} number_of_seasons - (String) If truthy the content is a tv show.
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
		// depending on "runtime" or "number_of_seasons" we can know if it is a movie or tv show
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
