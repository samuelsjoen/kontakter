import React, { useState } from "react";
import { createContact } from "../../api/createContact";
import { updateContact } from "../../api/updateContact";

/**
 * A component for a form containing contact details
 * @param {string} name The name of the contact
 * @param {string} number The number of the contact
 * @param {string} address The address of the contact
 * @param {string} id The id of the contact
 * @param {*} UID The user id who the contact belongs to
 * @param {*} refreshContactGrid A function for refreshing the contact grid
 * @returns A contact form
 */
function contactForm({ name, number, address, id, uid, handleClose, refreshContactGrid }) {
    const [formData, setFormData] = useState({
        name: name,
        phone: number,
        address: address,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateContact(id, uid, formData, refreshContactGrid);
        } else {
            createContact(formData, refreshContactGrid);
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