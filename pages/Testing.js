import React, { useEffect } from 'react';
import { useJustReleaseGamesPagination } from '../useRequests';
const Testing = () => {
  const { games, error, isLoading, setPage, page } = useJustReleaseGamesPagination(0);
  useEffect(() => {
    for (let i = 0; i <= 10; i + 10) {
      setTimeout(() => {
        setPage(i);
        if (i === 10) setPage(0);
      }, 100);
    }
  }, []);
  if (isLoading || !games)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  if (!games && error)
    return (
      <>
        <h2>error</h2>
      </>
    );
  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Next
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      {games.length === 0 && !error && !isLoading && (
        <>
          <h2>No more content</h2>
        </>
      )}
      {games && !isLoading && !error && (
        <h2>
          {games.slice(0, 10).map((game, index) => {
            return <h2 key={index}>{game.name}</h2>;
          })}
        </h2>
      )}
    </div>
  );
};

export default Testing;
