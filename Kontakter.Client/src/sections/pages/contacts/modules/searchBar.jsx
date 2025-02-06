import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

/**
 * A component containing a search bar for filtering contacts
 * @param {*} filter The current input to be used to filter contacts
 * @param {*} setFilter A function for changing the filter
 * @returns A search bar
 */
function searchBar({ filter, setFilter }) {
    
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="search">
            <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Søk i Kontakter"
                value={filter}
                onChange={handleChange}
            />
        </div>
    )
}

export default searchBar;