import { useQuery } from "@tanstack/react-query";

export interface ArtObject {
    "objectID": number,
    "isHighlight": boolean,
    "accessionNumber": string,
    "isPublicDomain": boolean,
    "department": string,
    "title": string,
    "objectDate": string,
    "objectBeginDate": number,
    "objectEndDate": number,
    "dimensions": string,
    "metadataDate": string,
    "repository": string,
    "objectURL": string,
    "isTimelineWork": boolean,
    "message": string
    "measurements": [],
}

interface ResultDataProps {
    objectID: number
}

export function SearchObjectResult(props: ResultDataProps) {

    const { objectID } = props
    const { isPending, error, data } = useQuery({
        queryKey: ['objects', objectID],
        queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then((response) => response.json() as Promise<ArtObject>),
    })
    if (isPending) {
        return; // set a return
    }
    if (error) {
        return; // set a return
    }

    // create card
    return <>
        <h2>{data.title}</h2>
    </>;
}