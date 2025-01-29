import ContactCard from "./contactCard";
import AddNewContact from "./addNewContact";


function contactsGrid({ contacts, onChange }) {
    return (
        <div className="contactList">
            <AddNewContact
                onChange={onChange}
            />
            {contacts.map(contact => (
                <ContactCard
                    uid={contact.uid}
                    key={contact.id}
                    id={contact.id} 
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