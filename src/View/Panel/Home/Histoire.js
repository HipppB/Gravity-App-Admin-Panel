import React, { useState, useEffect } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useAuthentification } from "../../../Context/AuthContext";
function Histoire(props) {
  const { apiToken } = useAuthentification();
  const {
    data: dataHistoryFr,
    loading: loadingFr,
    error: errorFr,
    newRequest: actualiseFr,
  } = useFetch();
  const {
    data: dataHistoryEn,
    loading: loadingEn,
    error: errorEn,
    newRequest: actualiseEn,
  } = useFetch();

  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [historyFr, setHistoryFr] = useState();
  const [historyEn, setHistoryEn] = useState();
  useEffect(() => {
    actualiseFr("presentation/3", "GET", {}, apiToken);
    actualiseEn("presentation/4", "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    if (dataHistoryFr && !loadingFr) {
      setHistoryFr(dataHistoryFr.content);
    }
  }, [dataHistoryFr, loadingFr]);
  useEffect(() => {
    if (dataHistoryEn && !loadingEn) {
      setHistoryEn(dataHistoryEn.content);
    }
  }, [dataHistoryEn, loadingEn]);
  function handleRequest() {
    setAlertStatus("info");
    setAlertMessage("Sauvegarde en cours. NE PAS CHANGER DE PAGE");
    actualiseFr(
      "presentation/update/3",
      "POST",
      { content: historyFr },
      apiToken
    );

    setTimeout(() => {
      setAlertStatus("success");
      setAlertMessage("Modifications sauvegardées !");
      setTimeout(() => setAlertStatus(null), 2000);
    }, 1000);
  }
  function handleRequest2() {
    setAlertStatus("info");
    setAlertMessage("Sauvegarde en cours.  NE PAS CHANGER DE PAGE");
    actualiseEn(
      "presentation/update/4",
      "POST",
      { content: historyEn },
      apiToken
    );

    setTimeout(() => {
      setAlertStatus("success");
      setAlertMessage("Modifications sauvegardées !");
      setTimeout(() => setAlertStatus(null), 2000);
    }, 1000);
  }
  return (
    <div
      style={{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
      }}
    >
      Edit de l'histoire de Gravity (page d'accueil)
      <br />
      Vous pouvez marquer {"{name}"} pour inserer le nom de l'utilisateurs (Vide
      si non renseigné)
      <div className="HistoiresContainer">
        <div className="HistoireContainer">
          <TextareaAutosize
            aria-label="history textarea"
            placeholder="Histoire de Liste Fr"
            style={{
              width: 500,
              maxWidth: "80%",
              height: 400,
              marginBottom: 30,
            }}
            value={historyFr}
            onChange={(e) => setHistoryFr(e.target.value)}
          />
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loadingFr}
              onClick={handleRequest2}
            >
              Sauvegarder
            </Button>
            {loadingFr && (
              <CircularProgress
                size={24}
                sx={{
                  color: "green",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </div>
        <div className="HistoireContainer">
          <TextareaAutosize
            aria-label="history textarea"
            placeholder="Histoire de Lise En"
            style={{
              width: 500,
              maxWidth: "80%",
              height: 400,
              marginBottom: 30,
            }}
            value={historyEn}
            onChange={(e) => setHistoryEn(e.target.value)}
          />

          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loadingEn}
              onClick={handleRequest}
            >
              Sauvegarder
            </Button>
            {loadingEn && (
              <CircularProgress
                size={24}
                sx={{
                  color: "green",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </div>
        <AlertComponent
          state={alertStatus}
          message={alertMessage}
          onClose={() => setAlertStatus(null)}
        />
      </div>
    </div>
  );
}

function AlertComponent({ state, message, onClose }) {
  console.log(["error", "warning", "info", "success"].indexOf(state));
  if (["error", "warning", "info", "success"].indexOf(state) > -1) {
    return (
      <div
        style={{
          position: "absolute",
          width: "90%",
          bottom: 100,
        }}
      >
        <Alert severity={state} onClose={onClose}>
          {message}
        </Alert>
      </div>
    );
  } else return <></>;
}

export default Histoire;
