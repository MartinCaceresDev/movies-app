import useSWRImmutable from 'swr/immutable';
import { movieGenres, tvGenres } from '../utils';

const getGenres = async (url)=>{
  const res = await fetch(url);
  return res.json();
};

export const useGetGenres = (page)=>{

  let key = null;
  
  const allowedPages = ['Movies', 'TV'];

  if(allowedPages.includes(page)){
    key = (page === 'Movies') ? movieGenres : tvGenres
  }

  const { data, error, isLoading } = useSWRImmutable(key, getGenres);

  return {
    genres: data?.genres, 
    error, 
    isLoading
  }
};