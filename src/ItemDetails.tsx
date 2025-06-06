import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ArtObject } from "./SearchObjectResult";
import { Link } from "react-router";

export function ItemDetails() {

    const { item_id } = useParams();
    const objectID = Number(item_id);

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

    return ( <>
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #e2e8f0",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div
              style={{
                height: "32px",
                width: "32px",
                backgroundColor: "#3b82f6",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: "bold", fontSize: "14px" }}>AD</span>
            </div>
            <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0, color: "#111827" }}>ArtifactDB</h1>
          </Link>
          <nav style={{ display: "flex", gap: "24px" }}>
            <Link to="/" style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", textDecoration: "none" }}>
              Accueil
            </Link>
            <Link
              to="/advanced-search"
              style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", textDecoration: "none" }}
            >
              Recherche Avancée
            </Link>
          </nav>
        </div>
      </header>
      <div style={{ padding: "2rem", backgroundColor: "grey" }}>
        <h1>{data.title}</h1>
        {data.primaryImageSmall && (
            <img
                src={data.primaryImageSmall}
                alt={data.title}
                style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
            />
        )}
        <p><strong>Artiste:</strong> {data.artistDisplayName || "Unknown"}</p>
        <p><strong>Date:</strong> {data.objectDate}</p>
        <p><strong>Matériaux:</strong> {data.medium}</p>
        <p><strong>Departement:</strong> {data.department}</p>
        <p><strong>Dimensions:</strong> {data.dimensions}</p>
        <p><strong>Classification:</strong> {data.classification}</p>
        <p><strong>Crédit:</strong> {data.creditLine}</p>
        <p><a href={data.objectURL} target="_blank" rel="noopener noreferrer">MetMuseum.org</a></p>
    </div>
    </div>
    </>
    );
}