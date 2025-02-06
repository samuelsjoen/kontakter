import LogInForm from "./modules/logInForm";

/**
 * A component containing the login view
 * @returns The log in view
 */
function logIn() {
    return (
        <div className="logIn">
            <h1>Logg inn</h1>
            <LogInForm/>
        </div>
    )
}

export default logIn;