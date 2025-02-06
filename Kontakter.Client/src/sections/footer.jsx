/**
 * A component containing the footer of the website
 * @returns the footer
 */
function Footer() {
    return (
        <div className="footer">
            © {new Date().getFullYear()} Samuel Sjøen. Alle rettigheter forbeholdt.
        </div>
    );
}

export default Footer;