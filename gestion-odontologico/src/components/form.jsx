import { useState } from "react";

import { ServicesAll } from "../services/servicespost";

export const Formulario = () => {
  const [alluser, setAlluser] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [usuarioexiste, setUsuarioExiste] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
    setFormulario({ nombre: "", apellido: "" });
    setAlluser([...alluser, formulario]);

    ServicesAll("create", undefined, formulario, "post")
      .then((response) => {
        console.log(response.data);
        setMensaje("Usuario Creado con exito");
        setUsuarioExiste(true);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.message === "El usuario ya existe") {
          setUsuarioExiste(true);
          setMensaje("");
        } else {
          setUsuarioExiste(false);
          setMensaje("Error al crear el usuario");
        }
      });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          value={formulario.nombre}
          pattern="[a-zA-Z]+"
          placeholder="nombre"
          onChange={(e) => {
            setFormulario({ ...formulario, nombre: e.target.value });
          }}
          required
        />
        <label></label>
        <input
          type="text"
          value={formulario.apellido}
          pattern="[a-zA-Z]+"
          placeholder="apellido"
          onChange={(e) => {
            setFormulario({ ...formulario, apellido: e.target.value });
          }}
          required
        />
        <button>Enviar</button>
      </form>
      {mensaje ? (
        <p style={{ color: "green" }}>{mensaje}</p>
      ) : usuarioexiste ? (
        <p style={{ color: "red" }}>El usuario ya existe</p>
      ) : (
        <p></p>
      )}
    </>
  );
};
