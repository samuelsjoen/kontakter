import SearchBar from "./modules/searchBar"
import ContactsGrid from "./modules/contactsGrid/contactsGrid";
import { useEffect, useState } from "react";

/**
 * A component containing the contacts view for a user.
 * @returns The contact view
 */
function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
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

    async function fetchContacts() {
        try {
            setIsLoading(true);
            const response = await fetch(`/Contact`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`Error when fetching contacts: ${errorResponse.message}`);
            }
            const contactsReceived = await response.json();
            console.log("Contacts fetched", contactsReceived);
            const sortedContacts = contactsReceived.sort((a, b) => a.name.localeCompare(b.name));
            console.log(sortedContacts);
            setContacts(sortedContacts);
        } catch (e) {
            alert("There was an error fetching your contacts")
            console.error("Error response:", e.message);
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
                        refreshContactGrid={fetchContacts}
                    />
                </>
            ) : (
                <div>Loading contacts...</div>
            )}
        </div>
    );
}

export default Contacts;