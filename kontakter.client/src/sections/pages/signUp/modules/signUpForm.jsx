import React, { useState } from 'react';

function signUpForm() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repeatPassword: '',
    });

    const handleSubmit = (e) => {
        if (formData.password != formData.repeatPassword) {
            alert("Passwords do not match!")
        } else {
            
        }
        e.preventDefault();
        // TO DO: send data to server
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className="signUpForm">

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

            <label htmlFor="repeatPassword">Gjenta passord: </label>
            <input
                type="text"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
            />
            <button onClick={handleSubmit}>Registrer</button>
        </form>
    )
}

export default signUpForm;