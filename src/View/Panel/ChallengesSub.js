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
import { useLocation } from "react-router";
function ChallengesSub(props) {
  const { state } = useLocation();

  const { apiToken } = useAuthentification();
  const [subs, setSubs] = useState([]);
  const {
    data: allSubs,
    loading: loadingSubs,
    error: errorSubs,
    newRequest: fetchAllSubs,
  } = useFetch();
  console.log("PROPS", state);
  //   useEffect(() => {
  //     fetchAllSubs("challenge/admin/all", "GET", {}, apiToken);

  //   }, []);
  useEffect(() => {
    console.log(allSubs);
    if (allSubs && !loadingSubs) {
      setSubs(allSubs);
    }
  }, [allSubs, loadingSubs]);

  console.log(props);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {state?.challenge?.challenge_submission.map((sub) => (
        <Submission sub={sub} />
      ))}
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
    <div style={{ margin: 20 }}>
      <img src={imgUri} style={{ width: 200, height: 200 }} loading="lazy" />
    </div>
  );
}

export default ChallengesSub;
