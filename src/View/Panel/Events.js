import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
function Events(props) {
  const [activeLang, setActiveLang] = useState("fr");

  const eventList = [
    {
      id: 1,
      nameFr: "Event Test 1",
      nameEN: "Test Event 1",
      descriptionFR: "Super Description",
      descriptionEN: "Excellent short Description",
      isActive: false,
    },
    {
      id: 2,
      nameFr: "Event Test 2",
      nameEN: "Test Event 2",
      descriptionFR: "Super Description",
      descriptionEN: "Excellent short Description",
      isActive: true,
    },
    {
      id: 3,
      nameFr: "Event Test 3",
      nameEN: "test Event 3",
      descriptionFR: "Super Description",
      descriptionEN: "Excellent short Description",
      isActive: false,
    },
  ];
  return (
    <div>
      <h2>Activez et desactivez les events de l'app</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                Nom{" "}
                <IconButton
                  size={"small"}
                  onClick={() => {
                    setActiveLang(activeLang === "fr" ? "en" : "fr");
                  }}
                >
                  <SvgIcon component={LanguageIcon} />
                </IconButton>
              </TableCell>

              <TableCell align="center">
                Description{" "}
                <IconButton
                  size={"small"}
                  onClick={() => {
                    setActiveLang(activeLang === "fr" ? "en" : "fr");
                  }}
                >
                  <SvgIcon component={LanguageIcon} />
                </IconButton>
              </TableCell>

              <TableCell align="center">Changer de statut</TableCell>
              <TableCell align="center">Modifier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventList.map((event) => (
              <EventLine key={event.id} event={event} activeLang={activeLang} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function EventLine({ event, modifyCallBack, activeLang }) {
  return (
    <TableRow

    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">
        <Avatar alt="Image" src={event.imageUri} align="center" />
      </TableCell>

      <TableCell align="center" component="th" scope="row">
        {activeLang === "fr" ? event.nameFr : event.nameEN}
      </TableCell>

      <TableCell align="center">
        <div style={{ maxWidth: 300, textAlign: "center" }}>
          {activeLang === "fr" ? event.descriptionFR : event.descriptionEN}
        </div>
      </TableCell>

      <TableCell align="center">
        {event.isActive ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              modifyCallBack(event.id);
            }}
          >
            Désactiver
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              modifyCallBack(event.id);
            }}
          >
            Activer
          </Button>
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => {
            modifyCallBack(event.id);
          }}
        >
          <SvgIcon component={EditIcon} color="info" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default Events;
