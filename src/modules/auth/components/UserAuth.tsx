import { Box, Button, TextField, Typography } from "@mui/material";
import useTargetHandler from "../../../hooks/useTargetHandler";
// import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import { useCookies } from "react-cookie";

type Users = {
  nombre: string;
  apellido: string;
};

const UserForm = () => {
  const [target, handleTarget, handleSubmit, errors] = useTargetHandler<Users>(
    {
      nombre: "",
      apellido: "",
    },
    {
      nombre: {
        required: true,
        requiredMessage: "El nombre es obligatorio 🚨",
        patternMessage: "no puede tener o llevar números",
        pattern: /^[a-zA-Z]+$/,
      },
      apellido: {
        required: true,
        requiredMessage: "El apellido es obligatorio 🚨",
        patternMessage: "no puede tener o llevar números",
        pattern: /^[a-zA-Z]+$/,
      },
    }
  );
  // const [, setCookies] = useCookies(["XSRF-TOKEN"]);
  // const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // const fetchCsrfToken = useCallback(async () => {
  //   console.log("Fetching CSRF token...");
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/csrf-token`
  //     );
  //     console.log("Response:", response);
  //     const csrfToken = response.data["X-CSRF-Token"];
  //     setCookies("XSRF-TOKEN", csrfToken, {
  //       path: "/",
  //       secure: true,
  //       maxAge: 1000,
  //     });
  //     console.log("CSRF token:", csrfToken);
  //   } catch (error) {
  //     console.error("Error al obtener el token CSRF:", error);
  //   }

  //   setCsrfToken(csrfToken);
  // }, [csrfToken, setCookies]);

  // useEffect(() => {
  //   fetchCsrfToken();
  // }, [fetchCsrfToken]);

  const onSubmit = async () => {
    // if (!csrfToken) {
    //   console.error("CSRF token is not available");
    //   return;
    // }
    // console.log("CSRF token:", csrfToken);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create`,
        target,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("Formulario enviado con éxito");
      console.log(response.data);
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      if (error) {
        console.error("Error de respuesta:", error);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        marginTop: 0,
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Registro de Usuario
      </Typography>
      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        name="nombre"
        value={target.nombre}
        onChange={handleTarget}
        error={!!errors.nombre}
        helperText={errors.nombre?.message}
      />
      <TextField
        label="Apellido"
        variant="outlined"
        fullWidth
        name="apellido"
        value={target.apellido}
        onChange={handleTarget}
        error={!!errors.apellido}
        helperText={errors.apellido?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
};

export default UserForm;
