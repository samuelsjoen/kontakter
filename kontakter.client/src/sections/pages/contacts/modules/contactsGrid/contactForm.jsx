import React, { useState } from 'react';

function contactForm({ name, number, address, id, uid, handleClose, handleUpdate }) {

    const [formData, setFormData] = useState({
        name: name,
        phone: number,
        address: address,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateContact();
        } else {
            createContact();
        }
        handleClose();
    };

    async function updateContact() {
        try {

            const requestBody = {
                ID: id,
                UID: uid,
                Name: formData.name,
                PhoneNumber: formData.phone,
                Address: formData.address
            };

            const response = await fetch(`https://localhost:7213/Contact?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Failed to update contact with ID ${id}`);
            }
            console.log("Contact updated successfully")
            handleUpdate(1)
            
        } catch (e) {
            alert("Noe gikk galt ved oppdatering av kontakt")
            console.error(e);
        }
    }

    async function createContact() {
        try {
            const requestBody = {
                UID: uid,
                Name: formData.name,
                PhoneNumber: formData.phone,
                Address: formData.address
            };

            const response = await fetch(`https://localhost:7213/Contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Failed to create new contact`);
            }
            console.log("Contact created successfully")
            handleUpdate(1)
            
        } catch (e) {
            alert("Noe gikk galt ved lagring av kontakt")
            console.error(e);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
        <form className="contactForm">

            <label htmlFor="name">Navn: </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />


            <label htmlFor="phone">Telefon: </label>
            <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <label htmlFor="address">Addresse: </label>
            <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>{id ? 'Oppdater' : 'Lagre'}</button>
        </form>
    );
}

export default contactForm;