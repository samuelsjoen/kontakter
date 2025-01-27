import React, { useState } from 'react';

function addNewForm({ name, number, address, id }) {

    const [formData, setFormData] = useState({
        name: name,
        phone: number,
        address: address,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TO DO: send data to server
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

            <button type="submit">Lagre</button>
        </form>
    );
}

export default addNewForm;