import ContactCard from "./contactCard";
import AddNewContact from "./addNewContactCard";

/**
 * A component containing the grid of contacts belonging to a user
 * @param {*} contacts The list of contacts
 * @param {*} refreshContactGrid A function for refreshing the contact grid
 * @returns A contact grid
 */
function contactsGrid({ contacts, refreshContactGrid }) {
    return (
        <div className="contactList">
            <AddNewContact
                refreshContactGrid={refreshContactGrid}
            />
            {contacts.map(contact => (
                <ContactCard
                    key={contact.id}
                    id={contact.id}
                    uid={contact.uid}
                    name={contact.name}
                    number={contact.phoneNumber}
                    address={contact.address}
                    refreshContactGrid={refreshContactGrid}
                />
            ))}
        </div>
    )
}

export default contactsGrid;