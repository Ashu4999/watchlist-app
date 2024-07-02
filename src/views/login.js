import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Card } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getItem, setItem } from "../lib/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const users = getItem("users") || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(""); // Clear any previous error message
    // Handle form submission logic here
    console.log("Email:", email, users);

    let foundUser = users.find((item) => item.email === email);
    if (!foundUser) {
      let newUser = [...users];

      newUser.push({ id: users.length + 1, email: email });
      setItem("users", newUser);
    }

    dispatch({ type: "LOGIN", payload: { isAuthenticated: true, email } });
    setItem("auth", { isAuthenticated: true, email });
    navigate("/dashboard/home");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Card
        sx={{ padding: "1.5rem", boxShadow: "0px 4px 8px rgba(0, 0, 0, 1)" }}
      >
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!emailError}
            helperText={emailError}
          />
          <Button
            sx={{ mt: 1 }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
