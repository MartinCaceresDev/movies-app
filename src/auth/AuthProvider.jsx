import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js';
import { updateStorage } from '../utils';

const AuthContext = createContext();

export const useAuthContext = ()=>{
  return useContext(AuthContext);
};



export function AuthProvider({ children }){
  
  const navigate = useNavigate();
  
  const [ user, setUser ] = useState({})
  const [ loginError, setLoginError ] = useState(false);
  const [ registerError, setRegisterError ] = useState(false);
  
  
  const createUser = async (email, password)=>{
    let storage = JSON.parse(localStorage.getItem('users'));
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateStorage(email, storage);
      setUser(auth.currentUser);
      navigate('/', {replace: true});
    } catch(err){
      console.log(err);
      setRegisterError(err.message)
    }
  };
  
  const login = async (email, password)=>{
    let storage = JSON.parse(localStorage.getItem('users'));
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      setLoginError(false);
      updateStorage(email, storage);
      navigate('/', {replace: true})
    } catch(err){
      setLoginError(err.message);
    }
  };

  const logout = async ()=>{
    try {
      await signOut(auth);
      navigate('/login', {replace: true});
    } catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser);
    })
  },[]);


  return (
    <AuthContext.Provider value={{createUser, login, logout, user, loginError, registerError}}>
      {children}
    </AuthContext.Provider>
  );
}