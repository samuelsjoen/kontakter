import SearchBar from "./modules/searchBar"
import ContactsGrid from "./modules/contactsGrid/contactsGrid";

function Contacts() {
    return (
        <div className="contacts">
            <SearchBar/>
            <ContactsGrid/>
        </div>
    )
}

export default Contacts;