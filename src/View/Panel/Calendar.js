import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
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
const Input = styled("input")({
  display: "none",
});
const calendarEvents = [
  {
    id: 1,
    nameFR: "Soirée Gravity",
    nameEN: "Gravity's night",
    headerFR: "Jeudi ici !",
    headerEN: "Thursday there !",
    bottomFR: "",
    bottomEN: "",
    descriptionFR: "Super Description en Français",
    descriptionEN: "English description",
    dateTime: new Date(),
    adresse: "",
    lat: 0,
    long: 0,
    markerNameFR: "Localisation",
    markerNameEN: "Localisation EN",
    markerDescriptionFR: "Petite Description",
    markerDescriptionEN: "Small Description",
    isInscriptionPossible: true,
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 2,
    nameFR: "Soirée Gravity",
    nameEN: "Gravity's night",
    headerFR: "Jeudi ici !",
    headerEN: "Thursday there !",
    localisationFR: "",
    localisationEN: "",
    descriptionFR: "Super Description en Français",
    descriptionEN: "English description",
    dateTime: new Date(),
    adresse: "",
    lat: 0,
    long: 0,
    markerNameFR: "Localisation",
    markerNameEN: "Localisation EN",
    markerDescriptionFR: "Petite Description",
    markerDescriptionEN: "Small Description",
    isInscriptionPossible: false,
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
];
function Calendar(props) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [eventInEdit, setEventInEdit] = useState();
  function modifyEvent(id) {
    console.log(id);
    setEventInEdit(calendarEvents[id - 1]);
    setIsEditOpen(true);
  }

  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h3>Liste des évenements dans le calendrier</h3>
      <CalendarTable
        modifyCallBack={modifyEvent}
        calendarEvents={calendarEvents}
      />
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => setIsCreateOpen(true)}
      >
        Ajouter un évenement
      </Button>
      <CreateEventDialog isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />

      <EditEventDialog
        isOpen={isEditOpen}
        event={eventInEdit}
        setIsOpen={setIsEditOpen}
      />
    </div>
  );
}

function CalendarTable({ calendarEvents, modifyCallBack }) {
  const [activeLang, setActiveLang] = useState("fr");

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
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
              Entête
              <br />
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
              Bottom Text
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
            <TableCell align="center">Date et heure</TableCell>
            <TableCell align="center">
              Latitude <br /> Longitude
            </TableCell>
            <TableCell align="center">
              Nom Marker
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
              <div>Description Marker</div>
              <IconButton
                size={"small"}
                onClick={() => {
                  setActiveLang(activeLang === "fr" ? "en" : "fr");
                }}
              >
                <SvgIcon component={LanguageIcon} />
              </IconButton>
            </TableCell>

            <TableCell align="center">Participants</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calendarEvents.map((event) => (
            <TableLine
              event={event}
              activeLang={activeLang}
              modifyCallBack={() => modifyCallBack(event.id)}
            />
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

      <TableCell component="th" scope="row" align="center">
        {activeLang === "fr" ? event.nameFR : event.nameEN}
      </TableCell>

      <TableCell align="center">
        <div style={{ maxWidth: 100, textAlign: "center" }}>
          {activeLang === "fr" ? event.headerFR : event.headerEN}
        </div>
      </TableCell>
      <TableCell align="center">
        <div style={{ maxWidth: 100, textAlign: "center" }}>
          {activeLang === "fr" ? event.bottomFR : event.bottomEN}
        </div>
      </TableCell>
      <TableCell align="center">
        <div style={{ maxWidth: 200, textAlign: "center" }}>
          {activeLang === "fr" ? event.descriptionFR : event.descriptionEN}
        </div>
      </TableCell>
      <TableCell align="center">
        <div style={{ maxWidth: 100, textAlign: "center" }}>
          {event.dateTime.toString()}
        </div>
      </TableCell>
      <TableCell align="center">
        {event.lat} <br /> {event.long}
      </TableCell>
      <TableCell align="center">
        {activeLang === "fr" ? event.markerNameFR : event.markerNameEN}
      </TableCell>
      <TableCell align="center">
        {activeLang === "fr"
          ? event.markerDescriptionFR
          : event.markerDescriptionEN}
      </TableCell>

      <TableCell align="center">
        {event.isInscriptionPossible ? (
          <IconButton
            onClick={() => {
              modifyCallBack(event.id);
            }}
          >
            <SvgIcon component={VisibilityIcon} color="info" />
          </IconButton>
        ) : (
          "Inscription Non Activé"
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

function CreateEventDialog({ isOpen, setIsOpen }) {
  const [image, setImage] = useState();

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Ajout d'un event dans le calendrier</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Merci de remplir tout les champs suivant, un champ non/mal remplis
          peut causer un bug de l'application mobile.
        </DialogContentText>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="name"
            label="Nom FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            margin="dense"
            id="name"
            label="Nom EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="lat"
            label="Entete FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            margin="dense"
            id="long"
            label="Entete EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="lat"
            label="bottomText FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            margin="dense"
            id="long"
            label="BottomText EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            multiline
            margin="dense"
            id="name"
            label="Description FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            multiline
            margin="dense"
            id="name"
            label="Description EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <TextField
          margin="dense"
          id="adress"
          label="Adresse"
          fullWidth
          variant="filled"
        />
        <DialogContentText>
          Vous pouvez utilisez{" "}
          <a href="https://www.coordonnees-gps.fr" target="_blank">
            ce site
          </a>{" "}
          pour trouver la latitude et la longitude. <br />
          Ne pas hésiter à replacer manuellement le pointeur sur le restaurant
          avant de prendre les données !
        </DialogContentText>

        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="lat"
            label="Latitude (NE PAS ARRONDIR)"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            margin="dense"
            id="long"
            label="Longitude (NE PAS ARRONDIR)"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="lat"
            label="Nom Marker FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            margin="dense"
            id="long"
            label="Nom Marker EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="lat"
            label="Description Marker FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            margin="dense"
            id="long"
            label="Description Marker EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Activer les inscriptions à l'évènement (Et donc la liste de participants)"
          labelPlacement="end"
        />
        <DialogContentText>
          <h3>Image de présentation</h3>
          Évitez les images trop lourdes : Elles seront téléchargé à chaque fois
          que l'utilisateur consulte les restaurants dans l'application.
          <br />
          C'est sur téléphone on a pas besoin de beaucoup de qualité.
        </DialogContentText>

        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          fullWidth
          style={{ justifyContent: "center" }}
        >
          {image ? (
            <img
              src={image}
              alt="preview image"
              style={{
                maxWidth: 200,
              }}
            />
          ) : (
            <></>
          )}
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => onImageChange(e?.target?.files)}
            />
            <Button variant="contained" component="span">
              {image ? "Change Image" : "Select an image"}
            </Button>
          </label>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Annuler</Button>
        <Button variant="contained" onClick={() => setIsOpen(false)}>
          Ajouter dans le calendrier
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function EditEventDialog({ isOpen, setIsOpen, event }) {
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(event?.imageUri);
  }, [event]);
  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Modification d'un calendrier</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Merci de remplir tout les champs suivant, un champ non/mal remplis
          peut causer un bug de l'application mobile.
        </DialogContentText>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            defaultValue={event?.nameFR}
            margin="dense"
            id="name"
            label="Nom FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            defaultValue={event?.nameEN}
            margin="dense"
            id="name"
            label="Nom EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            defaultValue={event?.headerFR}
            margin="dense"
            id="lat"
            label="Entete FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            defaultValue={event?.headerEN}
            margin="dense"
            id="long"
            label="Entete EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            defaultValue={event?.bottomFR}
            margin="dense"
            id="lat"
            label="bottomText FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            defaultValue={event?.bottomEN}
            margin="dense"
            id="long"
            label="BottomText EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            defaultValue={event?.descriptionFR}
            multiline
            margin="dense"
            id="name"
            label="Description FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            defaultValue={event?.descriptionEN}
            multiline
            margin="dense"
            id="name"
            label="Description EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <TextField
          defaultValue={event?.adresse}
          margin="dense"
          id="adress"
          label="Adresse"
          fullWidth
          variant="filled"
        />
        <DialogContentText>
          Vous pouvez utilisez{" "}
          <a href="https://www.coordonnees-gps.fr" target="_blank">
            ce site
          </a>{" "}
          pour trouver la latitude et la longitude. <br />
          Ne pas hésiter à replacer manuellement le pointeur sur le restaurant
          avant de prendre les données !
        </DialogContentText>

        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            defaultValue={event?.lat}
            margin="dense"
            id="lat"
            label="Latitude (NE PAS ARRONDIR)"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            defaultValue={event?.long}
            margin="dense"
            id="long"
            label="Longitude (NE PAS ARRONDIR)"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            defaultValue={event?.markerNameFR}
            margin="dense"
            id="lat"
            label="Nom Marker FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            defaultValue={event?.markerNameEN}
            margin="dense"
            id="long"
            label="Nom Marker EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            defaultValue={event?.markerDescriptionFR}
            margin="dense"
            id="lat"
            label="Description Marker FR"
            variant="filled"
            style={{ width: "48%" }}
          />
          <TextField
            defaultValue={event?.markerDescriptionEN}
            margin="dense"
            id="long"
            label="Description Marker EN"
            variant="filled"
            style={{ width: "48%" }}
          />
        </div>
        <FormControlLabel
          defaultValue={event?.isInscriptionPossible}
          defaultChecked={event?.isInscriptionPossible}
          value="end"
          control={
            <Checkbox
              defaultValue={event?.isInscriptionPossible}
              defaultChecked={event?.isInscriptionPossible}
            />
          }
          label="Activer les inscriptions à l'évènement (Et donc la liste de participants)"
          labelPlacement="end"
        />
        <DialogContentText>
          <h3>Image de présentation</h3>
          Évitez les images trop lourdes : Elles seront téléchargé à chaque fois
          que l'utilisateur consulte les restaurants dans l'application.
          <br />
          C'est sur téléphone on a pas besoin de beaucoup de qualité.
        </DialogContentText>

        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          fullWidth
          style={{ justifyContent: "center" }}
        >
          {image ? (
            <img
              src={image}
              alt="preview image"
              style={{
                maxWidth: 200,
              }}
            />
          ) : (
            <></>
          )}
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => onImageChange(e?.target?.files)}
            />
            <Button variant="contained" component="span">
              {image ? "Change Image" : "Select an image"}
            </Button>
          </label>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Annuler</Button>
        <Button variant="contained" onClick={() => setIsOpen(false)}>
          Ajouter le restaurant
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function ParticipantDialog() {}

export default Calendar;
