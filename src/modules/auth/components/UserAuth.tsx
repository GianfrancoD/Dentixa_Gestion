import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Tab,
  Tabs,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Email,
  Lock,
  // Password,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../services/authServices";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const UserForm: React.FC = () => {
  const [target, setTarget] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [value, setValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: string; value: string };
    setTarget((prev) => ({ ...prev, [name]: value }));
    if (!value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  // const validateRegister = async () => {
  //   try {
  //     const resp = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/auth/validate_register`,
  //       {
  //         email: target.email,
  //         nombre: target.nombre,
  //         password: target.password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     return resp.data.user_exists;
  //   } catch (error) {
  //     console.error("Error validating email:", error);
  //     throw new Error("Error validating email.");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTarget({ nombre: "", email: "", password: "" });

    if (value === 1) {
      try {
        const existUser = await validateRegister(
          target.email,
          target.nombre,
          target.password
        );
        if (existUser) {
          setSnackbarMessage("El usuario ya existe ❌");
          setOpenSnackbar(true);
          return;
        }
      } catch (error) {
        setSnackbarMessage(`${error}`);
        setOpenSnackbar(true);
        return;
      }
    }

    const endpoint = value === 0 ? "auth/login" : "auth/register";
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/${endpoint}`,
        target,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSnackbarMessage(resp.data.message);
      setOpenSnackbar(true);
      console.log("Response: ", resp.data);
      // si existe el usuario que lo mande a el endpoint
      navigate(resp.data.redirect_url, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setSnackbarMessage(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setSnackbarMessage("An unexpected error occurred. Please try again.");
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Bienvenidos to Dentixa
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="auth tabs"
            centered
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={target.email}
              onChange={handleInputChange}
              error={error}
              helperText={error ? "Este campo es obligatorio" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={target.password}
              onChange={handleInputChange}
              error={error}
              helperText={error ? "Este campo es obligatorio" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="nombre"
              autoComplete="name"
              autoFocus
              value={target.nombre}
              onChange={handleInputChange}
              error={error}
              helperText={error ? "Este campo es obligatorio" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={target.email}
              onChange={handleInputChange}
              error={error}
              helperText={error ? "Este campo es obligatorio" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={target.password}
              onChange={handleInputChange}
              error={error}
              helperText={error ? "Este campo es obligatorio" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </TabPanel>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default UserForm;
