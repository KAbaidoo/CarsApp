import React ,{useState} from 'react';
import  Dialog  from '@mui/material/Dialog';
import  DialogActions  from '@mui/material/DialogActions';
import  DialogContent  from '@mui/material/DialogContent';
import  DialogTitle  from '@mui/material/DialogTitle';
import { SERVER_URL } from '../constants';


function AddCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', year: '', fuel: '',price: ''
    });

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    } 
    
    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

  return (
    <div>
     <button onClick={handleClickOpen}>Add Car</button>
     <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
            <input placeholder='Brand' onChange={handleChange} name='brand' value={car.brand}/>
            <input placeholder='Model' onChange={handleChange} name='model' value={car.model}/>
            <input placeholder='Color' onChange={handleChange} name='color' value={car.color}/>
            <input placeholder='Year' onChange={handleChange} name='year' value={car.year}/>
            <input placeholder='Fuel' onChange={handleChange} name='fuel' value={car.fuel}/>
            <input placeholder='Price' onChange={handleChange} name='price' value={car.price}/>
        </DialogContent>
        <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </DialogActions>
     </Dialog>
    </div>
  );
}

export default AddCar;