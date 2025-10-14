import React, { useState } from "react";
import { SERVER_URL } from "../constants";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Carlist from "./Carlist";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const login = () => {
    fetch(`${SERVER_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
          alert("Login successful");
        } else {
          alert("Login failed");
        }
      })
      .catch((err) => console.error(err));
  };

  if (isAuthenticated) {
    return <Carlist />;
  } else {
    return (
      <div>
        <Stack
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <TextField label="Username" name="username" onChange={handleChange} />
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={login}>
            Login
          </Button>
        </Stack>
      </div>
    );
  }
}

export default Login;
