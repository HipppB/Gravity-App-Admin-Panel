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
import { useAuthentification } from "../../Context/AuthContext";
import getImagePath from "../../data/getImagePath";
import getImageBlobUrl from "../../data/getImageBlobUrl";
import useFetch from "../../hooks/useFetch";

const Input = styled("input")({
  display: "none",
});
function Restaurants(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [restaurantInEdit, setRestaurantInEdit] = useState();
  const { apiToken } = useAuthentification();
  const {
    data: allRestaurants,
    loading: loadingRestaurants,
    error: errorRestaurantss,
    newRequest: fetchAllRestaurants,
  } = useFetch();
  const [restaurantsData, setRestaurantsData] = useState([]);
  useEffect(() => {
    if (!isOpen && !isEditOpen) {
      fetchAllRestaurants("sponsor/food/all", "GET", {}, apiToken);
    }
  }, [isEditOpen, isOpen]);
  useEffect(() => {
    if (allRestaurants && !loadingRestaurants) {
      setRestaurantsData(allRestaurants);
    }
  }, [loadingRestaurants, allRestaurants]);

  function modifyRestaurant(restaurant) {
    setRestaurantInEdit(restaurant);
    setIsEditOpen(true);
  }
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h3>Liste des restaurants</h3>
      <CreateRestaurantDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <BasicTable
        modifyCallBack={modifyRestaurant}
        restaurantsData={restaurantsData}
      />
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

function BasicTable({ modifyCallBack, restaurantsData }) {
  const [activeLang, setActiveLang] = useState("fr");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Restaurants</TableCell>
            <TableCell>Url Bouton</TableCell>
            <TableCell>
              Localisation
              <IconButton
                size={"small"}
                onClick={() => {
                  setActiveLang(activeLang === "fr" ? "en" : "fr");
                }}
              >
                <SvgIcon component={LanguageIcon} />
              </IconButton>
            </TableCell>
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
            <TableRow key={restaurant.id}>
              <TableCell>
                <ImageIcon imgUri={restaurant.picture} />
              </TableCell>

              <TableCell component="th" scope="row">
                {restaurant.name}
              </TableCell>
              <TableCell>{restaurant.link}</TableCell>

              <TableCell style={{ maxWidth: 150 }}>
                {restaurant.translation[0].context_text}
              </TableCell>
              <TableCell align="right">
                {restaurant.location.coordinates[1]}
              </TableCell>
              <TableCell align="right">
                {restaurant.location.coordinates[0]}
              </TableCell>
              <TableCell align="center">
                <div style={{ maxWidth: 300, textAlign: "center" }}>
                  {restaurant.translation[0].description}
                </div>
              </TableCell>
              <TableCell align="center">
                <div style={{ maxWidth: 300, textAlign: "center" }}>
                  {restaurant.translation[0].subtitle}
                </div>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    modifyCallBack(restaurant);
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
function ImageIcon({ imgUri }) {
  const [img, setimg] = useState();
  const { apiToken } = useAuthentification();
  useEffect(() => getImageBlobUrl(imgUri, apiToken, setimg), []);
  return <Avatar alt="Image" src={img} />;
}

function CreateRestaurantDialog({ isOpen, setIsOpen }) {
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const { apiToken } = useAuthentification();
  const { newRequest } = useFetch();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [subFr, setSubFr] = useState("");
  const [subEn, setSubEn] = useState("");
  const [locaFr, setLocaFr] = useState("");
  const [locaEn, setLocaEn] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  async function createSponsor() {
    if (imageFile) {
      getImagePath(imageFile, apiToken).then((imageUri) =>
        requestCreation(imageUri.filename)
      );
    } else {
      requestCreation("");
    }
  }
  function requestCreation(filename) {
    newRequest(
      "sponsor/create",
      "POST",
      {
        type: "food",
        name: name,
        link: link,
        picture: filename,
        longitude: long,
        latitude: lat,
        translation: [
          {
            language: "fr",
            isDefault: true,
            description: descFr,
            context_text: locaFr,
            subtitle: subFr,
          },
          {
            language: "en",
            isDefault: true,
            description: descEn,
            context_text: locaEn,
            subtitle: subEn,
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
      <DialogTitle>Ajout d'un restaurant</DialogTitle>
      <DialogContent>
        <DialogContentText>
          N'oubliez pas de tester sur l'application avec validation, les
          changement sont immédiats !
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom du restaurant"
          fullWidth
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            margin="dense"
            id="subFr"
            label="Sous titre (court)"
            variant="filled"
            style={{ width: "45%" }}
            value={subFr}
            onChange={(e) => setSubFr(e.target.value)}
          />
          <TextField
            margin="dense"
            id="subEn"
            label="Sous titre Anglais (court)"
            variant="filled"
            value={subEn}
            style={{ width: "45%" }}
            onChange={(e) => setSubEn(e.target.value)}
          />
        </div>
        <TextField
          margin="dense"
          id="description"
          label="Description du restaurant"
          multiline
          fullWidth
          variant="filled"
          value={descFr}
          onChange={(e) => setDescFr(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description du restaurant en anglais"
          multiline
          fullWidth
          variant="filled"
          value={descEn}
          onChange={(e) => setDescEn(e.target.value)}
        />
        <TextField
          margin="dense"
          id="adress"
          label="Accès au restaurant"
          fullWidth
          variant="filled"
          value={locaFr}
          onChange={(e) => setLocaFr(e.target.value)}
        />
        <TextField
          margin="dense"
          id="adress"
          label="Accès au restaurant Anglais"
          fullWidth
          variant="filled"
          value={locaEn}
          onChange={(e) => setLocaEn(e.target.value)}
        />
        <TextField
          margin="dense"
          id="adress"
          label='Lien bouton "Y aller" (Ne pas oublier le https:// devant !'
          fullWidth
          variant="filled"
          value={link}
          onChange={(e) => setLink(e.target.value)}
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            margin="dense"
            id="lat"
            label="Latitude (NE PAS ARRONDIR)"
            variant="filled"
            style={{ width: "45%" }}
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <TextField
            margin="dense"
            id="long"
            label="Longitude (NE PAS ARRONDIR)"
            variant="filled"
            value={long}
            style={{ width: "45%" }}
            onChange={(e) => setLong(e.target.value)}
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
        <Button variant="contained" onClick={() => createSponsor()}>
          Ajouter le restaurant
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditRestaurantDialog({ isOpen, setIsOpen, restaurant }) {
  const [image, setImage] = useState();
  const { apiToken } = useAuthentification();
  const { newRequest } = useFetch();
  useEffect(() => {
    getImageBlobUrl(restaurant?.picture, apiToken, setImage);
  }, [restaurant]);

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  function deleteRestaurant() {
    newRequest("sponsor/" + restaurant.id, "DELETE", {}, apiToken);
    setIsOpen(false);
  }
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
          onClick={() => deleteRestaurant()}
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
