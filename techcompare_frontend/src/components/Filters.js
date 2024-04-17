
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
  const [categoryValue, setCategoryValue] = React.useState([]);
  // const [storeValue, setStoreValue] = React.useState([]);
  const [brandsValue, setBrandsValue] = React.useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    onMinPriceChange(event.target.value)
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    onMaxPriceChange(event.target.value)
  };

  const handleBlur = () => {
    // console.log('Min Price:', minPrice);
    // console.log('Max Price:', maxPrice);
    // Here you can also perform other actions like validation or state updates
  };

  const handleCategoryValueChange = (event) => {
    const { checked, value } = event.target;
    const newCategories = checked ? [...categoryValue, value] : categoryValue.filter(item => item !== value);
    setCategoryValue(newCategories);
    onCategoriesChange(newCategories);  // Invoke the passed function from parent
  };

  // const handleStoreValueChange = (event) => {
  //   const { checked, value } = event.target;
  //   setStoreValue(prev => 
  //     checked 
  //       ? [...prev, value] 
  //       : prev.filter(item => item !== value)
  //   );
  // };

  const handleBrandsValueChange = (event) => {
    const { checked, value } = event.target;
    const newBrands = checked ? [...brandsValue, value] : brandsValue.filter(item => item !== value);
    setBrandsValue(newBrands);
    onBrandsChange(newBrands);  // Invoke the passed function from parent
  };

  // React.useEffect(() => {
  //   console.log(storeValue); // Logs the array of selected stores
  // }, [storeValue]);


  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Box>
          <FormControl>
            {/* radio for Categories */}
            <FormLabel id="product-category-group-label">Product Category</FormLabel>
            <FormGroup
              aria-labelledby="product-category-group"
              name="radio-buttons-group"
              onChange={handleCategoryValueChange}
            >
              <FormControlLabel value="Laptop" control={<Checkbox />} label="Laptop" />
              <FormControlLabel value="Phone" control={<Checkbox />} label="Phone" />
              <FormControlLabel value="Headphone" control={<Checkbox />} label="Headphone" />
              <FormControlLabel value="Pad" control={<Checkbox />} label="Pad" />
            </FormGroup>
          </FormControl>
        </Box>
        {/* <Box>
          <FormLabel id="checkbox-store-group-label">Check Store Inventory</FormLabel>
          <FormGroup 
            aria-labelledby="checkbox-group-label"
            onChange={handleStoreValueChange}>
            <FormControlLabel control={<Checkbox />} value="Best Buy - Downtown"  label="Best Buy - Downtown" />
            <FormControlLabel control={<Checkbox />} value="Best Buy - Midtown"  label="Best Buy - Midtown" />
            <FormControlLabel control={<Checkbox />} value="Best Buy - plus" label="Best Buy - plus" />
          </FormGroup>
        </Box> */}
        <Box>
          {/* All the checkbox for Store Inventory */}
          <FormLabel id="checkbox-store-group-label">Brands</FormLabel>
          <FormGroup 
            aria-labelledby="checkbox-group-label"
            onChange={handleBrandsValueChange}>
            <FormControlLabel control={<Checkbox />} value="Alienware"  label="Alienware" />
            <FormControlLabel control={<Checkbox />} value="Lenovo"  label="Lenovo" />
            <FormControlLabel control={<Checkbox />} value="MSI" label="MSI" />
            <FormControlLabel control={<Checkbox />} value="Acer" label="Acer" />
            <FormControlLabel control={<Checkbox />} value="Dell" label="Dell" />
            <FormControlLabel control={<Checkbox />} value="Samsung" label="Samsung" />
            <FormControlLabel control={<Checkbox />} value="ASUS" label="ASUS" />
            <FormControlLabel control={<Checkbox />} value="Google" label="Google" />
            <FormControlLabel control={<Checkbox />} value="Motorola" label="Motorola" />
          </FormGroup>
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
          <TextField id="minPrice" label="Min Price" variant="outlined" value={minPrice} onChange={handleMinPriceChange} onBlur={handleBlur}/>
          <TextField id="maxPrice" label="Max Price" variant="outlined" value={maxPrice} onChange={handleMaxPriceChange} onBlur={handleBlur}/>
        </Box>
      </Stack>
    </Box>

  );
}

export default CategoryMenu;