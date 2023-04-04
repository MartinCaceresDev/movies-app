import { addToStorage, removeFromStorage } from ".";

/**
 * @param {Boolean} addedToList - (boolean)
 * @param {String} page - (string) name of the page
 * @param {String} id - (string)
 * @param {String} runtime - (string) If this is truthy, indicates that content is a movie.
 * @param {String} number_of_seasons - (string) If this is truthy, indicates that content is a tv show.
 */

export const onAddRemoveFromList = (addedToList, page, id, runtime, number_of_seasons) => {
  const storage = JSON.parse(localStorage.getItem('users'));
  if (storage && !addedToList) {
    addToStorage(page, id, runtime, number_of_seasons);
  } else if (storage && addedToList) {
    removeFromStorage(page, id, runtime, number_of_seasons)
  }
};
