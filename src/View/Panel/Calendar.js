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

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Calendar(props) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [eventInEdit, setEventInEdit] = useState();
  const calendarEvents = [
    {
      id: 1,
      name: "Event Cal 1",
      adresse: "Super Adresse",
      descriptionFR: "Crêpes à volonté !",
      descriptionEN: "Unlimited crepes !",
      imageUri:
        "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
    },
    {
      id: 2,
      name: "Event Cal 2",
      adresse: "Super Adresse",
      descriptionFR: "Soirée Gravity !",
      descriptionEN: "gravity Night !",
      imageUri:
        "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
    },
  ];
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h3>Liste des évenements dans le calendrier</h3>
      <CalendarTable
        modifyCallBack={setEventInEdit}
        calendarEvents={calendarEvents}
      />
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => setIsCreateOpen(true)}
      >
        Ajouter un évenement
      </Button>
      {/* <CreateEventDialog isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />

      <EditEventDialog
        isOpen={isEditOpen}
        restaurant={setEventInEdit}
        setIsOpen={setIsEditOpen}
      /> */}
    </div>
  );
}

function CalendarTable({ calendarEvents }) {
  const [activeLang, setActiveLang] = useState("fr");

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Nom</TableCell>
            <TableCell align="center">
              Description
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
              Description
              <IconButton
                size={"small"}
                onClick={() => {
                  setActiveLang(activeLang === "fr" ? "en" : "fr");
                }}
              >
                <SvgIcon component={LanguageIcon} />
              </IconButton>
            </TableCell>

            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calendarEvents.map((event) => (
            <TableLine event={event} activeLang={activeLang} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TableLine({ event, modifyCallBack, activeLang }) {
  return (
    <TableRow
      key={event.id}
      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Avatar alt="Image" src={event.imageUri} />
      </TableCell>

      <TableCell component="th" scope="row">
        {event.name}
      </TableCell>

      <TableCell align="center">
        <div style={{ maxWidth: 300, textAlign: "center" }}>
          {activeLang === "fr" ? event.descriptionFR : event.descriptionEN}
        </div>
      </TableCell>
      <TableCell align="center">
        <div style={{ maxWidth: 300, textAlign: "center" }}>
          {activeLang === "fr" ? event.markerDescFR : event.markerDescEN}
        </div>
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

function CreateDialog() {}
function EditDialog() {}

export default Calendar;
