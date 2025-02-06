import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ContactForm from "./contactForm";
import { removeContact } from "../../api/removeContact";

/**
 * A component for a card containing a contact 
 * @param {string} name The name of the contact
 * @param {string} number The number of the contact
 * @param {string} address The address of the contact
 * @param {string} id The id of the contact
 * @param {*} UID The user id who the contact belongs to
 * @param {*} refreshContactGrid A function for refreshing the contact grid
 * @returns A contact card 
 */
function ContactCard({ name, number, address, id, uid, refreshContactGrid }) {

    const [updateOpened, setUpdateOpen] = useState(false);

    function handleUpdateOpen() {
        setUpdateOpen(true);
    }

    function handleUpdateClose() {
        setUpdateOpen(false);
    }

    function confirmRemove() {
        if (window.confirm(`Er du sikker på at du vil fjerne denne kontakten?`)) {
            removeContact(id, refreshContactGrid);
        }
    }
    
    return (
        <div className="contactCard">
            <div className="name">{name}</div>
            <div className="number">Telefon: {number}</div>
            <div className="address">{address}</div>
            <div className="buttonRow">
                <button className="updateButton" onClick={handleUpdateOpen}>Oppdater</button>
                <button className="removeButton" onClick={confirmRemove}>Fjern</button>
            </div>
            <Modal
                open={updateOpened}
                onClose={handleUpdateClose}
            >
                <Box sx={updateStyle}>
                    <div className="addOrUpdateBox">
                        <h3>Oppdater kontakt</h3>
                        <ContactForm
                            id={id}
                            uid={uid}
                            name={name}
                            number={number}
                            address={address}
                            handleClose={handleUpdateClose}
                            refreshContactGrid={refreshContactGrid}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}


{/* The default style of the pop up window. Fetched from MUI tutorial https://mui.com/material-ui/react-modal/*/}
const updateStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default ContactCard;