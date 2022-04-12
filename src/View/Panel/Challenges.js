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
import { useNavigate, Outlet } from "react-router-dom";

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
  const [activeLang, setActiveLang] = useState(0);
  function toggleLang() {
    if (activeLang === 0) {
      setActiveLang(1);
    } else {
      setActiveLang(0);
    }
  }
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [challengeData, setChallengesData] = useState([]);
  const { apiToken } = useAuthentification();
  const [challengeInEdit, setChallengeInEdit] = useState();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    data: allChallenges,
    loading: loadingChallenges,
    error: errorChallenges,
    newRequest: fetchAllChallenges,
  } = useFetch();
  useEffect(() => {
    if (!isCreateOpen && !isEditOpen) {
      fetchAllChallenges("challenge/admin/all", "GET", {}, apiToken);
    }
  }, [isEditOpen, isCreateOpen]);
  useEffect(() => {
    console.log(allChallenges);

    if (allChallenges && !loadingChallenges) {
      setChallengesData(allChallenges);
    }
  }, [loadingChallenges, allChallenges]);

  function modifyChallenge(challenge) {
    setChallengeInEdit(challenge);
    setIsEditOpen(true);
  }
  let navigate = useNavigate();

  return (
    <>
      <h3>Créez et supprimez les challenges de l'app</h3>
      <h6>
        Pour des raisons techniques vous ne pouvez pas supprimer des challenges,
        contactez un membre du pole tech pour faire ça
        <br />
        On est réactif, promis. Pour que ça aille vite dites nous si il faut
        transferer les submissions des utilisateurs sur un autre challenge ou
        les supprimer !
      </h6>

      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">
                  Nom{" "}
                  <IconButton size={"small"} onClick={toggleLang}>
                    <SvgIcon component={LanguageIcon} />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  Sous titre{" "}
                  <IconButton size={"small"} onClick={toggleLang}>
                    <SvgIcon component={LanguageIcon} />
                  </IconButton>
                </TableCell>

                <TableCell align="center">
                  Description{" "}
                  <IconButton size={"small"} onClick={toggleLang}>
                    <SvgIcon component={LanguageIcon} />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  Récompense{" "}
                  <IconButton size={"small"} onClick={toggleLang}>
                    <SvgIcon component={LanguageIcon} />
                  </IconButton>
                </TableCell>
                <TableCell align="center">Type de réponse</TableCell>
                <TableCell align="center">
                  Date de fin (Spéciaux)
                  <br />
                  Date de début (Normaux)
                </TableCell>
                <TableCell align="center">
                  Voir les submissions
                  <br />
                  En vrac
                </TableCell>
                <TableCell align="center">
                  Voir les submissions
                  <br />
                  Par user
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challengeData.map((challenge) => (
                <ChallengeLine
                  key={challenge.id}
                  challenge={challenge}
                  activeLang={activeLang}
                />
                // <></>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => setIsCreateOpen(true)}
      >
        Créer un défi
      </Button>
      {/* <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => navigate("subs")}
      >
        Voir les submissions
      </Button> */}
      <CreateChallengeDialog
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      />
    </>
  );
}

function ChallengeLine({ challenge, modifyCallBack, activeLang }) {
  const data = new Date(challenge?.expiredAt);
  let navigate = useNavigate();

  return (
    <TableRow

    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">
        <ImageIcon imgUri={challenge.imageUri} />
      </TableCell>

      <TableCell align="center" component="th" scope="row">
        {challenge?.type}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {/* {challenge?.translation[activeLang]?.title} */}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {/* {challenge?.translation[activeLang]?.subtitle} */}
      </TableCell>

      <TableCell align="center" component="th" scope="row">
        {/* {challenge?.translation[activeLang]?.description} */}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {/* {challenge?.translation[activeLang]?.rewards} */}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {challenge?.submissionType}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {data.toLocaleDateString()} {data.toLocaleTimeString()}
      </TableCell>

      <TableCell align="center">
        <IconButton
          onClick={() => {
            // modifyCallBack(challenge.id);
            navigate("/Challenges/subs", { state: { challenge: challenge } });
          }}
        >
          <SvgIcon component={VisibilityIcon} color="info" />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => {
            // modifyCallBack(challenge.id);
            navigate("/Challenges/subs/" + challenge?.id);
          }}
        >
          <SvgIcon component={VisibilityIcon} color="info" />
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
function CreateChallengeDialog({ isOpen, setIsOpen }) {
  const dateDefault = new Date();

  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const { apiToken } = useAuthentification();
  const { newRequest } = useFetch();

  const [nameFr, setNameFr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [shortFr, setShortFr] = useState("");
  const [shortEn, setShortEn] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [rewFr, setRewFr] = useState("");
  const [rewEn, setRewEn] = useState("");
  const [isSpecial, setSpecial] = useState(false);
  const [acceptsImage, setAcceptImage] = useState(true);
  const [acceptsText, setAcceptText] = useState(false);
  const [dateEv, setDate] = useState(
    dateDefault.getDate() +
      "/" +
      (dateDefault.getMonth() + 1) +
      " " +
      dateDefault.getHours() +
      ":" +
      dateDefault.getMinutes()
  );
  const [dateValue, setDateValue] = useState(dateDefault);

  function mangaeDate(value) {
    try {
      let da = value.split(" ");
      let da1 = da[0].split("/");
      let da2 = da[1].split(":");
      console.log(da1, da2);
      const dateNew = new Date(2022, da1[1] - 1, da1[0], da2[0], da2[1], 0);
      console.log(dateNew);
      setDateValue(dateNew);
      setDate(value);
    } catch (e) {
      setDate(value);
    }
  }
  async function createChallenge() {
    if (imageFile) {
      getImagePath(imageFile, apiToken).then((imageUri) =>
        requestCreation(imageUri.filename)
      );
    } else {
      requestCreation();
    }
  }
  function requestCreation(filename) {
    newRequest(
      "challenge/create",
      "POST",
      {
        title: nameFr,
        expiredAt: dateValue,
        imageUri: filename,
        type: "normal",
        submissionType: acceptsImage
          ? acceptsText
            ? "mixed"
            : "image"
          : "text",
        translation: [
          {
            language: "fr",
            title: nameFr,
            subtitle: shortFr,
            description: descFr,
            rewards: rewFr,
          },
          {
            language: "en",
            title: nameEn,
            subtitle: shortEn,
            description: descEn,
            rewards: rewEn,
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
          checked={isSpecial}
          onChange={() => setSpecial(!isSpecial)}
          control={<Checkbox />}
          label="Défis spécial"
          labelPlacement="end"
        />
        <br />
        <FormControlLabel
          checked={acceptsText}
          onChange={() => setAcceptText(!acceptsText)}
          control={<Checkbox />}
          label="Permettre une réponse écrite"
          labelPlacement="end"
        />
        <br />
        <FormControlLabel
          checked={acceptsImage}
          onChange={() => setAcceptImage(!acceptsImage)}
          control={<Checkbox />}
          label="Permettre une réponse par une ou plusieurs photos/vidéos"
          labelPlacement="end"
        />
        <DialogContentText>Informations sur le défi :</DialogContentText>
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
            label="Sous titre Fr"
            variant="filled"
            style={{ width: "48%" }}
            value={shortFr}
            onChange={(e) => setShortFr(e.target.value)}
          />
          <TextField
            margin="dense"
            id="shortEn"
            label="Sous titre En"
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
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <TextField
            multiline
            margin="dense"
            id="name"
            label="Récompense FR"
            variant="filled"
            style={{ width: "48%" }}
            value={rewFr}
            onChange={(e) => setRewFr(e.target.value)}
          />
          <TextField
            multiline
            margin="dense"
            id="name"
            label="Récompenses EN"
            variant="filled"
            style={{ width: "48%" }}
            value={rewEn}
            onChange={(e) => setRewEn(e.target.value)}
          />
        </div>
        <TextField
          margin="dense"
          id="date"
          label="Date et heure de fin, format : JJ/MM HH:MIN"
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
          <h3>Image de présentation récompense (Ou non)</h3>
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
        <Button variant="contained" onClick={() => createChallenge()}>
          Ajouter dans le calendrier
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Challenges;
