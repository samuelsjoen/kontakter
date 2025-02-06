async function updateContact( id, uid, formData, refreshContactGrid ) {
    try {
        const response = await fetch(`/Contact?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID: id,
                UID: uid,
                Name: formData.name,
                PhoneNumber: formData.phone,
                Address: formData.address
            }),
            credentials: "include",
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error when updating contact with ID ${id}: ${errorResponse.message}`);
        }
        console.log("Contact updated successfully")
        refreshContactGrid()

    } catch (e) {
        alert("Noe gikk galt ved endring av kontakt")
        console.error("Error Response: ", e.message);
    }
}

export { updateContact };