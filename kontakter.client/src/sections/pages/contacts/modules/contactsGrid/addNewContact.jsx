import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ContactForm from './contactForm'

function addNewContact({ onChange }) {

    const [addNewOpened, setAddNewOpen] = useState(false);

    function handleAddOpen() {
        setAddNewOpen(true);
    }

    function handleAddClose() {
        setAddNewOpen(false);
    }

    return (
        <div className="addNewContact">
            <button
                className="newContact"
                onClick={handleAddOpen}
            >
                +
            </button>
            <Modal
                open={addNewOpened}
                onClose={handleAddClose}
            >
                <Box sx={addNewStyle}>
                    <div className="addOrUpdateBox">
                        <h3>Legg til ny kontakt</h3>
                        <ContactForm
                            name={null}
                            number={null}
                            address={null}
                            id={null}
                            uid={1}
                            handleClose={handleAddClose}
                            handleUpdate={onChange}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

const addNewStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default addNewContact;
