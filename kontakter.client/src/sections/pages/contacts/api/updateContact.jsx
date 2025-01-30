async function updateContact( id, uid, formData, onChange ) {
    try {

        const requestBody = {
            ID: id,
            UID: uid,
            Name: formData.name,
            PhoneNumber: formData.phone,
            Address: formData.address
        };

        const response = await fetch(`https://localhost:7213/Contact?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to update contact with ID ${id}`);
        }
        console.log("Contact updated successfully")
        onChange()

    } catch (e) {
        alert("Noe gikk galt ved oppdatering av kontakt")
        console.error(e);
    }
}

export { updateContact };