import { useState, createContext, useContext } from 'react'; 
import { addToStorage, removeFromStorage } from '../utils';

const Context = createContext();
export const GetContext = ()=> useContext(Context);

const checkAddedToList = (id) => {
	const storage = JSON.parse(localStorage.getItem('users'));
	if (
		storage &&
		(storage[storage.length - 1]?.addedList.movies.includes(id) ||
			storage[storage.length - 1]?.addedList.tv.includes(id))
	) {
		return true;
	} else return false;
};


export const AppContextContainer = ({ children }) => {

  const [ storageUpdated, setStorageUpdated ] = useState(0);

  /**
   * @param {Boolean} addedToList 
   * @param {String} page 
   * @param {String} id 
   * @param {String} runtime - If this is truthy, indicates that content is a movie.
   * @param {String} number_of_seasons - If this is truthy, indicates that content is a tv show.
   */

  const onAddRemoveFromList = (
    addedToList,
    page,
    id,
    runtime,
    number_of_seasons
  ) => {
    const storage = JSON.parse(localStorage.getItem('users'));
    if (storage && !addedToList) {
      addToStorage(page, id, runtime, number_of_seasons);
    } else if (storage && addedToList) {
      removeFromStorage(page, id, runtime, number_of_seasons)
    }
    setStorageUpdated(storageUpdated + 1);
  };

  return (
    <Context.Provider value={{ checkAddedToList, storageUpdated, setStorageUpdated, onAddRemoveFromList }} >
      { children }
    </Context.Provider>
  )
}
