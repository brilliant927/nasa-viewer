import React, { useCallback, useEffect, useState} from 'react';
import queryString from 'query-string';

interface IProps {
  onSearch: (query: string, startAt: string, endAt: string) => void;
}

export default function SearchBar({ onSearch }: IProps) {
  const [query, setQuery] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [validates, setValidates] = useState({
    query: true,
    startAt: true,
    endAt: true
  });
  let {q, year_start, year_end } = queryString.parse(window.location.search);
  
  const handleChangeQuery = useCallback((evt: any) => {
    setValidates(prevState => ({...prevState, query: true}));
    setQuery(evt.target.value);
  }, []);

  const handleChangeStartAt =  useCallback((evt: any) => {
    setValidates(prevState => ({...prevState, startAt: true}));
    setStartAt(evt.target.value);
  }, []);

  const handleChangeEndAt =  useCallback((evt: any) => {
    setValidates(prevState => ({...prevState, endAt: true}));
    setEndAt(evt.target.value);
  }, []);

  const searchQueryParam = useCallback((q: string, yeartStart: string, yearEnd: string) => {
    const year = /^\d{4}$/;
    if (q && q.length === 0) {
      setValidates(prevState => ({...prevState, query: false}));
    } else if (yeartStart && yeartStart.length !== 0 && !year.test(yeartStart)) {
      setValidates(prevState => ({...prevState, startAt: false}));
    } else if (yearEnd && yearEnd.length !== 0 && !year.test(yearEnd)) {
      setValidates(prevState => ({...prevState, endAt: false}));
    } else {
      onSearch(q, yeartStart, yearEnd);
    }
  }, [onSearch]);  
  
  const handleSearchButton = () => {
    const year = /^\d{4}$/;
    if (query.length === 0) {
      setValidates(prevState => ({...prevState, query: false}));
    } else if (startAt.length !== 0 && !year.test(startAt)) {
      setValidates(prevState => ({...prevState, startAt: false}));
    } else if (endAt.length !== 0 && !year.test(endAt)) {
      setValidates(prevState => ({...prevState, endAt: false}));
    } else {
      onSearch(query, startAt, endAt);
    }
  };

  useEffect(() =>{
      if(q) {
        setQuery(q.toString());
      }
      if(year_start) {
        setStartAt(year_start.toString());
      } else {
        year_start = '';
      }
      if(year_end) {
        setEndAt(year_end.toString());
      } else {
        year_end = '';
      }
      if (q) {
        searchQueryParam(q as string, year_start as string, year_end as string);
      }
  }, [q, year_start, year_end, searchQueryParam]);

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <div className="flex  justify-center flex-wrap gap-4" >
        <div className="flex flex-col">
          <input data-testid='query' className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${!validates.query ? 'border-red-600' : 'border-black'}`} type="text" value={query} placeholder="Query" onChange={handleChangeQuery} />
          <label data-testid='invalid-query' className={`text-red-600 ${!validates.query ? 'block' : 'hidden'}`} >Invalid Query</label>
        </div>
        <div className="flex flex-col">
          <input data-testid='startAt' className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${!validates.startAt ? 'border-red-400' : 'border-black'}`}  value={startAt} placeholder="Start Year" onChange={handleChangeStartAt} />
          <label className={`text-red-600 ${!validates.startAt ? 'block' : 'hidden'}`} >Invalid Start Year</label>
        </div>
        <div className="flex flex-col">
          <input data-testid='endAt' className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${!validates.endAt ? 'border-red-400' : 'border-black'}`}  value={endAt} placeholder="End Year" onChange={handleChangeEndAt} />
          <label className={`text-red-600 ${!validates.endAt ? 'block' : 'hidden'}`} >Invalid End Year</label>
        </div>
      </div>
      <div>
      <button data-testid="search-button" type="button" onClick={handleSearchButton} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
      </div>
    </div>
  );
}