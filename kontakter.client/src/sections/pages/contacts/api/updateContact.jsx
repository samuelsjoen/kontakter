async function updateContact( id, uid, formData, onChange ) {
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
            throw new Error(`Failed to update contact with ID ${id}`);
        }
        console.log("Contact updated successfully")
        onChange()

    } catch (e) {
        alert("Noe gikk galt ved endring av kontakt")
        console.error(e);
    }
}

export { updateContact };