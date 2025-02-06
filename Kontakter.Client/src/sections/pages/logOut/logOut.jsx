import { useEffect } from "react";

function logOut() {
    useEffect(() => {
        performLogOut();
    }, []);

    async function performLogOut() {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`Error during logout: ${errorResponse.message}`);
            }
            window.location.href = "/logginn";
        } catch (e) {
            alert("Noe gikk galt ved utlogging")
            console.log("Error response:", e.message);
        }
    }

    return (
        <p>Utlogging pågår...</p>
    )
}

export default logOut;