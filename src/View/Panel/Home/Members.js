import React, { useState, useEffect } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useAuthentification } from "../../../Context/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon, SvgIcon, IconButton, Avatar, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { NearMeDisabled } from "@mui/icons-material";
import getImagePath from "../../../data/getImagePath";
import getImageBlobUrl from "../../../data/getImageBlobUrl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Input = styled("input")({
  display: "none",
});
function Members(props) {
  const [isCreateOpen, setCreateOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button variant="contained" onClick={() => setCreateOpen(true)}>
        Créer un membre
      </Button>
      <CreateMemberModal isOpen={isCreateOpen} setIsOpen={setCreateOpen} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id membre</TableCell>
              <TableCell align="center">Pole</TableCell>
              <TableCell align="center">Nom</TableCell>
              <TableCell align="center">Poste</TableCell>
              <TableCell align="center">Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function CreateMemberModal({ isOpen, setIsOpen }) {
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const { apiToken } = useAuthentification();
  const { newRequest } = useFetch();
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [pole, setPole] = useState("");
  const [post, setPost] = useState("");

  const onImageChange = (files) => {
    if (files && files[0]) {
      setImageFile(files[0]);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  async function createMember() {
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
      "member/create",
      "POST",
      {
        id: id || null,
        first_name: name,
        image: filename,
        role: post,
      },
      apiToken
    );
    setIsOpen(false);
    setImage();
    setImageFile();
  }
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Création d'un membre GRAVITY</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="Id"
          label="Id compte public"
          variant="filled"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Nom"
          variant="filled"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Poste"
          variant="filled"
          fullWidth
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pôle</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pole}
            label="pole"
            onChange={(e) => setPole(e.target.value)}
          >
            <MenuItem value={"bureau"}>Bureau</MenuItem>
            <MenuItem value={"com"}>Com</MenuItem>
            <MenuItem value={"crea"}>Créa</MenuItem>
            <MenuItem value={"ecolo"}>Ecolo</MenuItem>
            <MenuItem value={"deco"}>Deco</MenuItem>
            <MenuItem value={"event"}>Event</MenuItem>
            <MenuItem value={"food"}>Food</MenuItem>
            <MenuItem value={"tech"}>Tech</MenuItem>
          </Select>
        </FormControl>

        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          fullWidth
          style={{
            justifyContent: "center",

            marginBottom: 40,
          }}
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

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => createMember()}
        >
          Créer membre
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default Members;
