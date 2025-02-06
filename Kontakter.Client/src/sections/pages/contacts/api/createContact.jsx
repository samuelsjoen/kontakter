/**
 * Sends a request to the API to add a new contact.
 * @param {*} formData The formdata including contact details
 * @param {*} refreshContactGrid A function that refreshes the contact grid
 */

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