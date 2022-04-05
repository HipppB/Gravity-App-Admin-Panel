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
import { useAuthentification } from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetch";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import getImagePath from "../../data/getImagePath";
const Input = styled("input")({
  display: "none",
});
function Sponsors(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sponsorInEdit, setSponsorInEdit] = useState();
  function modifySponsor(id) {
    setSponsorInEdit(id);
    setIsEditOpen(true);
  }
  const { apiToken } = useAuthentification();
  const {
    data: allSponsors,
    loading: loadingSponsors,
    error: errorSponsors,
    newRequest: fetchAllSponsors,
  } = useFetch();
  const [sponsorsData, setSponsorsData] = useState([]);

  useEffect(() => {
    if(!isOpen && !isEditOpen) {
    fetchAllSponsors("sponsor/all", "GET", {}, apiToken);
  }
  }, [isEditOpen, isOpen]);
  useEffect(() => {
    if (allSponsors && !loadingSponsors) {
      setSponsorsData(allSponsors);
      console.log(allSponsors);
    }
  }, [loadingSponsors, allSponsors]);
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h3>Liste des sponsors</h3>
      <CreateSponsorDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <BasicTable modifyCallBack={modifySponsor} sponsorsData={sponsorsData} />
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

function BasicTable({ modifyCallBack, sponsorsData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Image</TableCell> */}
            <TableCell>Sponsors</TableCell>

            <TableCell align="center">
              Description{" "}
              <IconButton
                size={"small"}
                onClick={() => {
                  // setActiveLang(activeLang === "fr" ? "en" : "fr");
                }}
              >
                <SvgIcon component={LanguageIcon} />
              </IconButton>
            </TableCell>

            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sponsorsData.map((sponsor) => {
            console.log(sponsor);
            
            return (
              <TableRow key={sponsor.id}>
                {/* <TableCell>
                  <Avatar alt="Image" src={sponsor.imageUri} />
                </TableCell> */}

                <TableCell component="th" scope="row">
                  {sponsor.name}
                </TableCell>

                <TableCell align="center">
                  <div style={{ maxWidth: 300, textAlign: "center" }}>
                    {sponsor.translation[0].description}
                  </div>
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      modifyCallBack(sponsor);
                    }}
                  >
                    <SvgIcon component={EditIcon} color="info" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CreateSponsorDialog({ isOpen, setIsOpen }) {
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState()
  const {apiToken} = useAuthentification()
  const {newRequest} = useFetch()


  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [picture, setPicture] = useState("")
  const [descFr, setDescFr] = useState("")
  const [descEn, setDescEn] = useState("")
  const [subFr, setSubFr] = useState("")
  const [subEn, setSubEn] = useState("")
  async function createSponsor() {
    if(imageFile) {
      getImagePath(imageFile, apiToken).then((imageUri) =>requestCreation(imageUri.filename) )

    }
    else {
      requestCreation("")
    }
    
  }
  function requestCreation(filename) {
    newRequest("sponsor/create", "POST", {
      "type": "classic",
      "name": name,
      "link": link,
      "picture": filename,
      "longitude": 0,
      "latitude": 0,
      "translation": [
        {
          "language": "fr",
          "isDefault": true,
          "description": descFr,
          "context_text": subFr  + "\n"
        },
        {
          "language": "en",
          "isDefault": true,
          "description": descEn,
          "context_text": subEn  + "\n"
    
        }
      ]
    },apiToken)
    setIsOpen(false)
    setImage()
    setImageFile()

  }
  const onImageChange = (files) => {
    if (files && files[0]) {
      setImageFile(files[0])
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         <TextField
          margin="dense"
          id="adress"
          label="Sous titre fr"
          fullWidth
          variant="filled"
          value={subFr}
          onChange={(e) => setSubFr(e.target.value)}
        />

        <TextField
          margin="dense"
          id="adress"
          label="Sous titre en"
          fullWidth
          variant="filled"
          value={subEn}
          onChange={(e) => setSubEn(e.target.value)}
        />

        <TextField
          margin="dense"
          id="description"
          label="Description du sponsor"
          multiline
          fullWidth
          variant="filled"
          value={descFr}
          onChange={(e) => setDescFr(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description du sponsor en anglais"
          multiline
          fullWidth
          variant="filled"
          value={descEn}
          onChange={(e) => setDescEn(e.target.value)}
        />
         <TextField
          margin="dense"
          id="description"
          label="Lien de redirection bouton (Bien mettre http(s)://)"
          multiline
          fullWidth
          variant="filled"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
       
        <DialogContentText>
          <h3>Image (Icone)</h3>
          Évitez les images trop lourdes : Elles seront téléchargé à chaque fois
          que l'utilisateur consulte les sponsors dans l'application.
          <br />
          C'est sur téléphone on a pas besoin de beaucoup de qualité. <br/>Surtout ici, ce n'est qu'un icone
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
        <Button variant="contained" onClick={() => createSponsor()}>
          Ajouter le sponsor
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditSponsorDialog({ isOpen, setIsOpen, sponsor }) {
  const [image, setImage] = useState(sponsor?.imageUri);
  const {apiToken} = useAuthentification()
  const {newRequest} = useFetch()
  useEffect(() => {
    setImage(sponsor?.imageUri);
  }, [sponsor]);

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  function deleteSponsor() {
    newRequest("sponsor/" + sponsor.id, "DELETE", {}, apiToken)
    setIsOpen(false)
  }
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
          onClick={() => deleteSponsor()}
        >
          Supprimer
        </Button>
        <Button variant="contained" onClick={() => setIsOpen(false)}>
          Mettre à jour
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Sponsors;
