import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ContactForm from "./contactForm"

/**
 * A component for creating a new contact
 * @param {*} refreshContactGrid A function that refreshes the contact grid 
 * @returns A create new contact card
 */
function addNewContactCard({ refreshContactGrid }) {

    const [addNewOpened, setAddNewOpen] = useState(false);

    function handleAddOpen() {
        setAddNewOpen(true);
    }

    function handleAddClose() {
        setAddNewOpen(false);
    }

    return (
        <div className="addNewContactCard">
            <button
                className="newContact"
                onClick={handleAddOpen}
            >
                +
            </button>

            {/* A pop up window which asks for contact details of the new contact */}
            <Modal
                open={addNewOpened}
                onClose={handleAddClose}
            >
                <Box sx={addNewStyle}>
                    <div className="addOrUpdateBox">
                        <h3>Legg til ny kontakt</h3>
                        <ContactForm
                            name={""}
                            number={""}
                            address={""}
                            id={""}
                            handleClose={handleAddClose}
                            refreshContactGrid={refreshContactGrid}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

{/* The default style of the pop up window. Fetched from MUI tutorial https://mui.com/material-ui/react-modal/*/}
const addNewStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default addNewContactCard;
