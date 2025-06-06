import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ArtObject } from "./SearchObjectResult";
import { Link } from "react-router";

import {
    Calendar,
    MapPin,
    Palette,
} from "lucide-react"

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
            <div>
            {data.primaryImage ? (
                <img
                    src={data.primaryImage}
                    alt={data.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }}
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
                    ...({ width: "100%", height: "200px" })
                }}>
                    Pas d'image
                </div>
            )}
            <Link to={`/objects/${objectID}`}>
                <div style={{ padding: "16px" }}>
                    <div>
                        <div>
                            <h3 style={{ fontWeight: "600", marginBottom: "8px", fontSize: "16px" }}>{data.title}</h3>
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
        </>
    }
    else {
        return <></>
    }
}