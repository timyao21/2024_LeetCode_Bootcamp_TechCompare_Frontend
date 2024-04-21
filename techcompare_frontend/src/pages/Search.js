import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


export default function Search() {

    const [searchValue, setSearchValue] = React.useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);  // Update state when input changes
    };

    const handleSearch = () => {
        console.log(searchValue);  // Log the current input value to the console
    };


    return(
        <Container>
            <Typography variant="h2" gutterBottom>
                Search
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: '100%',
                    display: 'flex',          // Set display to flex to align items in a row
                    alignItems: 'center',     
                    m: 3
                }}
                >
                <TextField
                fullWidth
                value={searchValue}           // Set the value of the input field
                onChange={handleInputChange} // Set the method to handle changes
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
                label="Search by product name"
                id="Search"
                sx={{m:1}}
                />
                <Button variant="contained" onClick={handleSearch} endIcon={<SearchIcon />}>
                    Search
                </Button>
            </Box>          
        </Container>

    );

}
