import { useState, createContext, useContext } from 'react';

const Context = createContext();
export const GetContext = () => useContext(Context);


export const AppContextContainer = ({ children }) => {

  const [storageUpdated, setStorageUpdated] = useState(0);

  return (
    <Context.Provider value={{ storageUpdated, setStorageUpdated }} >
      {children}
    </Context.Provider>
  )
}
