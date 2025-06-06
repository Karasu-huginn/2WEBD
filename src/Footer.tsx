import { Atom } from "lucide-react";

export function Footer() {
    return <footer className="footer">
        <div className="footer-content">
            <div className="footer-logo">
                <div className="footer-logo-icon">
                    <Atom size={20} color="white" />
                </div>
                <span className="footer-title">Science Museum</span>
            </div>
            <div className="footer-copyright">
                <p>&copy; 2024 Science Museum. All rights reserved.</p>
            </div>
        </div>
    </footer>
}