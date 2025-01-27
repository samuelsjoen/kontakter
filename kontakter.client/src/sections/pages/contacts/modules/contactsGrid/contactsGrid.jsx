import ContactCard from "./contactCard";
import AddNewContact from "./addNewContact";

function contactsGrid() {
    return (
        <div className="contactList">
            <AddNewContact
                name = {null}
                number = {null}
                address = {null}
            />
            <ContactCard
                name={"Ola Nordman"}
                number={"92912942"}
                address={"Idrettsveien 64, 5063 Bergen"}
            />
            <ContactCard
                name={"Nita Banan"}
                number={"1234213421"}
                address={"Bananveien 4, 1110 Epleland"}
            />
            <ContactCard
                name={"Sjoko Per"}
                number={"123412583"}
                address={"Idrettsveien 15, 5153 Frappeland"}
            />
            <ContactCard
                name={"Skibidi Eple"}
                number={"08371934739"}
                address={"Scheisseveien 12, 0010 Miniland"}
            />
            <ContactCard
                name={"Frida Kahlo"}
                number={"17306743"}
                address={"Javeljaveien 31, 7536 Prompeland"}
            />
            <ContactCard
                name={"Ola Nordman"}
                number={"92912942"}
                address={"Idrettsveien 64, 5063 Bergen"}
            />
            <ContactCard
                name={"Nita Banan"}
                number={"1234213421"}
                address={"Bananveien 4, 1110 Epleland"}
            />
            <ContactCard
                name={"Sjoko Per"}
                number={"123412583"}
                address={"Idrettsveien 15, 5153 Frappeland"}
            />
            <ContactCard
                name={"Skibidi Eple"}
                number={"08371934739"}
                address={"Scheisseveien 12, 0010 Miniland"}
            />
            <ContactCard
                name={"Frida Kahlo"}
                number={"17306743"}
                address={"Javeljaveien 31, 7536 Prompeland"}
            />
        </div>
    )
}

export default contactsGrid;