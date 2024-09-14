import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Modal,
} from "@mui/material";
import {
  LocalHospital as LocalHospitalIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import axios from "axios";

interface User {
  id: number;
  nombre: string;
  email: string;
  is_active: boolean;
}

interface Appointment {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  servicio: string;
  fecha: string;
}

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [nuevosClientes, setNuevosClientes] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchUsers();
    fetchAppointments();
    fetchNuevosClientes();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(
        `${import.meta.env.VITE_API_URL}/registrados`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get<Appointment[]>(
        `${import.meta.env.VITE_API_URL}/registrado_cita`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchNuevosClientes = async () => {
    try {
      const response = await axios.get<{ nuevos_clientes: number }>(
        `${import.meta.env.VITE_API_URL}/nuevos_clientes`
      );
      setNuevosClientes(response.data.nuevos_clientes);
    } catch (error) {
      console.error("Error fetching nuevos clientes:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <LocalHospitalIcon sx={{ mr: 1, mb: -0.5 }} /> Dashboard
              Administrativo - Software Dentixa
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Usuario no autenticado"} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" gutterBottom component="div">
                    <PersonIcon sx={{ mr: 1, mb: -0.5 }} /> Usuarios Registrados
                  </Typography>
                  <TableContainer>
                    <Table size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.nombre}</TableCell>
                            <TableCell>{user.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    <PersonIcon sx={{ mr: 1, mb: -0.5 }} /> Nuevos Clientes Hoy
                  </Typography>
                  <Typography variant="h4" component="div">
                    {nuevosClientes !== null ? nuevosClientes : "Cargando..."}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={0}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" gutterBottom component="div">
                    Citas Solicitadas
                  </Typography>
                  <TableContainer>
                    <Table size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Apellido</TableCell>
                          <TableCell>Teléfono</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Servicio</TableCell>
                          <TableCell>Fecha</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.id}#</TableCell>
                            <TableCell>{appointment.nombre}</TableCell>
                            <TableCell>{appointment.apellido}</TableCell>
                            <TableCell>{appointment.telefono}</TableCell>
                            <TableCell>{appointment.email}</TableCell>
                            <TableCell>{appointment.servicio}</TableCell>
                            <TableCell>
                              {new Date(appointment.fecha).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {/* modal */}
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                size="small"
                              >
                                Abrir Modal
                              </Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-description"
                              >
                                <Box sx={style}>
                                  <Typography
                                    id="modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    Título del Modal
                                  </Typography>
                                  <Typography
                                    id="modal-description"
                                    sx={{ mt: 2 }}
                                  >
                                    Este es un ejemplo de contenido dentro del
                                    modal.
                                  </Typography>
                                  <Button
                                    onClick={handleClose}
                                    color="secondary"
                                    sx={{ mt: 2 }}
                                  >
                                    Cerrar
                                  </Button>
                                </Box>
                              </Modal>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
