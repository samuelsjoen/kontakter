import TextField from "@mui/material/TextField";

function searchBar() {
    return (
        <div className="search">
            <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Søk i kontakter"
            />
        </div>
    )
}

export default searchBar;