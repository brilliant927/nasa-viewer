import React from 'react';
import { useCallback, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Collections from '../components/Collections';
import { Collection } from "../types/collection";
import { apiService } from '../services/api.service';
import Spinner from '../components/ui-kit/spinner';

export default function Home() {
  const [collections, setCollections] = useState<Array<Collection>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback((query: string, startAt: string, endAt: string) => {
    const queryUrl = ('media_type=image&q=' + query) + (startAt === '' ? '' : '&year_start=' + startAt) + (endAt === '' ? '' : '&year_end=' + endAt);
    setIsLoading(true);
    window.history.replaceState(null, '', '?' + queryUrl);
    apiService.collections(queryUrl)
    .then(({ collection }) => {
      setCollections(collection.items);
    })
    .catch(({reason})=>{
      setCollections([]);
      alert(reason);
    })
    .finally(() => setIsLoading(false));

  }, []);
  
  return (
    <main className="m-6">
      <SearchBar onSearch={handleSearch} />
      <Collections collections={collections} />
       {isLoading && <Spinner isLoading={isLoading}/>}
    </main>
  );
}