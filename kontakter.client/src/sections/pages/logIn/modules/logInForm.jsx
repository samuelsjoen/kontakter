import React, { useState } from 'react';

function logInForm() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
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
        <form className="logInForm">

            <label htmlFor="username">Brukernavn: </label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />


            <label htmlFor="password">Passord: </label>
            <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <button type="submit">Logg inn</button>
        </form>
    )
}

export default logInForm;