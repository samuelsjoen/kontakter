import React, { useState } from "react";
import { createContact } from "../../api/createContact";
import { updateContact } from "../../api/updateContact";

function contactForm({ name, number, address, id, uid, handleClose, onChange }) {
    const [formData, setFormData] = useState({
        name: name,
        phone: number,
        address: address,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateContact(id, uid, formData, onChange);
        } else {
            createContact(formData, onChange); // Update the function call to match the new parameter structure
        }
        handleClose();
    };

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

            <button onClick={handleSubmit}>{id ? "Oppdater" : "Lagre"}</button>
        </form>
    );
}

export default contactForm;