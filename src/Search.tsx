import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchObjectResult } from './SearchObjectResult';
import { useSearchParams } from "react-router";


interface ObjectIDListResponse {
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
        queryKey: ['art_objects', search],
        queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`).then((response) => response.json() as Promise<ObjectIDListResponse>),
        placeholderData: keepPreviousData,
    })
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (data.message == "Not Found") {
        return <div>Error: {data.message}</div>;
    }
    console.log(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
    console.log(data)
    const data_found = data.total !== 0
    const results = data_found ? data.objectIDs.slice(0, 4) : [];

    //const handleQuery = (e: React.FormEvent) => {
    //setSearchParams({ search: e.target.value });
    //}

    return <>
        <form>
            <input id="search" name="search" type="text" placeholder="Search for an object..." onChange={(e) => {
                setSearchParams({ search: e.target.value });
            }} />
        </form>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {data_found ? results.map((result) => (
                <SearchObjectResult key={result} objectID={result} />
            )) : <h1>Nothing found</h1>}
        </div>
    </>

}