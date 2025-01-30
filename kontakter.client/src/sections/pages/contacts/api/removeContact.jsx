async function removeContact( id, onChange ) {
    try {
        const response = await fetch(`https://localhost:7213/Contact?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        })
        if (!response.ok) {
            throw new Error(`Failed to delete contact with ID ${id}`);
        }
    } catch (e) {
        alert("Noe gikk galt ved sletting av kontakten");
        console.log("Error:", e);
    }
    onChange();
}

export { removeContact }