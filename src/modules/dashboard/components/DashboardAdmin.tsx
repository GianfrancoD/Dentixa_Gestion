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
  VerifiedUser as PersonIcon,
  Logout as IsLogout,
  AccountCircle as IsAccountCircle,
  AppRegistration as IsAppRegistration,
  Today as IsToday,
} from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { User, Appointment } from "../helpers/helperDashboard";
import { handleLogout } from "../../auth/services/authServices";
import {
  fetchUsers,
  fetchAppointments,
  fetchNuevosClientes,
} from "../../appointment/services/appointServices";

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
  const [open, setOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState("");
  // const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    loadAppointment();
    loadAuth();
  }, []);

  const loadAppointment = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);

      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);

      const nuevosClientesData = await fetchNuevosClientes();
      setNuevosClientes(nuevosClientesData.nuevos_clientes);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const loadAuth = async () => {
    try {
      const auth = await handleLogout();
      setCurrentUser(auth);
    } catch (error) {
      console.error("Error loading data:", error);
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
                  <IsAccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary={
                    currentUser !== null
                      ? `Welcome, ${currentUser}`
                      : "Loading..."
                  }
                />
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
            <ListItem button>
              <ListItemIcon>
                <IsLogout />
              </ListItemIcon>
              <ListItemText primary="Logout" onClick={handleLogout} />
            </ListItem>
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
                    <IsAppRegistration sx={{ mr: 1, mb: -0.5 }} /> Usuarios
                    Registrados
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
                    <IsToday sx={{ mr: 1, mb: -0.5 }} /> Nuevos Clientes Hoy
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
                    <PersonIcon sx={{ mr: 1, mb: -0.5 }} /> Citas Solicitadas
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
