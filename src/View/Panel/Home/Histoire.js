import React, { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";
function Histoire(props) {
  const [loading, setIsLoading] = useState(false);
  const [loading2, setIsLoading2] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  function handleRequest() {
    setAlertStatus("info");
    setAlertMessage("Sauvegarde en cours. NE PAS CHANGER DE PAGE");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAlertStatus("success");
      setAlertMessage("Modifications sauvegardées !");
      setTimeout(() => setAlertStatus(null), 2000);
    }, 1000);
  }
  function handleRequest2() {
    setAlertStatus("info");
    setAlertMessage("Sauvegarde en cours.  NE PAS CHANGER DE PAGE");
    setIsLoading2(true);
    setTimeout(() => {
      setIsLoading2(false);
      setAlertStatus("success");
      setAlertMessage("Modifications sauvegardées !");
      setTimeout(() => setAlertStatus(null), 2000);
    }, 1000);
  }
  return (
    <div
      style={{
        justifyContent: "center",

        display: "flex",
      }}
    >
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
          />
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loading2}
              onClick={handleRequest2}
            >
              Sauvegarder
            </Button>
            {loading2 && (
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
          />

          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleRequest}
            >
              Sauvegarder
            </Button>
            {loading && (
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
