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
                throw new Error("Logout failed")
            }
            window.location.href = "/logginn";
        } catch (e) {
            alert("Noe gikk galt ved utlogging")
            console.log("Error:", e);
        }
    }

    return (
        <p>Utlogging pågår...</p>
    )
}

export default logOut;