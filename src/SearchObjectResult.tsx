import './SearchObjectResult.css'
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import {
    Calendar,
    MapPin,
    Palette,
} from "lucide-react"


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
    "country": string,
    "artistDisplayName": string;
}

interface ResultDataProps {
    objectID: number
}

export function SearchObjectResult(props: ResultDataProps & { viewMode?: "grid" | "list" }) {

    const { objectID, viewMode = "grid" } = props;
    const { isPending, error, data } = useQuery({
        queryKey: ['object', objectID],
        queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then((response) => response.json() as Promise<ArtObject>),
    })
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return <>
        <div style={viewMode === "list"
            ? { display: "flex", gap: "16px", padding: "16px" }
            : {}
        }>
            {data.primaryImage ? (
                <img
                    src={data.primaryImage}
                    alt={data.title}
                    style={viewMode === "list"
                        ? { width: "96px", height: "96px", objectFit: "cover", borderRadius: "4px" }
                        : { width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }
                    }
                />
            ) : (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eee",
                    color: "#666",
                    fontStyle: "italic",
                    textAlign: "center",
                    borderRadius: "4px",
                    ...(viewMode === "list"
                        ? { width: "96px", height: "96px" }
                        : { width: "100%", height: "200px" })
                }}>
                    No Picture
                </div>
            )}
            <Link to={`/objects/${objectID}`}>
                <div style={viewMode === "list" ? { flex: 1 } : { padding: "16px" }}>
                    <div style={viewMode === "list" ? { display: "flex", alignItems: "flex-start", justifyContent: "space-between" } : {}}>
                        <div style={viewMode === "list" ? { flex: 1 } : {}}>
                            <h3 style={viewMode === "list" ? { fontWeight: "600", marginBottom: "4px", fontSize: "16px" } : { fontWeight: "600", marginBottom: "8px", fontSize: "16px" }}>{data.title}</h3>
                        </div>
                    </div>

                    <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#6b7280" }}>
                            <Calendar style={{ height: "12px", width: "12px", marginRight: "4px" }} />
                            {data.objectDate}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#6b7280" }}>
                            <MapPin style={{ height: "12px", width: "12px", marginRight: "4px" }} />
                            {data.country}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#6b7280" }}>
                            <Palette style={{ height: "12px", width: "12px", marginRight: "4px" }} />
                            {data.medium}
                        </div>
                    </div>
                    <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "12px", lineHeight: "1.4" }}>
                        {data.artistDisplayName}, {data.department}
                    </p>
                </div>
            </Link>
        </div>
    </>;
}