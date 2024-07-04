import { useState } from "react";

import axios from "axios";
export const Formulario = () => {
  const [alluser, setAlluser] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
    setFormulario({ nombre: "", apellido: "" });
    setAlluser([...alluser, formulario]);

    axios
      .post("http://127.0.0.1:5000/create", formulario, {
        headers: {
          "content-type": "application/json",
          mode: "no-cache",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          value={formulario.nombre}
          placeholder="nombre"
          onChange={(e) => {
            setFormulario({ ...formulario, nombre: e.target.value });
          }}
        />
        <label></label>
        <input
          type="text"
          value={formulario.apellido}
          placeholder="apellido"
          onChange={(e) => {
            setFormulario({ ...formulario, apellido: e.target.value });
          }}
        />
        <button>Enviar</button>
      </form>
    </>
  );
};
