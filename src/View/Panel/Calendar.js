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

const Input = styled("input")({
  display: "none",
});
// const calendarEvents = [
//   {
//     id: 1,
//     nameFR: "Soirée Gravity",
//     nameEN: "Gravity's night",
//     headerFR: "Jeudi ici !",
//     headerEN: "Thursday there !",
//     bottomFR: "",
//     bottomEN: "",
//     descriptionFR: "Super Description en Français",
//     descriptionEN: "English description",
//     dateTime: new Date(),
//     adresse: "",
//     lat: 0,
//     long: 0,
//     markerNameFR: "Localisation",
//     markerNameEN: "Localisation EN",
//     markerDescriptionFR: "Petite Description",
//     markerDescriptionEN: "Small Description",
//     isInscriptionPossible: true,
//     imageUri:
//       "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
//   },
//   {
//     id: 2,
//     nameFR: "Soirée Gravity",
//     nameEN: "Gravity's night",
//     headerFR: "Jeudi ici !",
//     headerEN: "Thursday there !",
//     localisationFR: "",
//     localisationEN: "",
//     descriptionFR: "Super Description en Français",
//     descriptionEN: "English description",
//     dateTime: new Date(),
//     adresse: "",
//     lat: 0,
//     long: 0,
//     markerNameFR: "Localisation",
//     markerNameEN: "Localisation EN",
//     markerDescriptionFR: "Petite Description",
//     markerDescriptionEN: "Small Description",
//     isInscriptionPossible: false,
//     imageUri:
//       "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
//   },
// ];
function Calendar(props) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [eventInEdit, setEventInEdit] = useState();
  const { apiToken } = useAuthentification();
  const [eventsData, setEventsData] = useState([]);

  const {
    data: allEvents,
    loading: loadingEvents,
    error: errorEvents,
    newRequest: fetchAllEvents,
  } = useFetch();
  useEffect(() => {
    if (!isCreateOpen && !isEditOpen) {
      fetchAllEvents("event/all", "GET", {}, apiToken);
    }
  }, [isEditOpen, isCreateOpen]);
  useEffect(() => {
    console.log(allEvents);

    if (allEvents && !loadingEvents) {
      setEventsData(allEvents);
    }
  }, [loadingEvents, allEvents]);

  function modifyEvent(event) {
    setEventInEdit(event);
    setIsEditOpen(true);
  }

  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h3>Liste des évenements dans le calendrier</h3>
      <CalendarTable modifyCallBack={modifyEvent} eventsData={eventsData} />
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

function CalendarTable({ eventsData, modifyCallBack }) {
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
            <TableCell align="center">Nom Marker</TableCell>
            <TableCell align="center">
              <div>Sous titre Marker</div>
            </TableCell>

            <TableCell align="center">Participants</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventsData.map((event) => (
            <TableLine
              event={event}
              activeLang={activeLang}
              modifyCallBack={() => modifyCallBack(event)}
              key={event.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TableLine({ event, modifyCallBack, activeLang }) {
  const evDate = new Date(event.date);
  return (
    <TableRow key={event.id}>
      <TableCell>
        <ImageIcon imgUri={event.image} />
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
          {evDate.getDate()}/{evDate.getMonth()} {evDate.getHours()}h
          {evDate.getMinutes()}
        </div>
      </TableCell>
      <TableCell align="center">
        {event.location.coordinates[1]} <br /> {event.location.coordinates[0]}
      </TableCell>
      <TableCell align="center">{event.location_title}</TableCell>
      <TableCell align="center">{event.location_subtitle}</TableCell>

      <TableCell align="center">
        {event.open ? (
          <IconButton
            onClick={() => {
              modifyCallBack(event);
            }}
          >
            <SvgIcon component={VisibilityIcon} color="info" />
          </IconButton>
        ) : (
          "Non Activé."
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => {
            modifyCallBack(event);
          }}
        >
          <SvgIcon component={EditIcon} color="info" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
function ImageIcon({ imgUri }) {
  const [img, setimg] = useState();
  const { apiToken } = useAuthentification();
  useEffect(() => getImageBlobUrl(imgUri, apiToken, setimg), []);
  return <Avatar alt="Image" src={img} />;
}

function CreateEventDialog({ isOpen, setIsOpen }) {
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const { apiToken } = useAuthentification();
  const { newRequest } = useFetch();

  const [nameFr, setNameFr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const [link, setLink] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [shortFr, setShortFr] = useState("");
  const [shortEn, setShortEn] = useState("");
  const [locaFr, setLocaFr] = useState("");
  const [locaEn, setLocaEn] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [markerName, setMarkerName] = useState("");
  const [markerSub, setMarkerSub] = useState("");
  const [isEventOpen, setEventOpen] = useState(true);
  const [dateEv, setDate] = useState();
  const [dateValue, setDateValue] = useState();
  function mangaeDate(value) {
    try {
      let da = value.split(" ");
      let da1 = da[0].split("/");
      let da2 = da[1].split(":");
      console.log(da1, da2);
      const dateNew = new Date(2022, da1[1], da1[0], da2[0], da2[1], 0);
      console.log(dateNew);
      setDateValue(dateNew);
      setDate(value);
    } catch (e) {
      setDate(value);
    }
  }
  async function createEvent() {
    if (imageFile) {
      getImagePath(imageFile, apiToken).then((imageUri) =>
        requestCreation(imageUri.filename)
      );
    } else {
      requestCreation("");
    }
  }
  function requestCreation(filename) {
    console.log(apiToken);
    newRequest(
      "event/create",
      "POST",
      {
        title: nameFr,
        date: "2022-03-26T17:31:53.417Z",
        image: filename,
        latitude: lat,
        longitude: long,
        location_str: " ",
        location_title: markerName,
        location_subtitle: markerSub,
        open: isEventOpen,
        translation: [
          {
            language: "fr",
            isDefault: true,
            short_desc: shortFr,
            long_desc: descFr,
            title: nameFr,
          },
          {
            language: "en",
            isDefault: false,
            short_desc: shortEn,
            long_desc: descEn,
            title: nameEn,
          },
        ],
      },
      apiToken
    );
    setIsOpen(false);
    setImage();
    setImageFile();
  }
  const onImageChange = (files) => {
    if (files && files[0]) {
      setImageFile(files[0]);
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
            value={nameFr}
            onChange={(e) => setNameFr(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Nom EN"
            variant="filled"
            style={{ width: "48%" }}
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="shortFr"
            label="Entete FR (Page liste Events)"
            variant="filled"
            style={{ width: "48%" }}
            value={shortFr}
            onChange={(e) => setShortFr(e.target.value)}
          />
          <TextField
            margin="dense"
            id="shortEn"
            label="Entete EN (Page liste Events)"
            variant="filled"
            style={{ width: "48%" }}
            value={shortEn}
            onChange={(e) => setShortEn(e.target.value)}
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
            value={descFr}
            onChange={(e) => setDescFr(e.target.value)}
          />
          <TextField
            multiline
            margin="dense"
            id="name"
            label="Description EN"
            variant="filled"
            style={{ width: "48%" }}
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
          />
        </div>
        <TextField
          margin="dense"
          id="date"
          label="Date et heure, format : JJ/MM HH:MIN"
          variant="filled"
          value={dateEv}
          fullWidth
          onChange={(e) => mangaeDate(e.target.value)}
        />
        Analyse en directe :{" "}
        {dateValue ? (
          <div>
            {/* {dateValue.getDate()}/{dateValue.getMonth()} {dateValue.getHours()}:
            {dateValue.getMinutes()} */}
            {dateValue.toString()}
          </div>
        ) : (
          "Impossible d'analyser la date."
        )}
        <DialogContentText>
          Vous pouvez utilisez{" "}
          <a href="https://www.coordonnees-gps.fr" target="_blank">
            ce site
          </a>{" "}
          pour trouver la latitude et la longitude. <br />
          Ne pas hésiter à replacer manuellement le pointeur sur le lieu avant
          de prendre les coordonnées !
        </DialogContentText>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="lat"
            label="Latitude (NE PAS ARRONDIR)"
            variant="filled"
            style={{ width: "48%" }}
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <TextField
            margin="dense"
            id="long"
            label="Longitude (NE PAS ARRONDIR)"
            variant="filled"
            style={{ width: "48%" }}
            value={long}
            onChange={(e) => setLong(e.target.value)}
          />
        </div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            margin="dense"
            id="nameMark"
            label="Nom Marker"
            variant="filled"
            style={{ width: "48%" }}
            value={markerName}
            onChange={(e) => setMarkerName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="descMark"
            label="Description"
            variant="filled"
            style={{ width: "48%" }}
            value={markerSub}
            onChange={(e) => setMarkerSub(e.target.value)}
          />
        </div>
        <FormControlLabel
          checked={isEventOpen}
          onChange={() => setEventOpen(!isEventOpen)}
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
        <Button variant="contained" onClick={() => createEvent()}>
          Ajouter dans le calendrier
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function EditEventDialog({ isOpen, setIsOpen, event }) {
  const [image, setImage] = useState();
  const { apiToken } = useAuthentification();
  const { newRequest } = useFetch();

  useEffect(() => {
    getImageBlobUrl(event?.image, apiToken, setImage);
  }, [event]);
  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  function deleteEvent() {
    newRequest("event/" + event.id, "DELETE", {}, apiToken);
    setIsOpen(false);
  }
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
        <Button color="error" variant="contained" onClick={() => deleteEvent()}>
          Supprimer
        </Button>
        <Button variant="contained" onClick={() => setIsOpen(false)}>
          Ajouter le restaurant
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function ParticipantDialog() {}

export default Calendar;
