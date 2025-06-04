import { Link } from "react-router";
import { useState, useEffect } from "react";   

export function Navigation() {

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('sunflowers');
    
    useEffect(() => {
      const fetchData = async () => {
        const searchRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`);
        const searchData = await searchRes.json();
        
        const topIds = searchData.objectIDs?.slice(0, 5) || [];
        
        const items = await Promise.all(
          topIds.map(async (id) => {
            const itemRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            return itemRes.json();
               })
        );
      
        setResults(items);
      };
    
      fetchData();
    }, [search]);

    return (
        <div style={{ flexFlow: "row nowrap", justifyContent: "space-around", gap: "1rem" }}>
            <nav>
                <Link to="/">Main </Link>
                <Link to="/adv_search">Advanced Search</Link>
            </nav>
            <h1>Met Museum Art Search</h1>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <ul>
              {results.map((item) => (
                <li key={item.objectID}>
                  <h3>{item.title}</h3>
                  {item.primaryImageSmall && <img src={item.primaryImageSmall} alt={item.title} width="100" />}
                  <p>{item.artistDisplayName}</p>
                </li>
              ))}
            </ul>
        </div>
        
    )
}