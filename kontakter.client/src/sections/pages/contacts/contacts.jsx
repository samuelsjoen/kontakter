import SearchBar from "./modules/searchBar"
import ContactsGrid from "./modules/contactsGrid/contactsGrid";
import { useEffect, useState } from "react";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchContacts(1);
    }, []);

    useEffect(() => {
        const filtered = contacts.filter(contact => containsFilter(contact, filter));
        setFilteredContacts(filtered);
    }, [filter, contacts]);

    function containsFilter(contact, filter) {
        return (
            contact.name?.toLowerCase().includes(filter.toLowerCase()) ||
            contact.phone?.toLowerCase().includes(filter.toLowerCase()) ||
            contact.address?.toLowerCase().includes(filter.toLowerCase())
        );
    }

    async function fetchContacts(uid) {
        try {
            setIsLoading(true);
            const response = await fetch(`https://localhost:7213/Contact?UID=${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }
            const contactsReceived = await response.json();
            console.log('Contacts fetched', contactsReceived);
            // contacts = contacts.sort((a, b) => a.name.localCompare(b.name));
            if (contacts != contactsReceived) {
                setContacts(contactsReceived);
            }
        } catch (e) {
            console.error('Error:', e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="contacts">
            {!isLoading ? (
                <>
                    <SearchBar
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <ContactsGrid
                        contacts={filteredContacts}
                        onChange={fetchContacts}
                    />
                </>
            ) : (
                <div>Loading contacts...</div>
            )}
        </div>
    );
}

export default Contacts;