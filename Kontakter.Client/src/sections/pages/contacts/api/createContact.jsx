async function createContact(formData, refreshContactGrid) {
    try {
        const response = await fetch(`/Contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name: formData.name,
                PhoneNumber: formData.phone,
                Address: formData.address
            }),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.JSON();
            throw new Error(`Error when creating new contact: ${errorData.message}`);
        }
        console.log("Contact created successfully");
        refreshContactGrid();

    } catch (e) {
        alert("Noe gikk galt ved lagring av kontakt");
        console.error("Error response: ", e.message);
    }
}

export { createContact };