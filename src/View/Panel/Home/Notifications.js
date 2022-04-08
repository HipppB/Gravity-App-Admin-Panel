import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Icon, SvgIcon, IconButton, Avatar, Paper, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthentification } from "../../../Context/AuthContext";
import getImagePath from "../../../data/getImagePath";
import getImageBlobUrl from "../../../data/getImageBlobUrl";
import useFetch from "../../../hooks/useFetch";
function Notifications(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id notification</TableCell>
              <TableCell align="center">Titre</TableCell>
              <TableCell align="center">Contenu</TableCell>
              <TableCell align="center">Action (et url si Url </TableCell>

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{ alignSelf: "center", marginTop: 50 }}
      >
        Créer une notification
      </Button>
      <CreateNotificationModal />
    </div>
  );
}

function NotificationItem() {
  return (
    <TableRow

    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">1</TableCell>
      <TableCell align="center">Super Titre</TableCell>
      <TableCell align="center">Hey</TableCell>

      <TableCell align="center">Hey</TableCell>

      <TableCell align="center">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button color="error">Supprimer</Button>
          <Button>Modifier</Button>
          <Button color="success">Envoyer</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}

function CreateNotificationModal() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={false} onClose={() => setIsOpen(false)}>
      <DialogTitle>Création d'une notification</DialogTitle>
    </Dialog>
  );
}
export default Notifications;
