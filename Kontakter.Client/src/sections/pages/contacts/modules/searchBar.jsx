import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

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
                refreshContactGrid={handleChange}
            />
        </div>
    )
}

export default searchBar;