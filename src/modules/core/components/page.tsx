import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  CheckCircleOutline as CheckIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const DentalSoftwareLanding: React.FC = () => {
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dentixa
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              variant="contained"
              color="info"
              to="/Login"
              component={Link}
            >
              login
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Grid container spacing={4} sx={{ mt: 8, mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Gestión Odontológica
            </Typography>
            <Typography variant="h5" paragraph>
              Optimiza tu clínica dental con nuestro software intuitivo y
              potente.
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Solicitar Demo
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Placeholder for hero image */}
            <div
              style={{ background: "#f0f0f0", height: "300px", width: "100%" }}
            >
              [Imagen]
            </div>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mt: 8 }}
        >
          Características Principales
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <CalendarIcon color="primary" fontSize="large" />
                <Typography variant="h6" component="div">
                  Gestión de Citas
                </Typography>
                <Typography variant="body2">
                  Programa y administra citas fácilmente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <PeopleIcon color="primary" fontSize="large" />
                <Typography variant="h6" component="div">
                  Historiales Clínicos
                </Typography>
                <Typography variant="body2">
                  Accede y actualiza historiales de pacientes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <MoneyIcon color="primary" fontSize="large" />
                <Typography variant="h6" component="div">
                  Facturación
                </Typography>
                <Typography variant="body2">
                  Genera facturas y gestiona pagos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <SecurityIcon color="primary" fontSize="large" />
                <Typography variant="h6" component="div">
                  Seguridad de Datos
                </Typography>
                <Typography variant="body2">
                  Protege la información de tus pacientes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Benefits Section */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mt: 8 }}
        >
          Beneficios
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Ahorra tiempo en tareas administrativas" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Mejora la experiencia del paciente" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Reduce errores y mejora la precisión" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Acceso a informes y estadísticas" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Integración con equipos dentales" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Soporte técnico 24/7" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Pricing Section */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mt: 8 }}
        >
          Planes y Precios
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Básico
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                  $50/mes
                </Typography>
                <Typography variant="body2" paragraph>
                  Ideal para clínicas pequeñas
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Gestión de citas" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Historiales básicos" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Facturación simple" />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button variant="outlined" fullWidth>
                  Elegir Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card raised>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Profesional
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                  $70/mes
                </Typography>
                <Typography variant="body2" paragraph>
                  Para clínicas en crecimiento
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Todo del plan Básico" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Historiales avanzados" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Informes personalizados" />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Elegir Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Enterprise
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                  Personalizado
                </Typography>
                <Typography variant="body2" paragraph>
                  Soluciones a medida para grandes clínicas
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Todo del plan Profesional" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Integración personalizada" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Soporte prioritario" />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button variant="outlined" fullWidth>
                  Contactar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Contact Form */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mt: 8 }}
        >
          ¿Listo para empezar?
        </Typography>
        <Grid container spacing={2} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Mensaje"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Enviar
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              ¿Tienes preguntas sobre nuestro software de gestión odontológica?
              Nuestro equipo está listo para ayudarte. Contáctanos y te
              mostraremos cómo Dentixa puede transformar la gestión de tu
              clínica dental.
            </Typography>
            <Typography variant="body1">
              También puedes llamarnos al:
            </Typography>
            <Typography variant="h6" color="primary">
              Muy Pronto
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Container
        maxWidth={false}
        component="footer"
        sx={{ bgcolor: "primary.main", color: "white", py: 4, mt: 8 }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Dentixa
            </Typography>
            <Typography variant="body2">Gestión odontológica 2024</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Productos
            </Typography>
            <Typography variant="body2">Software de Gestión</Typography>
            <Typography variant="body2">Aplicación Móvil</Typography>
            <Typography variant="body2">Integraciones</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Soporte
            </Typography>
            <Typography variant="body2">Centro de Ayuda</Typography>
            <Typography variant="body2">Tutoriales</Typography>
            <Typography variant="body2">Contacto</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2">Términos de Servicio</Typography>
            <Typography variant="body2">Política de Privacidad</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DentalSoftwareLanding;
