import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./style.css";
import { useAuthentification } from "../../Context/AuthContext";

function Login(props) {
  const { login } = useAuthentification();
  const [idValue, setIdValue] = useState("");
  const [passValue, setPassValue] = useState("");
  return (
    <div className="loginContainer">
      <div className="formContainer">
        <h1 style={{ marginBottom: 30 }}>Connexion</h1>
        <TextField
          style={{ marginBottom: 20 }}
          id="outlined-basic"
          label="Identifiant"
          variant="outlined"
          value={idValue}
          onChange={(e) => setIdValue(e.target.value)}
        />
        <TextField
          style={{ marginBottom: 30 }}
          id="outlined-basic"
          label="Mot de passe"
          variant="outlined"
          type={"password"}
          value={passValue}
          onChange={(e) => setPassValue(e.target.value)}
        />
        <Button
          disableElevation
          variant="contained"
          onClick={() => {
            login({ email: idValue, password: passValue });
          }}
        >
          Se connecter
        </Button>
      </div>
    </div>
  );
}

export default Login;
