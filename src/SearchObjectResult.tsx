import './SearchObjectResult.css'
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";


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
    "primaryImageSmall": string,
    "classification": string,
    "medium": string,
    "creditLine": string,
    "artistNationality": string,
    "primaryImage": string,
    "artistDisplayName": string;
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
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <>
        <div style={{ display: "inline-flex", backgroundColor: "grey", borderRadius: 10, width: "1043px" }}>
            <div style={{ margin: 10 }}>
                {data.primaryImage && (
                    <img src={data.primaryImage} alt={data.title} style={{ width: "250px", height: "176px", objectFit: "cover" }} />
                )}
            </div>
            <div style={{ display: "table", padding: 22 }}>
                <Link to={`/item/${objectID}`}>
                    <h2 style={{ color: "white", textAlign: "start" }}>{data.title}</h2>
                </Link>
                <p style={{ textAlign: "start" }}>{data.artistDisplayName} ({data.artistNationality})</p>
                <p style={{ textAlign: "start" }}>Date: {data.objectDate}</p>
            </div>
        </div>
    </>;
}