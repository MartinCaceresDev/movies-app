/**
 * 
 * @param {String} id - (string) Id of the content.
 * @returns {Boolean} Boolean - It indicates if the content is added to the saved list in local storage.
 */

export const checkAddedToList = (id) => {
  const storage = JSON.parse(localStorage.getItem('users'));
  if (storage
    && (storage[storage.length - 1]?.addedList.movies.includes(id)
      || storage[storage.length - 1]?.addedList.tv.includes(id))
  ) {
    return true;
  } else return false;
};
