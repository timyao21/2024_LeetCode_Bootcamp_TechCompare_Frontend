
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


function valuetext(value) {
  return `$${value}`;
}


function CategoryMenu({onCategoriesChange, onBrandsChange, onMinPriceChange, onMaxPriceChange}) {
  const [categoryValue, setCategoryValue] = React.useState('');
  // const [storeValue, setStoreValue] = React.useState([]);
  const [brandsValue, setBrandsValue] = React.useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (event) => {
    // setMinPrice(event.target.value);
    setMinPrice(event.target.value === '' ? null : parseFloat(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    // setMaxPrice(event.target.value);
    setMaxPrice(event.target.value === '' ? null : parseFloat(event.target.value));
  };

  const handleBlur = () => {
    // Here you can also perform other actions like validation or state updates
    onMinPriceChange(minPrice)
    onMaxPriceChange(maxPrice)
  };

  const handleCategoryValueChange = (event) => {
    if (event.target.value == 'all'){
      setCategoryValue('')
      onCategoriesChange('')
    }
    else{
      setCategoryValue(event.target.value);
      onCategoriesChange(event.target.value);  // Invoke the passed function from parent      
    }
  };

  const handleBrandsValueChange = (event) => {
    if (event.target.value == 'all'){
      setBrandsValue('')
      onBrandsChange('')
    }
    else{
      setBrandsValue(event.target.value);
      onBrandsChange(event.target.value);  // Invoke the passed function from parent      
    }
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Box>
          <FormControl>
            {/* radio for Categories */}
            <FormLabel id="product-category-group-label">Product Category</FormLabel>
            <RadioGroup
              aria-labelledby="product-category-group"
              name="radio-buttons-group"
              defaultValue="all"
              onChange={handleCategoryValueChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="Laptop" control={<Radio />} label="Laptop" />
              <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
              <FormControlLabel value="Headphone" control={<Radio />} label="Headphone" />
              <FormControlLabel value="Pad" control={<Radio />} label="Pad" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          {/* All the checkbox for Store Inventory */}
          <FormLabel id="checkbox-store-group-label">Brands</FormLabel>
            <RadioGroup 
              aria-labelledby="checkbox-group-label"
              defaultValue="all"
              onChange={handleBrandsValueChange}>
              <FormControlLabel control={<Radio />} value="all"  label="All" />
              <FormControlLabel control={<Radio />} value="Alienware"  label="Alienware" />
              <FormControlLabel control={<Radio />} value="Lenovo"  label="Lenovo" />
              <FormControlLabel control={<Radio />} value="Apple"  label="Apple" />
              <FormControlLabel control={<Radio />} value="MSI" label="MSI" />
              <FormControlLabel control={<Radio />} value="Acer" label="Acer" />
              <FormControlLabel control={<Radio />} value="Dell" label="Dell" />
              <FormControlLabel control={<Radio />} value="Samsung" label="Samsung" />
              <FormControlLabel control={<Radio />} value="ASUS" label="ASUS" />
              <FormControlLabel control={<Radio />} value="Google" label="Google" />
              <FormControlLabel control={<Radio />} value="Motorola" label="Motorola" />
            </RadioGroup>
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { mt: 2 },
          }}
          noValidate
          autoComplete="off"
        >
          <FormLabel id="Price-Label">Price</FormLabel>
          <TextField id="minPrice" type="number" label="Min Price" variant="outlined" value={minPrice} onChange={handleMinPriceChange} onBlur={handleBlur}/>
          <TextField id="maxPrice" type="number" label="Max Price" variant="outlined" value={maxPrice} onChange={handleMaxPriceChange} onBlur={handleBlur}/>
        </Box>
      </Stack>
    </Box>

  );
}

export default CategoryMenu;