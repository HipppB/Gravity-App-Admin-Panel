import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import FormControlLabel from "@mui/material/FormControlLabel";

import {
  Icon,
  SvgIcon,
  IconButton,
  Avatar,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthentification } from "../../Context/AuthContext";
import getImagePath from "../../data/getImagePath";
import getImageBlobUrl from "../../data/getImageBlobUrl";
import useFetch from "../../hooks/useFetch";
import { useLocation, useParams } from "react-router";

function ChallengesSubId(props) {
  let { id } = useParams();

  const { apiToken } = useAuthentification();

  const [allParticipants, setParticipants] = useState([]);
  const [allPRefused, setRefused] = useState([]);
  const [allPAccepted, setAccepted] = useState([]);

  const {
    data: allParti,
    loading: loadingParti,
    error: errorParti,
    newRequest: fetchAllParti,
  } = useFetch();
  const {
    data: allAccepted,
    loading: loadingAccepted,
    error: errorAccepted,
    newRequest: fetchAllAccepted,
  } = useFetch();
  const {
    data: allRefused,
    loading: loadingRefused,
    error: errorRefused,
    newRequest: fetchAllRefused,
  } = useFetch();
  useEffect(() => {
    fetchAllParti("challenge/list-user/processing/" + id, "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    fetchAllRefused("challenge/list-user/refused/" + id, "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    fetchAllAccepted(
      "challenge/list-user/validated/" + id,
      "GET",
      {},
      apiToken
    );
  }, []);
  useEffect(() => {
    if (allParti && !loadingParti) {
      setParticipants(allParti);
    }
  }, [allParti, loadingParti]);
  useEffect(() => {
    if (allAccepted && !loadingAccepted) {
      setAccepted(allAccepted);
    }
  }, [allAccepted, loadingAccepted]);
  useEffect(() => {
    if (allRefused && !loadingRefused) {
      setRefused(allRefused);
    }
  }, [allRefused, loadingRefused]);

  console.log(props);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h3>
        Un participant sans image ? Pas de panique ! C'est un petit bug qui
        arrive, contact hippolyte ! L'image apparait dans les submissions en
        vrac mais n'a pas été associée
      </h3>
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Submission en attente de réponses
      </h2>
      {allParticipants.map((participant) => (
        <ParticipantSubmission participant={participant} isProcessing />
      ))}
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Submission refusées
      </h2>
      {allPRefused.map((participant) => (
        <ParticipantSubmission participant={participant} />
      ))}
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Submission Acceptées
      </h2>
      {allPAccepted.map((participant) => (
        <ParticipantSubmission participant={participant} />
      ))}
    </div>
  );
}

function ParticipantSubmission({ participant, isProcessing }) {
  const {
    data: allSubs,
    loading: loadingSubs,
    error: errorSubs,
    newRequest: fetchAllSubs,
  } = useFetch();
  const {
    data: userData,
    loading: loadUser,
    error: errorUser,
    newRequest: fetchuser,
  } = useFetch();
  const { newRequest: fetchToggle } = useFetch();
  const { newRequest: fetchPoint } = useFetch();
  let { id } = useParams();

  const { apiToken } = useAuthentification();

  const [subs, setSubs] = useState([]);
  const [user, setuser] = useState({});
  useEffect(() => {
    fetchuser("user/profile/public/" + participant?.id, "GET", {}, apiToken);
    fetchAllSubs(
      "challenge/" + id + "/submission/" + participant?.id,
      "GET",
      {},
      apiToken
    );
  }, []);
  useEffect(() => {
    console.log(allSubs);
    if (allSubs && !loadingSubs) {
      setSubs(allSubs);
    }
  }, [allSubs, loadingSubs]);
  useEffect(() => {
    if (userData && !loadUser) {
      setuser(userData);
    }
  }, [userData, loadUser]);

  const [nbPoint, setPoint] = useState("5");
  const [contextText, setContext] = useState("");

  function changeStatus(isitAccepted) {
    fetchToggle(
      "challenge/status",
      "POST",
      {
        userId: participant?.id,
        challengeId: parseInt(id),
        status: isitAccepted ? "validated" : "refused",
        context: contextText,
      },
      apiToken
    );
    if (isitAccepted) {
      fetchToggle(
        "challenge/admin/add_points",
        "POST",
        {
          userId: participant?.id.toString(),
          value: parseInt(nbPoint),
          challengeId: id.toString(),
          context: contextText,
        },
        apiToken
      );
    }
  }

  return (
    <div style={{ margin: 20 }}>
      participant id n°{participant?.id} : {user?.first_name} {user?.last_name}{" "}
      {user?.email} {user?.phone_number} {user?.profile_picture}
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {subs.map((sub) => (
          <Submission sub={sub} />
        ))}
        {isProcessing && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            La raison est obligatoire pour un refus, optionel (et ne s'affichera
            pas à l'user) en cas de validation
            <div style={{ display: "flex" }}>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  multiline
                  margin="dense"
                  id="name"
                  label="Nombre de point à attribuer"
                  value={nbPoint}
                  onChange={(e) => setPoint(e.target.value)}
                />
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => changeStatus(true)}
                >
                  Valider le challenge
                </Button>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  multiline
                  margin="dense"
                  id="refused"
                  label="Raison"
                  value={contextText}
                  onChange={(e) => setContext(e.target.value)}
                />
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => changeStatus(false)}
                >
                  Refuser le challenge
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function Submission({ sub }) {
  const { apiToken } = useAuthentification();
  const [imgUri, setImgUri] = useState();

  useEffect(() => {
    console.log("hey", sub);
    getImageBlobUrl(sub?.content, apiToken, setImgUri);
  }, []);
  useEffect(() => console.log(imgUri), [imgUri]);

  return (
    <div style={{ margin: 20, display: "flex", flexDirection: "column" }}>
      Image n°{sub.id} sharable : {sub?.acceptToShareImage.toString()}
      <img src={imgUri} style={{ width: 200 }} loading="lazy" />
    </div>
  );
}

export default ChallengesSubId;
