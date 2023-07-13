import { useEffect, useState } from "react";
import useSWRImmutable from 'swr/immutable'
import { GetContext } from "../context/AppContextContainer";
import { askingForContentIdsNew, fetchItemsNew, getStorageMyListNew, preparingLinks } from "../utils";


export const useGetContent = (page, listTitle)=>{
  const { storageUpdated } = GetContext();
  const [ myListIds, setMyListIds ] = useState(null);
  const [ fetchIdsKey, setFetchIdsKey ] = useState(null);
  const [ links, setLinks ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  const { data: totalIds, isLoading: isLoadingIds } = useSWRImmutable(fetchIdsKey, (fetchIdsKey)=>askingForContentIdsNew(fetchIdsKey))
  const { data: itemsList, error, isLoading: isLoadingLinks } = useSWRImmutable(links, (links)=>fetchItemsNew(links))

  useEffect(()=>{
    if(page !== 'My List'){
      !itemsList ? setIsLoading(true) : setIsLoading(false);
    } else if(listTitle === 'Featured'){
      (isLoadingIds || isLoadingLinks) ? setIsLoading(true) : setIsLoading(false)
    } else {
      !myListIds && setIsLoading(false)
    }
  },[page, itemsList, isLoadingIds, isLoadingLinks, myListIds])
  
  // checks for content ids from local storage
  useEffect(() => {
    if(page === 'My List'){
      const ids = getStorageMyListNew(); // returns null or ids (array)
      setMyListIds(prev => prev !== ids ? ids : prev)
    }
  }, [storageUpdated]);
  
  useEffect(()=>{
    if (page === 'My List' && !myListIds && listTitle.name !== 'Featured') setFetchIdsKey(null);
    else if(page === 'My List' && listTitle.name === 'Featured') setFetchIdsKey(['My List', listTitle])
    else if(page === 'My List' && myListIds) setFetchIdsKey(null)
    else setFetchIdsKey([ page, listTitle ])    
  },[page, listTitle, myListIds])
    
  
  useEffect(()=>{
    if(page === 'My List' && listTitle.name === 'Featured' && totalIds){
      let tempLinks = preparingLinks(page, listTitle, totalIds);
      setLinks(tempLinks);
    } else if(page === 'My List' && listTitle.name !== 'Featured' && myListIds){
      let tempLinks = preparingLinks(page, listTitle, myListIds);
      setLinks(tempLinks);
    } else if(page !== 'My List' && totalIds){
      let tempLinks = preparingLinks(page, listTitle, totalIds);
      setLinks(tempLinks);
    }
  },[totalIds, myListIds])

  return { 
    itemsList, 
    error, 
    isLoading
  }
};