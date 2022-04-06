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
  const {
    data: dataWelFr,
    loading: loadingWelFr,
    error: errorWelFr,
    newRequest: actualiseWelFr,
  } = useFetch();
  const {
    data: dataWelEn,
    loading: loadingWelEn,
    error: errorWelEn,
    newRequest: actualiseWelEn,
  } = useFetch();

  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [historyFr, setHistoryFr] = useState();
  const [historyEn, setHistoryEn] = useState();
  const [welFr, setWelFr] = useState();
  const [welEn, setWelEn] = useState();
  useEffect(() => {
    actualiseFr("presentation/3", "GET", {}, apiToken);
    actualiseEn("presentation/4", "GET", {}, apiToken);
    actualiseWelFr("presentation/1", "GET", {}, apiToken);
    actualiseWelEn("presentation/2", "GET", {}, apiToken);
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
  useEffect(() => {
    if (dataWelFr && !loadingWelFr) {
      setWelFr(dataWelFr.content);
    }
  }, [dataWelFr, loadingWelFr]);
  useEffect(() => {
    if (dataWelEn && !loadingWelEn) {
      setWelEn(dataWelEn.content);
    }
  }, [dataWelEn, loadingWelEn]);
  function handleRequest() {
    setAlertStatus("info");
    setAlertMessage("Sauvegarde en cours. NE PAS CHANGER DE PAGE");

    actualiseFr(
      "presentation/update/3",
      "PUT",
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
      "PUT",
      { content: historyEn },
      apiToken
    );

    setTimeout(() => {
      setAlertStatus("success");
      setAlertMessage("Modifications sauvegardées !");
      setTimeout(() => setAlertStatus(null), 2000);
    }, 1000);
  }
  function handleRequestWelFr() {
    setAlertStatus("info");
    setAlertMessage("Sauvegarde en cours.  NE PAS CHANGER DE PAGE");
    actualiseEn("presentation/update/1", "PUT", { content: welFr }, apiToken);

    setTimeout(() => {
      setAlertStatus("success");
      setAlertMessage("Modifications sauvegardées !");
      setTimeout(() => setAlertStatus(null), 2000);
    }, 1000);
  }
  function handleRequestWelEn() {
    setAlertStatus("info");
    setAlertMessage("Sauvegarde en cours.  NE PAS CHANGER DE PAGE");
    actualiseEn("presentation/update/2", "PUT", { content: welEn }, apiToken);

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
      si non renseigné, et ne marche pas tout le temps ça dépend de la co de
      l'utilisteur)
      <div className="HistoiresContainer">
        <div className="HistoireContainer">
          Histoire FR
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
              onClick={handleRequest}
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
          Histoire EN
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
              onClick={handleRequest2}
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
      Edit du message de bienvenue (Ne s'affiche que à la premiere connexion de
      l'user)
      <br /> Vous pouvez marquer {"{name}"} pour inserer le nom de
      l'utilisateurs (Vide si non renseigné)
      <br /> Si vous voulez tester le bon affichage du message déconnectez vous
      de l'app et envoyez l'email associé à votre compte à Hippolyte ou Arthur,
      on vous mettra en nouveau pour votre prochaine connexion
      <div className="HistoiresContainer">
        <div className="HistoireContainer">
          Message bienvenue FR
          <TextareaAutosize
            aria-label="wel textarea"
            placeholder="Message bienvenue Fr"
            style={{
              width: 500,
              maxWidth: "80%",
              height: 400,
              marginBottom: 30,
            }}
            value={welFr}
            onChange={(e) => setWelFr(e.target.value)}
          />
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loadingWelFr}
              onClick={handleRequestWelFr}
            >
              Sauvegarder
            </Button>
            {loadingWelFr && (
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
          Message bienvenue EN
          <TextareaAutosize
            aria-label="history textarea"
            placeholder="Histoire de Lise En"
            style={{
              width: 500,
              maxWidth: "80%",
              height: 400,
              marginBottom: 30,
            }}
            value={welEn}
            onChange={(e) => setWelEn(e.target.value)}
          />
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loadingWelEn}
              onClick={handleRequestWelEn}
            >
              Sauvegarder
            </Button>
            {loadingWelEn && (
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
