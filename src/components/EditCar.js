import React, { useState } from 'react';
import  Dialog  from '@mui/material/Dialog';
import  DialogActions  from '@mui/material/DialogActions';
import  DialogContent  from '@mui/material/DialogContent';
import  DialogTitle  from '@mui/material/DialogTitle';
import  Button  from '@mui/material/Button';
import IconButton  from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', manufactureYear: '', registerNumber: '', price: ''
    });
    
    function handleClickOpen() {
       setCar({ brand: props.data.row.brand, model: props.data.row.model, color: props.data.row.color, manufactureYear: props.data.row.manufactureYear, registerNumber: props.data.row.registerNumber, price: props.data.row.price });
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    } 
    
    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClose();
    }

  return (
    <div>
     <IconButton onClick={handleClickOpen}><EditIcon color='primary' /></IconButton>
     <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
            <input placeholder='Brand' onChange={handleChange} name='brand' value={car.brand}/>
            <input placeholder='Model' onChange={handleChange} name='model' value={car.model}/>
            <input placeholder='Color' onChange={handleChange} name='color' value={car.color}/>
            <input placeholder='Year' onChange={handleChange} name='manufactureYear' value={car.manufactureYear}/>
            <input placeholder='Register Number' onChange={handleChange} name='registerNumber' value={car.registerNumber}/>
            <input placeholder='Price' onChange={handleChange} name='price' value={car.price}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
     </Dialog>
    </div>
  );
}

export default EditCar;