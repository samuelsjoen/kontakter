/**
 * A function that updates a contact
 * @param {string} id The id of the contact to be updated
 * @param {string} uid The user id connected to the contact to be updated
 * @param {*} formData The formdata containing the updated contact details
 * @param {*} refreshContactGrid A function that refreshes the contact grid
 */
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