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
function Challenges(props) {
  const [activeLang, setActiveLang] = useState("fr");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
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
    <>
      <h3>Créez et supprimez les events de l'app</h3>
      {/* <div>
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
                <EventLine
                  key={event.id}
                  event={event}
                  activeLang={activeLang}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => setIsCreateOpen(true)}
      >
        Créer un défi
      </Button>
      <CreateChallengeDialog
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      />
    </>
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
function CreateChallengeDialog({ isOpen, setIsOpen }) {
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
    const date = new Date();
    newRequest(
      "challenge/create",
      "POST",
      {
        title: "challenge",
        expiredAt: date,
        imageUri: "image-1648676328780-623333175.jpg",
        type: "normal",
        submissionType: "image",
        translation: [
          {
            language: "fr",
            title: "string",
            subtitle: "string",
            description: "string",
            rewards: "string",
          },
          {
            language: "en",
            title: "string",
            subtitle: "string",
            description: "string",
            rewards: "string",
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
      <DialogTitle>Création d'un défi</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Merci de remplir tout les champs suivant, un champ non/mal remplis
          peut causer un bug de l'application mobile.
          <br />
          <br />
        </DialogContentText>
        <DialogContentText>Type de défi :</DialogContentText>
        <FormControlLabel
          checked={isEventOpen}
          onChange={() => setEventOpen(!isEventOpen)}
          control={<Checkbox />}
          label="Défis spécial"
          labelPlacement="end"
        />
        <br />
        <FormControlLabel
          checked={isEventOpen}
          onChange={() => setEventOpen(!isEventOpen)}
          control={<Checkbox />}
          label="Permettre une réponse écrite"
          labelPlacement="end"
        />
        <br />
        <FormControlLabel
          checked={isEventOpen}
          onChange={() => setEventOpen(!isEventOpen)}
          control={<Checkbox />}
          label="Permettre une réponse par une ou plusieurs photos/vidéos"
          labelPlacement="end"
        />
        <DialogContentText>Type de défi :</DialogContentText>
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
export default Challenges;
