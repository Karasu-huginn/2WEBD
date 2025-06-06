import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ObjectIDListResponse } from "./Search";
import { SearchObjectResult } from "./SearchObjectResult";
import { useState } from "react";

function getSearchParams(search: string, dateBegin: string, dateEnd: string, departmentId: string) {
    const parametersList = [search, dateBegin, dateEnd, departmentId];
    const cleanParametersList = parametersList.filter((word) => word.length > 0);
    if (cleanParametersList.length === 0) {
        return "?q="
    }
    const [initialValue, ...parameters] = cleanParametersList
    const params = parameters.reduce((accumulator, currentValue) => accumulator + "&" + currentValue,
        "?" + initialValue,)
    return params
}

export function AdvancedSearch() {
    const [search, setSearch] = useState("");
    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const params = getSearchParams(search, dateBegin, dateEnd, departmentId);
    const { isPending, error, data } = useQuery({
        queryKey: ['search', search],
        queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search${params}`).then((response) => response.json() as Promise<ObjectIDListResponse>),
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const data_found = data.total !== 0
    const results = data_found ? data.objectIDs.slice(0, 10) : [];

    return <>
        <form className="form" onSubmit={handleSearch}>
            <label>Keyword(s) of the object :</label>
            <input id="textSearch" name="textSearch" type="text" placeholder="Search for an object..." onChange={(e) => setSearch(e.target.value ? "q=" + e.target.value : "")} />
            <label>Department :</label>
            <input id="department" name="department" type="number" placeholder="Enter an ID" onChange={(e) => setDepartmentId(e.target.value ? "departmentId=" + e.target.value : "")} />
            <label>Date from :</label>
            <input id="dateFrom" name="dateFrom" type="number" placeholder="Enter a year" onChange={(e) => setDateBegin(e.target.value ? "dateBegin=" + e.target.value : "")} />
            <label>Date to :</label>
            <input id="dateTo" name="dateTo" type="number" placeholder="Enter a year" onChange={(e) => setDateEnd(e.target.value ? "dateEnd=" + e.target.value : "")} />
            <button type="submit">Rechercher</button>
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