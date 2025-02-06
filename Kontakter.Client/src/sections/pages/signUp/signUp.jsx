import SignUpForm from "./modules/signUpForm";

/**
 * A component containing the signup view
 * @returns the signup view
 */
function signUp() {
    return (
        <div className="signUp">
            <h1>Registrer</h1>
            <SignUpForm/>
        </div>
    )
}

export default signUp;