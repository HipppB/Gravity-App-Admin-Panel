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

  const {
    data: allParti,
    loading: loadingParti,
    error: errorParti,
    newRequest: fetchAllParti,
  } = useFetch();
  useEffect(() => {
    fetchAllParti("challenge/list-user/processing/" + id, "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    if (allParti && !loadingParti) {
      setParticipants(allParti);
    }
  }, [allParti, loadingParti]);

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
      {allParticipants.map((participant) => (
        <ParticipantSubmission participant={participant} />
      ))}
    </div>
  );
}

function ParticipantSubmission({ participant }) {
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
    if (allSubs && !loadingSubs) {
      setSubs(allSubs);
    }
  }, [allSubs, loadingSubs]);
  useEffect(() => {
    if (userData && !loadUser) {
      setuser(userData);
    }
  }, [userData, loadUser]);
  return (
    <div style={{ margin: 20 }}>
      participant id n°{participant?.id} : {user?.first_name} {user?.last_name}{" "}
      {user?.email} {user?.phone_number}
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {subs.map((sub) => (
          <Submission sub={sub} />
        ))}
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
      Image n°{sub.id}
      <img src={imgUri} style={{ width: 200 }} loading="lazy" />
    </div>
  );
}

export default ChallengesSubId;
