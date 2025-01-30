async function createContact(formData, onChange) {
    try {
        const response = await fetch(`https://localhost:7213/Contact`, {
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
            throw new Error(`Failed to create new contact`);
        }
        console.log("Contact created successfully");
        onChange();

    } catch (e) {
        const errorResponse = await e.response.json();
        console.error("Error response:", errorResponse);
        alert("Noe gikk galt ved lagring av kontakt");
        console.error(e);
    }
}

export { createContact };