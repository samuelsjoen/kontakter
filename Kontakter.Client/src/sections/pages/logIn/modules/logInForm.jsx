import React, { useState } from "react";

function logInForm() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password, 
                }),
                credentials: "include",
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`Error when logging in: ${errorResponse.message}`);
            }
            window.location.href = "/kontakter";
        } catch (e) {
            alert("Noe gikk galt ved innlogging");
            console.log("Error response:", e.message);
        }
        
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className="logInForm" onSubmit={handleSubmit}>

            <label htmlFor="email">E-mail: </label>
            <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                refreshContactGrid={handleChange}
                required
            />


            <label htmlFor="password">Passord: </label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                refreshContactGrid={handleChange}
                required
            />

            <button type="submit">Logg inn</button>
        </form>
    )
}

export default logInForm;