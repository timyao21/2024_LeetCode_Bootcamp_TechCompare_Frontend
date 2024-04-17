
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';



function CategoryMenu() {
  const [categoryValue, setcategoryValue] = React.useState('All');
  const [storeValue, setStoreValue] = React.useState([]);

  const handleCategoryValueChange = (event) => {
    setcategoryValue(event.target.value);
  };

  const handleStoreValueChange = (event) => {
    const { checked, value } = event.target;
    setStoreValue(prev => 
      checked 
        ? [...prev, value] 
        : prev.filter(item => item !== value)
    );
  };

  React.useEffect(() => {
    console.log(categoryValue); // This will log the value after it has been updated
  }, [categoryValue]); // This effect runs after `value` has been updated

  React.useEffect(() => {
    console.log(storeValue); // Logs the array of selected stores
  }, [storeValue]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Box>
          <FormControl>
            <FormLabel id="radio-buttons-group-label">Product Category</FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              defaultValue="All"
              name="radio-buttons-group"
              value={categoryValue}
              onChange={handleCategoryValueChange}
            >
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel value="Laptop" control={<Radio />} label="Laptop" />
              <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
              <FormControlLabel value="Headphone" control={<Radio />} label="Headphone" />
              <FormControlLabel value="Pad" control={<Radio />} label="Pad" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <FormLabel id="checkbox-group-label">Check Store Inventory</FormLabel>
          <FormGroup aria-labelledby="checkbox-group-label">
            <FormControlLabel control={<Checkbox />} value="Best Buy - Downtown" onChange={handleStoreValueChange} label="Best Buy - Downtown" />
            <FormControlLabel control={<Checkbox />} value="Best Buy - Midtown" onChange={handleStoreValueChange} label="Best Buy - Midtown" />
            <FormControlLabel control={<Checkbox />} value="Best Buy - plus" onChange={handleStoreValueChange} label="Best Buy - plus" />
          </FormGroup>
        </Box>
        <Box>Item 3</Box>
      </Stack>
    </Box>

  );
}

export default CategoryMenu;