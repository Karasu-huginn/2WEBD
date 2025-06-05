import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import type { ObjectIDListResponse } from "./Search";
import { SearchObjectResult } from "./SearchObjectResult";

export function AdvancedSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const dateBegin = "dateBegin=${0}"
    const dateEnd = "dateEnd=${2000}"
    const departmentId = "departmentId=${0}"
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
    // on submit
    return <>
        <form className="form">
            <label>Keyword(s) of the object :</label>
            <input id="textSearch" name="textSearch" type="text" placeholder="Search for an object..." />
            <label>Department :</label>
            <input id="department" name="department" type="text" placeholder="Search for an object..." />
            <label>Date from :</label>
            <input id="dateFrom" name="dateFrom" type="text" placeholder="Enter a year" />
            <label>Date to :</label>
            <input id="dateTo" name="dateTo" type="text" placeholder="Enter a year" />
        </form>
        <div style={{ display: "table", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {data_found ? results.map((result) => (
                <ul>
                    <SearchObjectResult key={result} objectID={result} />
                </ul>
            )) : <h1>Aucun résultat trouvé. Essayez d'ajuster vos critères de recherche.</h1>}
        </div>
    </>;
}