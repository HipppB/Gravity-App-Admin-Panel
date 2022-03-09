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

const restaurantsData = [
  {
    id: 1,
    name: "Super Resto",
    adresse: "Super Adresse",
    lat: 0,
    long: 0,
    descriptionFR: "Bon et pas cher",
    descriptionEN: "Succulent and inexpensive",
    markerDescFR: "Description test",
    markerDescEN: "Test description",
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 2,
    name: "Super Resto 2",
    adresse: "Super Adresse",
    lat: 0,
    long: 0,
    descriptionFR: "Bon et pas cher",
    descriptionEN: "Succulent and inexpensive",
    markerDescFR: "Description test",
    markerDescEN: "Test description",
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 3,
    name: "Super Resto 3",
    adresse: "Super Adresse",
    lat: 0,
    long: 0,
    descriptionFR: "Bon et pas cher",
    descriptionEN:
      "This is a very long description just to check that everything is working fine. If not I have to redo it all",
    markerDescFR: "Description test",
    markerDescEN: "Test description",
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 4,
    name: "Super Resto 4",
    adresse: "Super Adresse",
    lat: 0,
    long: 0,
    descriptionFR: "Bon et pas cher test description à rallonge pour voir",
    descriptionEN: "Succulent and inexpensive",
    markerDescFR: "Description test",
    markerDescEN: "Test description",
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
  {
    id: 5,
    name: "Super Resto 5",
    adresse: "Super Adresse",
    lat: 0,
    long: 0,
    descriptionFR: "Bon et pas cher",
    descriptionEN: "Succulent and inexpensive",
    markerDescFR: "Description test",
    markerDescEN: "Test description",
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/39/25/9e/zlata-praha-in-the-evening.jpg",
  },
];

const Input = styled("input")({
  display: "none",
});
function Restaurants(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [restaurantInEdit, setRestaurantInEdit] = useState();
  function modifyRestaurant(id) {
    setRestaurantInEdit(restaurantsData[id - 1]);
    setIsEditOpen(true);
  }
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h3>Liste des restaurants</h3>
      <CreateRestaurantDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <BasicTable modifyCallBack={modifyRestaurant} />
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => setIsOpen(true)}
      >
        Ajouter un restaurant
      </Button>
      <EditRestaurantDialog
        isOpen={isEditOpen}
        restaurant={restaurantInEdit}
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
            <TableCell>Restaurants</TableCell>
            <TableCell align="right">Adresse</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
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
            <TableCell align="center">
              Marker desc{" "}
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
          {restaurantsData.map((restaurant) => (
            <TableRow
              key={restaurant.id}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Avatar alt="Image" src={restaurant.imageUri} />
              </TableCell>

              <TableCell component="th" scope="row">
                {restaurant.name}
              </TableCell>
              <TableCell align="right">{restaurant.adresse}</TableCell>
              <TableCell align="right">{restaurant.lat}</TableCell>
              <TableCell align="right">{restaurant.long}</TableCell>
              <TableCell align="center">
                <div style={{ maxWidth: 300, textAlign: "center" }}>
                  {activeLang === "fr"
                    ? restaurant.descriptionFR
                    : restaurant.descriptionEN}
                </div>
              </TableCell>
              <TableCell align="center">
                <div style={{ maxWidth: 300, textAlign: "center" }}>
                  {activeLang === "fr"
                    ? restaurant.markerDescFR
                    : restaurant.markerDescEN}
                </div>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    modifyCallBack(restaurant.id);
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

function CreateRestaurantDialog({ isOpen, setIsOpen }) {
  const [image, setImage] = useState();

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Ajout d'un restaurant</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Merci de remplir tout les champs suivant, un champ non/mal remplis
          peut causer un bug de l'application mobile.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom du restaurant"
          fullWidth
          variant="filled"
        />
        <TextField
          margin="dense"
          id="description"
          label="Description du restaurant"
          multiline
          fullWidth
          variant="filled"
        />
        <TextField
          margin="dense"
          id="description"
          label="Description du restaurant en anglais"
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
          Vous pouvez utilisez{" "}
          <a href="https://www.coordonnees-gps.fr" target="_blank">
            ce site
          </a>{" "}
          pour trouver la latitude et la longitude. <br />
          Ne pas hésiter à replacer manuellement le pointeur sur le restaurant
          avant de prendre les données !
        </DialogContentText>
        <TextField
          margin="dense"
          id="lat"
          label="Latitude (NE PAS ARRONDIR)"
          fullWidth
          variant="filled"
        />
        <TextField
          margin="dense"
          id="long"
          label="Longitude (NE PAS ARRONDIR)"
          fullWidth
          variant="filled"
        />
        <TextField
          margin="dense"
          id="long"
          label="Description marker sur la map"
          fullWidth
          variant="filled"
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
          {/* <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) => console.log(e.target.files)}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label> */}
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

function EditRestaurantDialog({ isOpen, setIsOpen, restaurant }) {
  const [image, setImage] = useState(restaurant?.imageUri);
  useEffect(() => {
    setImage(restaurant?.imageUri);
  }, [restaurant]);

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Modification du restaurant id {restaurant?.id}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Merci de remplir tout les champs suivant, un champ non/mal remplis
          peut causer un bug de l'application mobile.
        </DialogContentText>
        <TextField
          defaultValue={restaurant?.name}
          margin="dense"
          id="name"
          label="Nom du restaurant"
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={restaurant?.descriptionFR}
          margin="dense"
          id="description"
          label="Description du restaurant"
          multiline
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={restaurant?.descriptionEN}
          margin="dense"
          id="description"
          label="Description du restaurant en anglais"
          multiline
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={restaurant?.adresse}
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
        <TextField
          defaultValue={restaurant?.lat}
          margin="dense"
          id="lat"
          label="Latitude (NE PAS ARRONDIR)"
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={restaurant?.long}
          margin="dense"
          id="long"
          label="Longitude (NE PAS ARRONDIR)"
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={restaurant?.markerDescFR}
          margin="dense"
          id="long"
          label="Description marker sur la map"
          fullWidth
          variant="filled"
        />
        <TextField
          defaultValue={restaurant?.markerDescEN}
          margin="dense"
          id="long"
          label="Description marker sur la map en anglais"
          fullWidth
          variant="filled"
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

export default Restaurants;
