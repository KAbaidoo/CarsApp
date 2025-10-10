import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarExportContainer, gridClasses } from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import { SERVER_URL } from "../constants";
import AddCar from './AddCar';
import EditCar from './EditCar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchCars = () => {
    fetch(`${SERVER_URL}api/cars`)
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((error) => console.error("Error fetching car data:", error));
  };


    //Add a new car
    const addCar = (car) => {
        fetch(`${SERVER_URL}api/cars`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
            } else {
                alert('Something went wrong in adding a car');
            }
        })
        .catch(err => console.error(err));
    }

  useEffect(() => {
    fetchCars();
  }, []);

  const onDelClick = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCars();
            setOpen(true);
          } else {
            alert("Delete failed");
          }
        })
        .catch((error) => console.error("Error deleting car:", error));
    }
  };

  const updateCar = (car, link) => {
    console.log(link);
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (response.ok) {
          fetchCars();
        } else {
          alert("Something went wrong in updating the car");
        }
      })
      .catch((err) => console.error(err));
  }

  const columns = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: '_links.car.href',
      headerName: "",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (row) => (
        <EditCar data={row} updateCar={updateCar}  />
      ),

    },
    {
      field: '_links.self.href',
      headerName: "",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (row) => (
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error"/>
        </IconButton>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Stack mt={2} mb={2} direction="row" spacing={2} justifyContent="center">
      <AddCar addCar={addCar} />
    </Stack>
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={cars}
        columns={columns}
        getRowId={(row) => row._links.self.href}
        disableRowSelectionOnClick={true}
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
        showToolbar
      />
      <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      message="Car deleted successfully"
    />
    </div>
    </React.Fragment>
  );
}

export default Carlist;
