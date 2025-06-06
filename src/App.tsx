import { keepPreviousData, useQuery } from '@tanstack/react-query';
import './App.css'
import type { ObjectIDListResponse } from './Search'
import { HighlightedItem } from './HighlightedItem';
import { Search } from 'lucide-react';
import './style.css';

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['objects'],
    queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`).then((response) => response.json() as Promise<ObjectIDListResponse>),
    placeholderData: keepPreviousData,
  })
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const results = data.objectIDs.slice(0, 100)
  //console.log(results)


  return (
    <main className="main-content">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="search"
            placeholder="Search collection by title, artist, or department..."
            className="search-input"
          />
        </div>
      </div>

      {/* Highlighted Items */}
      <div>
        <h2 className="section-title">Highlighted Objects</h2>
        <div className="items-grid">
          {results.map((result) => (
            <HighlightedItem key={result} objectID={result} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App
