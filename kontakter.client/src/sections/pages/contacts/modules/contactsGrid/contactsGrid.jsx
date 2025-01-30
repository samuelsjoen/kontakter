import ContactCard from "./contactCard";
import AddNewContact from "./addNewContactCard";


function contactsGrid({ contacts, onChange }) {
    return (
        <div className="contactList">
            <AddNewContact
                onChange={onChange}
            />
            {contacts.map(contact => (
                <ContactCard
                    key={contact.id}
                    id={contact.id}
                    uid={contact.uid}
                    name={contact.name}
                    number={contact.phoneNumber}
                    address={contact.address}
                    onChange={onChange}
                />
            ))}
        </div>
    )
}

export default contactsGrid;