import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuthentification } from "../../../Context/AuthContext";
import useFetch from "../../../hooks/useFetch";

function Downloadables(props) {
  const [ppFr, setPpFr] = useState("");
  const [ppEn, setPpEn] = useState("");
  const [son, setSon] = useState("");
  const [film, setFilm] = useState("");
  const [recette, setRecette] = useState("");

  const { apiToken } = useAuthentification();

  const {
    data: projetPedaFr,
    loading: loadingPpFr,
    error: errorPpFr,
    newRequest: actualisePpFr,
  } = useFetch();
  const {
    data: projetPedaEn,
    loading: loadingPpEn,
    error: errorPpEn,
    newRequest: actualisePpEn,
  } = useFetch();
  const {
    data: dataSon,
    loading: loadingSon,
    error: errorSon,
    newRequest: actualiseSon,
  } = useFetch();
  const {
    data: dataFilm,
    loading: loadingFilm,
    error: errorFilm,
    newRequest: actualiseFilm,
  } = useFetch();
  const {
    data: dataRecette,
    loading: loadingRecette,
    error: errorRecette,
    newRequest: actualiseRecette,
  } = useFetch();

  useEffect(() => {
    actualisePpFr("presentation/5", "GET", {}, apiToken);
    actualisePpEn("presentation/6", "GET", {}, apiToken);
    actualiseSon("presentation/7", "GET", {}, apiToken);
    actualiseFilm("presentation/8", "GET", {}, apiToken);
    actualiseRecette("presentation/9", "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    if (projetPedaFr && !loadingPpFr) {
      setPpFr(projetPedaFr.content);
    }
  }, [loadingPpFr]);
  useEffect(() => {
    if (projetPedaEn && !loadingPpEn) {
      setPpEn(projetPedaEn.content);
    }
  }, [loadingPpEn]);
  useEffect(() => {
    if (dataSon && !loadingSon) {
      setSon(dataSon.content);
    }
  }, [loadingSon]);
  useEffect(() => {
    if (dataFilm && !loadingFilm) {
      setFilm(dataFilm.content);
    }
  }, [loadingFilm]);
  useEffect(() => {
    if (dataRecette && !loadingRecette) {
      setRecette(dataRecette.content);
    }
  }, [loadingRecette]);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      Pour enlever un onglet de l'app il suffit de ne rien indiquer en lien !
      <br />
      La version fr d??fini la visibilit?? de l'onglet dans l'application
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Projet P??dagogique</h2>
        Attention, le visibilit?? de l'onglet est bas?? sur Projet Peda FR
        <br /> Si vous indiquez le lien du projet FR et pas de l'EN
        l'application crashera lors d'une tentative d'acc??s par les utilisateurs
        anglophones
        <div
          style={{ marginBottom: 20, alignItems: "center", display: "flex" }}
        >
          <TextField
            id="outlined-required"
            label="Lien Projet Peda FR"
            style={{ marginRight: 20 }}
            value={ppFr}
            onChange={(e) => setPpFr(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={() =>
              actualisePpFr(
                "presentation/update/5",
                "PUT",
                { content: ppFr, status: !!ppFr },
                apiToken
              )
            }
          >
            Mettre ?? jour
          </Button>
        </div>
        <div
          style={{ marginBottom: 20, alignItems: "center", display: "flex" }}
        >
          <TextField
            id="outlined-required"
            label="Lien Projet Peda EN"
            style={{ marginRight: 20 }}
            value={ppEn}
            onChange={(e) => setPpEn(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={() =>
              actualisePpEn(
                "presentation/update/6",
                "PUT",
                { content: ppEn, status: !!ppEn },
                apiToken
              )
            }
          >
            Mettre ?? jour
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
            value={son}
            onChange={(e) => setSon(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={() =>
              actualiseSon(
                "presentation/update/7",
                "PUT",
                { content: son, status: !!son },
                apiToken
              )
            }
          >
            Mettre ?? jour
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
            value={film}
            onChange={(e) => setFilm(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={() =>
              actualiseFilm(
                "presentation/update/8",
                "PUT",
                { content: film, status: !!film },
                apiToken
              )
            }
          >
            Mettre ?? jour
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
        <h2>Recettes p??tillantes</h2>
        <div
          style={{ marginBottom: 20, alignItems: "center", display: "flex" }}
        >
          <TextField
            id="outlined-required"
            label="Lien (Youtube)"
            style={{ marginRight: 20 }}
            value={recette}
            onChange={(e) => setRecette(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={() =>
              actualiseRecette(
                "presentation/update/9",
                "PUT",
                { content: recette, status: !!recette },
                apiToken
              )
            }
          >
            Mettre ?? jour
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Downloadables;
