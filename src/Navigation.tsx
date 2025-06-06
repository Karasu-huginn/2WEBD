import { Link } from "react-router";
import { Search } from "./Search";

export function Navigation() {
    return (
        <div style={{ flexFlow: "row nowrap", justifyContent: "space-around", gap: "1rem" }}>
            <Search />
            <nav role="navigation">
                <Link to="/">Main </Link>
                <Link to="/advanced-search">Recherche avancée</Link>
            </nav>
        </div>
    )
}