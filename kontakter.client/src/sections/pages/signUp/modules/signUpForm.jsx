import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function signUpForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!checkConditions()) {
            throw new Error("Password does not meet conditions");
        }

        try {
            const response = await fetch(`https://localhost:7213/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Signup failed")
            }
            alert("Bruker opprrettet. Du vil nå bli redigert for å logge inn")
            navigate("/logginn")
        } catch (e) {
            alert("Noe gikk galt ved registrering")
            console.log("Error", e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function checkConditions() {
        let alertText = "";

        if (!formData.email.includes("@") || !formData.email.includes(".")) {
            alertText += "Ukorrekt e-mail format\n";
        }

        if (formData.password !== formData.repeatPassword) {
            alertText += "Passordene matcher ikke\n";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            alertText += "Passord må inneholde minst ett spesialtegn\n";
        }

        if (!/[A-Z]/.test(formData.password)) {
            alertText += "Passord må inneholde minst en stor bokstav\n";
        }

        if (!/[a-z]/.test(formData.password)) {
            alertText += "Passord må inneholde minst en liten bokstav\n";
        }

        if (!/[0-9]/.test(formData.password)) {
            alertText += "Passord må inneholde minst ett nummer\n";
        }

        if (formData.password.length < 6) {
            alertText += "Passord må være minst 6 tegn langt\n";
        }

        if (alertText) {
            alert(alertText);
            return false;
        } else {
            return true;
        }
    }

    return (
        <form className="signUpForm" onSubmit={handleSubmit}>

            <label htmlFor="email">E-mail: </label>
            <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />


            <label htmlFor="password">Passord: </label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <label htmlFor="repeatPassword">Gjenta passord: </label>
            <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
            />
            <button type="submit">Registrer</button>
        </form>
    )
}

export default signUpForm;