import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ObjectIDListResponse } from "./Search";
import { SearchObjectResult } from "./SearchObjectResult";
import { useState } from "react";
import { Link } from "react-router";

import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
} from "lucide-react"

function getSearchParams(search: string, dateBegin: string, dateEnd: string, departmentId: string, material: string, cultures: string[]) {
  const cultureParam = cultures.length > 0 ? `culture=${encodeURIComponent(cultures[0])}` : "";
  const parametersList = [search, dateBegin, dateEnd, departmentId, material, cultureParam];
  const cleanParametersList = parametersList.filter((word) => word.length > 0);
  if (cleanParametersList.length === 0) return "?q=";
  const [initialValue, ...parameters] = cleanParametersList;
  const params = parameters.reduce(
    (accumulator, currentValue) => accumulator + "&" + currentValue,
    "?" + initialValue
  );
  return params;
}

export function AdvancedSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [showFilters, setShowFilters] = useState(true)
    const [dateRange, setDateRange] = useState([-3000, 2000])
    
    const [selectedRegion, setSelectedRegion] = useState("all")
    const [selectedSort, setSelectedSort] = useState("relevance")
    const [selectedCultures, setSelectedCultures] = useState<string[]>([])
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
    const [selectedType, setSelectedType] = useState("")  
  
    const [search, setSearch] = useState("");
    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [material, setMaterial]= useState("");
    const params = getSearchParams(search, dateBegin, dateEnd, departmentId, material, selectedCultures);
    const { isPending, error, data } = useQuery({
        queryKey: ['adv_search', params],
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
    
    const cultures = ["Aegan Islands", "Afghanistan", "Africa", "Alabama", "Alaska", "Amsterdam", "Andalusia", "Argentina", "Arizona", "Asia", "Augsburg", "Austria", "Baden-Württemberg", "Bavaria", "Belgium", "Berlin", "Boston", "Brazil", "Brooklyn", "Cairo", "California", "Cambodia", "Canada", "Chicago", "China", "Colombia", "Czech Republic", "Egypt", "England", "Europe", "Flanders", "Florence", "France", "Germany", "Greece", "Illinois", "India", "Indiana", "Indonesia", "Ipswich", "Iran", "Iraq", "Istanbul", "Italy", "Japan", "Java", "Kathmandu Valley", "Khurasan", "Korea", "Limoges", "Limousin", "Lombardy", "London", "Mali", "Marion", "Marmara", "Massachusetts", "Mexico", "Milan", "Munich", "Nepal", "Netherlands", "New Haven", "New York", "New York City", "Nigeria", "Nishapur", "North and Central America", "Nuremberg", "Oceania", "Pakistan", "Papua New Guinea", "Paris", "Pennsylvania", "Peru", "Philadelphia", "Prague", "Rajasthan", "Rhode Island", "Roman Empire", "Rome", "Saxony", "South America", "Spain", "Středočeský", "Switzerland", "Syria", "Tamil Nadu", "Thailand", "Thebes", "Tibet", "Turkey", "Tuscany", "United Kingdom", "United States", "Upper Egypt", "Venice", "Vienna", "Vietnam", "Washington"]
    const materials = ["Watercolor", "Gold"]
    const types = ["American Decorative Arts", "Ancient Near Eastern Art", "Arms and Armor", "Arts of Africa, Oceania, and the Americas", "Asian Art", "The Cloisters", "The Costume Institute", "Drawings and Prints", "Egyptian Art", "European Paintings", "European Sculpture and Decorative Arts", "Greek and Roman Art", "Islamic Art", "The Robert Lehman Collection", "The Libraries", "Medieval Art", "Musical Instruments", "Photographs", "Modern Art"]
    
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
  
    const primaryButtonStyle = {
      ...buttonStyle,
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      border: "1px solid #3b82f6",
    }
  
    const cardStyle = {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "box-shadow 0.2s",
    }
  
    const inputStyle = {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
    }
  
    const badgeStyle = {
      display: "inline-block",
      padding: "2px 8px",
      backgroundColor: "#f1f5f9",
      color: "#475569",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
      margin: "2px",
    }
  
    const clearAllFilters = () => {
      setSelectedCultures([])
      setSelectedMaterials([])
      setSelectedType("")
      setDateRange([-3000, 2000])
      setSelectedRegion("all")
    }

    return <>
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px", color: "black" }}>
            {/* Search Header */}
            <div style={{ marginBottom: "24px" }}>
              <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "16px" }}>Recherche Avancée</h1>
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <Search
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6b7280",
                      height: "16px",
                      width: "16px",
                    }}
                  />
                  <input placeholder="Rechercher par nom..." onChange={(e) => setSearch(e.target.value ? "q=" + e.target.value : "")} style={{...inputStyle, paddingLeft: "40px",}}/>
                </div>
                <button style={primaryButtonStyle}>Rechercher</button>
                <button style={buttonStyle} onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal style={{ height: "16px", width: "16px", marginRight: "8px", display: "inline" }} />
                  Filtres
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
                {/* Filters Sidebar */}
                {showFilters && (
                  <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={cardStyle}>
                      <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0" }}>
                        <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Filtres</h3>
                      </div>
                      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "24px" }}>
                        {/* Culture Filter */}
                        <div>
                          <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px", display: "block" }}>
                            Culture
                          </label>
                          <div
                            style={{
                              maxHeight: "160px",
                              overflowY: "auto",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {cultures.map((culture) => (
                              <div key={culture} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                  type="checkbox"
                                  id={culture}
                                  style={{ margin: 0 }}
                                  checked={selectedCultures.includes(culture)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCultures([...selectedCultures, culture]);
                                    } else {
                                      setSelectedCultures(selectedCultures.filter((c) => c !== culture));
                                    }
                                  }}
                                />
                                <label htmlFor={culture} style={{ fontSize: "14px", cursor: "pointer" }}>
                                  {culture}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div style={{ height: "1px", backgroundColor: "#e2e8f0" }} />
                        
                        {/* Date Range */}
                        <div>
                          <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px", display: "block" }}>
                            Date Range (CE)
                          </label>
                          <div style={{ padding: "0 8px" }}>
                            <input
                                type="range"
                                min="-3000"
                                max="2000"
                                value={dateRange[0]}
                                onChange={(e) => {
                                  const newStart = Math.min(Number(e.target.value), dateRange[1]); // évite l'inversion
                                  setDateRange([newStart, dateRange[1]]);
                                  setDateBegin(e.target.value ? "dateBegin=" + e.target.value : "")
                                }}
                                style={{ width: "100%", marginBottom: "8px" }}
                            />
                            <input
                                type="range"
                                min="-3000"
                                max="2000"
                                value={dateRange[1]}
                                onChange={(e) => {
                                  const newEnd = Math.max(Number(e.target.value), dateRange[0]); // évite l'inversion
                                  setDateRange([dateRange[0], newEnd]);
                                  setDateEnd(e.target.value ? "dateEnd=" + e.target.value : "")
                                }}
                                style={{ width: "100%", marginBottom: "8px" }}
                            />
                            <div
                              style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}
                            >
                              <span>{dateRange[0]} CE</span>
                              <span>{dateRange[1]} CE</span>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ height: "1px", backgroundColor: "#e2e8f0" }} />
                        
                        {/* Material Filter */}
                        <div>
                          <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px", display: "block" }}>
                            Matériaux
                          </label>
                          <div
                            style={{
                              maxHeight: "128px",
                              overflowY: "auto",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {materials.map((material) => (
                              <div key={material} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                  type="checkbox"
                                  id={material}
                                  style={{ margin: 0 }}
                                  checked={selectedMaterials.includes(material)}
                                  onChange={(e) => {
                                    let updatedMaterials: string[];
                                    if (e.target.checked) {
                                      updatedMaterials = [...selectedMaterials, material];
                                    } else {
                                      updatedMaterials = selectedMaterials.filter((m) => m !== material);
                                    }
                                    setSelectedMaterials(updatedMaterials);
                                    const mediumQuery = updatedMaterials.length > 0 ? `medium=${encodeURIComponent(updatedMaterials[0])}` : "";
                                    setMaterial(mediumQuery);
                                  }}
                                />
                                <label htmlFor={material} style={{ fontSize: "14px", cursor: "pointer" }}>
                                  {material}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div style={{ height: "1px", backgroundColor: "#e2e8f0" }} />
                        
                        {/* Type Filter */}
                        <div>
                          <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px", display: "block" }}>
                            Departement
                          </label>
                          <select style={inputStyle } value={departmentId.replace("departmentId=", "")} onChange={(e) => setDepartmentId(e.target.value ? "departmentId=" + e.target.value : "")}>
                            <option value="" style={{color: "black"}}>Aucun</option>
                            <option value="1">American Decorative Arts</option>
                            <option value="3">Ancient Near Eastern Art</option>
                            <option value="4">Arms and Armor</option>
                            <option value="5">Arts of Africa, Oceania, and the Americas</option>
                            <option value="6">Asian Art</option>
                            <option value="7">The Cloisters</option>
                            <option value="8">The Costume Institute</option>
                            <option value="9">Drawings and Prints</option>
                            <option value="10">Egyptian Art</option>
                            <option value="11">European Paintings</option>
                            <option value="12">European Sculpture and Decorative Arts</option>
                            <option value="13">Greek and Roman Art</option>
                            <option value="14">Islamic Art</option>
                            <option value="15">The Robert Lehman Collection</option>
                            <option value="16">The Libraries</option>
                            <option value="17">Medieval Art</option>
                            <option value="18">Musical Instruments</option>
                            <option value="19">Photographs</option>
                            <option value="21">Modern Art</option>
                          </select>
                        </div>
                        
                        <button style={{ ...buttonStyle, width: "100%" }} onClick={clearAllFilters}>
                          Effacer les filtres
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Results */}
                <div style={{ flex: 1 }}>
                    {/* Results Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                        <div>
                            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                              Showing {results.length} of 140k results
                            </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button
                              style={{
                                ...buttonStyle,
                                backgroundColor: viewMode === "grid" ? "#3b82f6" : "#ffffff",
                                color: viewMode === "grid" ? "#ffffff" : "#374151",
                                border: viewMode === "grid" ? "1px solid #3b82f6" : "1px solid #e2e8f0",
                                padding: "8px",
                              }}
                              onClick={() => setViewMode("grid")}
                            >
                              <Grid3X3 style={{ height: "16px", width: "16px" }} />
                            </button>
                            <button
                              style={{
                                ...buttonStyle,
                                backgroundColor: viewMode === "list" ? "#3b82f6" : "#ffffff",
                                color: viewMode === "list" ? "#ffffff" : "#374151",
                                border: viewMode === "list" ? "1px solid #3b82f6" : "1px solid #e2e8f0",
                                padding: "8px",
                              }}
                              onClick={() => setViewMode("list")}
                            >
                              <List style={{ height: "16px", width: "16px" }} />
                            </button>
                        </div>
                    </div>

                    {/* Results Grid/List */}
                    <div
                    style={
                    viewMode === "grid"
                      ? {
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                          gap: "24px",
                          marginTop: "24px"
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                          marginTop: "24px"
                        }
                    }
                    >
                    {data_found ? (
                      results.map((result) => (
                        <div
                          key={result}
                          style={{
                            ...cardStyle,
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
                          }}
                        >
                          <SearchObjectResult objectID={result} viewMode={viewMode} />
                        </div>
                      ))
                    ) : (
                      <h1>No result :/</h1>
                    )}
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>;
}