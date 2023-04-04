/**
 *
 * @param {String} page - (string) Name of the page
 * @param {String} id - (string) The id of the movie or series.
 * @param {String} runtime - (truthy of falsy) If truthy it is a movie.
 * @param {String} number_of_seasons  - (truthy of falsy) If truthy it is a tv show.
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
