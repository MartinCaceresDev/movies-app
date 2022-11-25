/**
 *
 * @param {String} page
 * @param {String} id
 * @param {String} runtime - If this is truthy it indicates the content is a movie.
 * @param {String} number_of_seasons  - If this is truthy it indicates the content is a tv show.
 */

export const addToStorage = (page, id, runtime, number_of_seasons) => {
	const storage = JSON.parse(localStorage.getItem('users'));
	if (page === 'Movies') {
		storage[storage.length - 1]?.addedList.movies.push(id);
	} else if (page === 'TV') {
		storage[storage.length - 1]?.addedList.tv.push(id);
	} else if (page === 'New & Popular' || page === 'My List') {
		if (runtime) {
			storage[storage.length - 1]?.addedList.movies.push(id);
		}
		if (number_of_seasons) {
			storage[storage.length - 1]?.addedList.tv.push(id);
		}
	}
	localStorage.setItem('users', JSON.stringify(storage));
};
