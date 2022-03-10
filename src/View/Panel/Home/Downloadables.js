import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Downloadables(props) {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Projet Pédagogique</h2>
        <div
          style={{ marginBottom: 20, alignItems: "center", display: "flex" }}
        >
          <TextField
            id="outlined-required"
            label="Lien Projet Peda FR"
            style={{ marginRight: 20 }}
          />
          <Button variant="contained" style={{ marginRight: 20 }}>
            Mettre à jour
          </Button>
          <Button variant="contained" color="error">
            Supprimer
          </Button>
        </div>
        <div
          style={{ marginBottom: 20, alignItems: "center", display: "flex" }}
        >
          <TextField
            id="outlined-required"
            label="Lien Projet Peda EN"
            style={{ marginRight: 20 }}
          />
          <Button variant="contained" style={{ marginRight: 20 }}>
            Mettre à jour
          </Button>
          <Button variant="contained" color="error">
            Supprimer
          </Button>
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Son</h2>
        <div
          style={{ marginBottom: 20, alignItems: "center", display: "flex" }}
        >
          <TextField
            id="outlined-required"
            label="Lien Son (Youtube)"
            style={{ marginRight: 20 }}
          />
          <Button variant="contained" style={{ marginRight: 20 }}>
            Mettre à jour
          </Button>
          <Button variant="contained" color="error">
            Supprimer
          </Button>
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Film</h2>
        <div
          style={{ marginBottom: 20, alignItems: "center", display: "flex" }}
        >
          <TextField
            id="outlined-required"
            label="Lien Film (Youtube)"
            style={{ marginRight: 20 }}
          />
          <Button variant="contained" style={{ marginRight: 20 }}>
            Mettre à jour
          </Button>
          <Button variant="contained" color="error">
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Downloadables;
