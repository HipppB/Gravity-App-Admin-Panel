import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

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

const sponsorsData = [
  {
    id: 1,
    name: "Super Sponsor",

    descriptionFR: "Bon et pas cher",
    descriptionEN: "Succulent and inexpensive",

    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 2,
    name: "Super Sponsor 2",

    descriptionFR: "Bon et pas cher",
    descriptionEN: "Succulent and inexpensive",

    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 3,
    name: "Super Sponsor 3",

    descriptionFR: "Bon et pas cher",
    descriptionEN:
      "This is a very long description just to check that everything is working fine. If not I have to redo it all",

    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 4,
    name: "Super Sponsor 4",

    descriptionFR: "Bon et pas cher test description à rallonge pour voir",
    descriptionEN: "Succulent and inexpensive",

    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 5,
    name: "Super Sponsor 5",

    descriptionFR: "Bon et pas cher",
    descriptionEN: "Succulent and inexpensive",

    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
];

const Input = styled("input")({
  display: "none",
});
function Sponsors(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sponsorInEdit, setSponsorInEdit] = useState();
  function modifySponsor(id) {
    setSponsorInEdit(sponsorsData[id - 1]);
    setIsEditOpen(true);
  }
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h3>Liste des sponsors</h3>
      <CreateSponsorDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <BasicTable modifyCallBack={modifySponsor} />
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => setIsOpen(true)}
      >
        Ajouter un sponsor
      </Button>
      <EditSponsorDialog
        isOpen={isEditOpen}
        sponsor={sponsorInEdit}
        setIsOpen={setIsEditOpen}
      />
    </div>
  );
}

function BasicTable({ modifyCallBack }) {
  const [activeLang, setActiveLang] = useState("fr");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Sponsors</TableCell>

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

            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sponsorsData.map((sponsor) => (
            <TableRow key={sponsor.id}>
              <TableCell>
                <Avatar alt="Image" src={sponsor.imageUri} />
              </TableCell>

              <TableCell component="th" scope="row">
                {sponsor.name}
              </TableCell>

              <TableCell align="center">
                <div style={{ maxWidth: 300, textAlign: "center" }}>
                  {activeLang === "fr"
                    ? sponsor.descriptionFR
                    : sponsor.descriptionEN}
                </div>
              </TableCell>

              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    modifyCallBack(sponsor.id);
                  }}
                >
                  <SvgIcon component={EditIcon} color="info" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CreateSponsorDialog({ isOpen, setIsOpen }) {
  const [image, setImage] = useState();

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Ajout d'un sponsor</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Merci de remplir tout les champs suivant, un champ non/mal remplis
          peut causer un bug de l'application mobile.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom du sponsor"
          fullWidth
          variant="filled"
        />
        <TextField
          margin="dense"
          id="description"
          label="Description du sponsor"
          multiline
          fullWidth
          variant="filled"
        />
        <TextField
          margin="dense"
          id="description"
          label="Description du sponsor en anglais"
          multiline
          fullWidth
          variant="filled"
        />
        <TextField
          margin="dense"
          id="adress"
          label="Adresse"
          fullWidth
          variant="filled"
        />

        <DialogContentText>
          <h3>Image de présentation</h3>
          Évitez les images trop lourdes : Elles seront téléchargé à chaque fois
          que l'utilisateur consulte les sponsors dans l'application.
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
              {image ? "Changer l'image" : "Choisir une image"}
            </Button>
          </label>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Annuler</Button>
        <Button variant="contained" onClick={() => setIsOpen(false)}>
          Ajouter le sponsor
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditSponsorDialog({ isOpen, setIsOpen, sponsor }) {
  const [image, setImage] = useState(sponsor?.imageUri);
  useEffect(() => {
    setImage(sponsor?.imageUri);
  }, [sponsor]);

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Modification du sponsor id {sponsor?.id}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Merci de remplir tout les champs suivant, un champ non/mal remplis
          peut causer un bug de l'application mobile.
        </DialogContentText>
        <TextField
          defaultValue={sponsor?.name}
          margin="dense"
          id="name"
          label="Nom du sponsor"
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={sponsor?.descriptionFR}
          margin="dense"
          id="description"
          label="Description du sponsor"
          multiline
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={sponsor?.descriptionEN}
          margin="dense"
          id="description"
          label="Description du sponsor en anglais"
          multiline
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={sponsor?.adresse}
          margin="dense"
          id="adress"
          label="Adresse"
          fullWidth
          variant="filled"
        />

        <DialogContentText>
          <h3>Image de présentation</h3>
          Évitez les images trop lourdes : Elles seront téléchargé à chaque fois
          que l'utilisateur consulte les sponsors dans l'application.
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
              {image ? "Changer l'image" : "Choisir une image"}
            </Button>
          </label>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Annuler</Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => setIsOpen(false)}
        >
          Supprimer
        </Button>
        <Button variant="contained" onClick={() => setIsOpen(false)}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Sponsors;
