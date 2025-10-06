import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import { SERVER_URL } from "../constants";
import AddCar from './AddCar';

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

  const columns = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <button onClick={() => onDelClick(params.id)}>Delete</button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <AddCar addCar={addCar} />
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={cars}
        columns={columns}
        getRowId={(row) => row._links.self.href}
        disableRowSelectionOnClick={true}
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
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
