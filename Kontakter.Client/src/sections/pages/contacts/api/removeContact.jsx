async function removeContact( id, refreshContactGrid ) {
    try {
        const response = await fetch(`/Contact?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        })
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error when deleting contact with ID ${id}: ${errorResponse.message}`);
        }
    } catch (e) {
        alert("Noe gikk galt ved sletting av kontakten");
        console.log("Error response: ", e.message);
    }
    refreshContactGrid();
}

export { removeContact }