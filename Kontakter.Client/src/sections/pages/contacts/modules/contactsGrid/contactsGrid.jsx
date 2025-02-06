import ContactCard from "./contactCard";
import AddNewContact from "./addNewContactCard";


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