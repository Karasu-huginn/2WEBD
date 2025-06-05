import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ArtObject } from "./SearchObjectResult";

interface ResultDataProps {
    objectID: number
}

export function HighlightedItem(props: ResultDataProps) {
    const { objectID } = props
    const { isPending, error, data } = useQuery({
        queryKey: ['object', objectID],
        queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then((response) => response.json() as Promise<ArtObject>),
        placeholderData: keepPreviousData,
    })
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }


    // todo : create card
    if (data.isHighlight) {
        return <>
            <h1>{data.title}</h1>
        </>
    }
    else {
        return <></>
    }
}