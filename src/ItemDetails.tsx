import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ArtObject } from "./SearchObjectResult";

export function ItemDetails() {

    const { item_id } = useParams();
    const objectID = Number(item_id);

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

    return (<div style={{ padding: "2rem", backgroundColor: "grey" }}>
        <h1>{data.title}</h1>
        {data.primaryImageSmall && (
            <img
                src={data.primaryImageSmall}
                alt={data.title}
                style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
            />
        )}
        <p><strong>Artist:</strong> {data.artistDisplayName || "Unknown"}</p>
        <p><strong>Date:</strong> {data.objectDate}</p>
        <p><strong>Medium:</strong> {data.medium}</p>
        <p><strong>Department:</strong> {data.department}</p>
        <p><strong>Dimensions:</strong> {data.dimensions}</p>
        <p><strong>Classification:</strong> {data.classification}</p>
        <p><strong>Credit Line:</strong> {data.creditLine}</p>
        <p><a href={data.objectURL} target="_blank" rel="noopener noreferrer">MetMuseum.org</a></p>
    </div>
    );
}