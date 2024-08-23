import { Box, Button, TextField, Typography } from "@mui/material";
import useTargetHandler from "../../../hooks/useTargetHandler";

type Users = {
  firstName: string;
  lastName: string;
};

const UserForm = () => {
  const [target, handleTarget, handleSubmit, errors] = useTargetHandler<Users>(
    {
      firstName: "",
      lastName: "",
    },
    {
      firstName: {
        required: true,
        requiredMessage: "El nombre es obligatorio 🚨",
      },
      lastName: {
        required: true,
        requiredMessage: "El apellido es obligatorio 🚨",
      },
    }
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => console.log(data))}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        marginTop: 30,
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
        name="firstName"
        value={target.firstName}
        onChange={handleTarget}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Apellido"
        variant="outlined"
        fullWidth
        name="lastName"
        value={target.lastName}
        onChange={handleTarget}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
};

export default UserForm;
