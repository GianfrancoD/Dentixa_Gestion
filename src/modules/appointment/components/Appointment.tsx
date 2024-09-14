import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Snackbar,
  IconButton,
} from "@mui/material";
import {
  LocalHospital as LocalHospitalIcon,
  Event as EventIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

const services: Service[] = [
  {
    id: 0,
    name: "Consulta",
    description: "Consulta Dental y revición",
    price: 30,
    available: true,
  },
  {
    id: 1,
    name: "Limpieza dental",
    description: "Limpieza profunda y pulido",
    price: 30,
    available: true,
  },
  {
    id: 2,
    name: "Tratamiento",
    description: "Tratamiento de caries",
    price: 40,
    available: true,
  },
  {
    id: 3,
    name: "Blanqueamiento",
    description: "Blanqueamiento profesional",
    price: 200,
    available: true,
  },
  {
    id: 4,
    name: "Extracción",
    description: "Extracción de dientes o muelas",
    price: 150,
    available: false,
  },
  {
    id: 5,
    name: "Ortodoncia",
    description: "Tratamiento de ortodoncia",
    price: 3000,
    available: true,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const UserAppoin: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    servicio: "",
    fecha: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sendmessage, setSendMessage] = useState("");

  const handleServiceChange = (e: SelectChangeEvent) => {
    setSelectedService(e.target.value as string);
    setFormData({ ...formData, servicio: e.target.value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos de la cita:", formData);
    // const appointmentData = {
    //   ...formData,
    //   servicio: selectedService,
    //   fecha: new Date(formData.fecha).toISOString(),
    // };

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.telefono ||
      !formData.email ||
      !formData.servicio ||
      !formData.fecha
    ) {
      setSendMessage("Por favor, completa todos los campos requeridos.");
      setOpenSnackbar(true);
      return;
    }

    console.log("Datos: ", formData);
    try {
      console.log("Datos dentro del try antes:  ", formData);
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointment `,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Datos dentro del try despues:  ", formData);
      setSendMessage(resp.data.message);
      setOpenSnackbar(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setSendMessage(
          err.response.data.message || "An error occurred. Please try again."
        );
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <LocalHospitalIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Software Dental Dentixa
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <EventIcon sx={{ mr: 1 }} /> Catálogo de Servicios
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="service-select-label">
                      Selecciona un servicio
                    </InputLabel>
                    <Select
                      labelId="service-select-label"
                      id="service-select"
                      value={selectedService}
                      label="Selecciona un servicio"
                      onChange={handleServiceChange}
                    >
                      {services.map((service) => (
                        <MenuItem
                          key={service.id}
                          value={service.name}
                          disabled={!service.available}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography>{service.name}</Typography>
                            <Chip
                              label={`$${service.price}`}
                              color={service.available ? "primary" : "default"}
                              size="small"
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {selectedService && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {
                          services.find((s) => s.name === selectedService)
                            ?.description
                        }
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <EventIcon sx={{ mr: 1 }} /> Reservar Cita
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          //   required
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Apellido"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          //   required
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Teléfono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          //   required
                          variant="outlined"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          //   required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Fecha y hora de la cita"
                          name="fecha"
                          type="datetime-local"
                          value={formData.fecha}
                          onChange={handleInputChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          //   required
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        startIcon={<EventIcon />}
                      >
                        Reservar Cita
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={sendmessage}
        // message="Cita reservada con éxito"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
};

export default UserAppoin;
