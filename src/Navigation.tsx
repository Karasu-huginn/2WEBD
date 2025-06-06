import { Link } from "react-router";
import { Search } from "./Search";

export function Navigation() {
    return (
        <div style={{ flexFlow: "row nowrap", justifyContent: "space-around", gap: "1rem" }}>
            <Search />
            <nav>
                <Link to="/">Main </Link>
                <Link to="/adv_search">Advanced Search</Link>
            </nav>
        </div>
    )
}