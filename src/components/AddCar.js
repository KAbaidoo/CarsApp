import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function AddCar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    manufactureYear: "",
    registerNumber: "",
    price: "",
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    props.addCar(car);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
            <Stack spacing={2} mt={1}>
          <TextField
            autoFocus
            variant="standard"
            placeholder="Brand"
            onChange={handleChange}
            name="brand"
            value={car.brand}
          />
          <TextField
            variant="standard"
            placeholder="Model"
            onChange={handleChange}
            name="model"
            value={car.model}
          />
          <TextField
            variant="standard"
            placeholder="Color"
            onChange={handleChange}
            name="color"
            value={car.color}
          />
          <TextField
            variant="standard"
            placeholder="Year"
            onChange={handleChange}
            name="manufactureYear"
            value={car.manufactureYear}
          />
          <TextField
            variant="standard"
            placeholder="Register Number"
            onChange={handleChange}
            name="registerNumber"
            value={car.registerNumber}
          />
          <TextField
            variant="standard"
            placeholder="Price"
            onChange={handleChange}
            name="price"
            value={car.price}
          />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCar;
