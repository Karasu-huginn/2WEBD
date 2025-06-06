import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { ObjectIDListResponse } from './Search'
import { HighlightedItem } from './HighlightedItem';
import { Link } from "react-router";

import { Database } from "lucide-react"

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['objects'],
    queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`).then((response) => response.json() as Promise<ObjectIDListResponse>),
    placeholderData: keepPreviousData,
  })
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const results = data.objectIDs.slice(0, 100)

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#374151",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
  }

  return (
    <>
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
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Database style={{ height: "32px", width: "32px", color: "#3b82f6" }} />
                <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>ArtifactDB</h1>
              </div>
              <nav style={{ display: "flex", gap: "24px" }}>
                <Link to="/" style={{ fontSize: "14px", fontWeight: "500", color: "#3b82f6", textDecoration: "none" }}>
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
          </div>
        </header>

        {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(to right, #f8fafc, #f1f5f9)",
          padding: "64px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>
            Découvrez un héritage culturel
          </h2>
          <p
            style={{
              fontSize: "20px",
              color: "#6b7280",
              marginBottom: "32px",
              maxWidth: "672px",
              margin: "0 auto 32px auto",
            }}
          >
            Accèdez à des milliers d'artefacts et d'oeuvres d'arts avec des outils de recherches avancés
          </p>
        </div>
      </section>

      {/* Featured Collections */}
      <section style={{ padding: "64px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>En ce moment</h3>
          </div>

          
          {results.map((result) => (
          <ul>
            <HighlightedItem key={result} objectID={result} />
          </ul>
          ))}
        </div>
      </section>
      </div>
    </>
  )
}

export default App
