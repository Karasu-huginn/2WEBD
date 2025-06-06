import { Search } from "./Search";

export function Navigation() {
    return (
        <div style={{ flexFlow: "row nowrap", justifyContent: "space-around", gap: "1rem" }}>
            <Search />
        </div>
    )
}