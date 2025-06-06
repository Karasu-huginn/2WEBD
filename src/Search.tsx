import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SearchObjectResult } from './SearchObjectResult';
import { useSearchParams } from "react-router";


export interface ObjectIDListResponse {
    previousOffset: number | null;
    nextOffset: number | null;
    objectIDs: number[];
    count: number;
    message: string;
    total: number;
}

export function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const { isPending, error, data } = useQuery({
        queryKey: ['search', search],
        queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`).then((response) => response.json() as Promise<ObjectIDListResponse>),
        placeholderData: keepPreviousData,
    })
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (data.message == "Not Found") {  // errors seems to be sent as data.message ?
        return <div>Error: {data.message}</div>;
    }
    const data_found = data.total !== 0
    const results = data_found ? data.objectIDs.slice(0, 10) : [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return <>
        <form onSubmit={handleSearch}>
            <input id="search" name="search" type="text" placeholder="Recherche rapide..." onChange={(e) => {
                setSearchParams({ search: e.target.value });
            }} />
            <button type="submit">Rechercher</button>
        </form>
        <div style={{ display: "table", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {data_found ? results.map((result) => (
                <ul>
                    <SearchObjectResult key={result} objectID={result} />
                </ul>
            )) : <h1>Aucun résultat trouvé. Essayez d'ajuster vos critères de recherche.</h1>}
        </div>
    </>

}