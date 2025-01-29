import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ContactForm from './contactForm'

function ContactCard({ name, number, address, id, uid, onChange }) {

    const [updateOpened, setUpdateOpen] = useState(false);

    function handleUpdateOpen() {
        setUpdateOpen(true);
    }

    function handleUpdateClose() {
        setUpdateOpen(false);
    }

    function confirmRemove() {
        if (window.confirm(`Er du sikker på at du vil fjerne denne kontakten?`)) {
            remove();
        }
    }
    
    async function remove() {
        try {
            const response = await fetch(`https://localhost:7213/Contact?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to delete contact with ID ${id}`);
            }
        } catch (e) {
            alert("Noe gikk galt ved sletting av kontakten")
            console.log('Error:', e);
        }
        onChange(1);
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
                            handleUpdate={onChange}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}



const updateStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default ContactCard;