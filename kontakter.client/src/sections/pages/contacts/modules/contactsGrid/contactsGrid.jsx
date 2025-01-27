import ContactCard from "./contactCard";
import AddNewContact from "./addNewContact";
import { useEffect, useState } from "react";

function contactsGrid() {
    const [contacts, setContacts] = useState([]);
    async function fetchContacts(uid) {
        try {
            const response = await fetch(`https://localhost:7213/Contact?UID=${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }
            const contacts = await response.json();
            console.log('Contacts fetched', contacts);
            setContacts(contacts);
        } catch (e) {
            console.error('Error:', e);
        }
    }
    useEffect(() => {
        fetchContacts(1);
    }, []);

    return (
        <div className="contactList">
            <AddNewContact
                onChange={fetchContacts}
            />
            {contacts.map(contact => (
                <ContactCard
                    uid={contact.uid}
                    key={contact.id}
                    id={contact.id} 
                    name={contact.name}
                    number={contact.phoneNumber}
                    address={contact.address}
                    onChange={fetchContacts}
                />
            ))}
        </div>
    )
}

export default contactsGrid;