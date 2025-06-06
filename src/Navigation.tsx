import { Atom, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return <nav className="nav-bar">
        <div className="nav-container">
            <div className="nav-content">
                <div className="nav-logo">
                    <div className="nav-logo-icon">
                        <Atom size={20} color="white" />
                    </div>
                    <span className="nav-title">Science Museum</span>
                </div>

                <div className="nav-links">
                    <a href="#" className="nav-link">Collection</a>
                    <a href="#" className="nav-link">Visit</a>
                    <a href="#" className="nav-link">Research</a>
                    <a href="#" className="nav-link">About</a>
                </div>

                <button
                    className="mobile-menu-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>

        {isMenuOpen && (
            <div className="mobile-menu">
                <a href="#" className="mobile-menu-link">Collection</a>
                <a href="#" className="mobile-menu-link">Visit</a>
                <a href="#" className="mobile-menu-link">Research</a>
                <a href="#" className="mobile-menu-link">About</a>
            </div>
        )}
    </nav>

    return (
        <div style={{ flexFlow: "row nowrap", justifyContent: "space-around", gap: "1rem" }}>
            <nav>
                <Link to="/">Main </Link>
                <Link to="/adv_search">Advanced Search</Link>
            </nav>
        </div>
    )
}