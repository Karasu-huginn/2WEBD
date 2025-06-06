import { keepPreviousData, useQuery } from '@tanstack/react-query';
import './App.css'
import type { ObjectIDListResponse } from './Search'
import { HighlightedItem } from './HighlightedItem';

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
  return (
    <>
      <h1>Oeuvres en vedette</h1>
      {results.map((result) => (
        <ul>
          <HighlightedItem key={result} objectID={result} />
        </ul>
      ))}
    </>
  )
}

export default App
