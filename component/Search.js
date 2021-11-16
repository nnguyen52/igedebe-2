import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { dateFormat } from '../utils/dateFormat';
import { useRouter } from 'next/dist/client/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { apiURL } from '../utils/constants';
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce(search, 1000);
  const inputRef = useRef();

  const fetchGames = async () => {
    const res = await axios.post(`${apiURL}/api/searchGames/${debouncedSearch}`);
    return res.data;
  };

  useEffect(() => {
    setIsLoading(false);
    setSearch('');
    setResults([]);
  }, [router.pathname]);

  useEffect(() => {
    if (!inputRef) return;
    return inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    if (!debouncedSearch) setResults([]);
    if (isLoading) return;
    if (debouncedSearch) {
      setIsLoading(true);
      (async () => {
        const response = await fetchGames();
        setResults(response);
        setIsLoading(false);
      })();
    }
  }, [debouncedSearch]);

  return (
    <span className="d-flex search_container">
      <input
        type="text"
        placeholder="Search..."
        className="input"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={inputRef}
      />
      {!isLoading && results.length > 0 && (
        <div className="root_search_layer">
          <div
            className="clear_icon"
            onClick={() => {
              setIsLoading(false);
              setSearch('');
              setResults([]);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="results_container">
            {results.map((game, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setIsLoading(false);
                    setSearch('');
                    setResults([]);
                  }}
                >
                  <Link href={`/games/${game.id}`}>
                    <a>
                      <div className="result_container">
                        {game?.cover?.image_id && (
                          <Image
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover.image_id}.jpg`}
                            alt=""
                            width={90}
                            height={128}
                          />
                        )}
                        <div className="info">
                          <span className="name">{game.name}</span>
                          <br />
                          <span className="date">
                            {game.first_release_date && dateFormat(game.first_release_date)}
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => {
              setIsLoading(false);
              setSearch('');
              setResults([]);
            }}
            className="clear_search_Btn"
          >
            Clear Search
          </div>
        </div>
      )}
    </span>
  );
};

export default Search;
