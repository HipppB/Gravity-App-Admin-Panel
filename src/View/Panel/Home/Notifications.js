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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useAuthentification } from "../../../Context/AuthContext";
import getImagePath from "../../../data/getImagePath";
import getImageBlobUrl from "../../../data/getImageBlobUrl";
import useFetch from "../../../hooks/useFetch";

import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Input = styled("input")({
  display: "none",
});
function Notifications(props) {
  const { apiToken } = useAuthentification();
  const [notifs, setNotifs] = useState([]);
  const {
    data: allNotif,
    loading: loadingNotif,
    error: arrorNotif,
    newRequest: fetchAllNotif,
  } = useFetch();
  useEffect(
    () => fetchAllNotif("notification/all/admin", "GET", {}, apiToken),
    []
  );
  useEffect(() => {
    console.log(allNotif);

    if (allNotif && !loadingNotif) {
      setNotifs(allNotif);
    }
  }, [loadingNotif, allNotif]);

  const [isCreateOpen, setCreateOpen] = useState(false);

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
          {notifs.map(
            (notif) =>
              notif?.content !== "Direction l'App Admin pour y répondre !" && (
                <NotificationItem key={notif.id} notif={notif} />
              )
          )}
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{ alignSelf: "center", marginTop: 50 }}
        onClick={() => setCreateOpen(true)}
      >
        Créer une notification
      </Button>
      <CreateNotificationModal
        isOpen={isCreateOpen}
        setIsOpen={setCreateOpen}
      />
    </div>
  );
}

function NotificationItem({ notif }) {
  const [isSendOpen, setSendOpen] = useState(false);

  return (
    <TableRow

    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">{notif.id}</TableCell>
      <TableCell align="center">{notif.title}</TableCell>
      <TableCell align="center">{notif.content}</TableCell>

      <TableCell align="center">
        {notif.action} <br /> {notif?.url}
      </TableCell>

      <TableCell align="center">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button color="success" onClick={() => setSendOpen(true)}>
            Envoyer
          </Button>
        </ButtonGroup>
      </TableCell>
      <SendNotificationModal
        isOpen={isSendOpen}
        setIsOpen={setSendOpen}
        notif={notif}
      />
    </TableRow>
  );
}

function CreateNotificationModal({ isOpen, setIsOpen }) {
  const { apiToken } = useAuthentification();
  const { newRequest } = useFetch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [action, setAction] = useState("");
  const [url, setUrl] = useState("");

  function requestCreation() {
    newRequest(
      "notification/create",
      "POST",
      {
        title: title,
        content: content,
        action: action,
        url: url,
      },

      apiToken
    );
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Création d'une notification</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Ttre"
          variant="filled"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Contenu"
          variant="filled"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={action}
            label="pole"
            onChange={(e) => setAction(e.target.value)}
          >
            <MenuItem value={""}>Aucune action</MenuItem>
            <MenuItem value={"URL"}>Redirection url</MenuItem>
            <MenuItem value={"Chat"}>Ecran Chat</MenuItem>
            <MenuItem value={"Calendar"}>Ecran Event</MenuItem>
            <MenuItem value={"Event"}>Ecran challenge</MenuItem>
            <MenuItem value={"Sponsor"}>Ecran Sponsor</MenuItem>
            <MenuItem value={"EditAccount"}>Ecran edition de compte</MenuItem>
            <MenuItem value={"sponsorRestaurant"}>Ecran sponsor Food</MenuItem>
            <MenuItem value={"PublicProfil"}>Ecran Profil Public</MenuItem>
          </Select>
        </FormControl>

        {action === "URL" && (
          <TextField
            margin="dense"
            id="url"
            label="Url à ouvrir"
            variant="filled"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => requestCreation()}
        >
          Créer la notification (ne l'envoie pas)
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function SendNotificationModal({ notif, isOpen, setIsOpen }) {
  const { apiToken } = useAuthentification();

  const groupList = [
    "i1",
    "i2",
    "i2 - prague",
    "i2 - pdg",
    "i2 - riga",
    "i2 - coree",
    "i2 - canada",
    "i2 - paris",
    "p1",
    "p2",
    "A1",
    "A2",
    "A3",
    "COM",
    "DEFAULT",
  ];
  const [i1, setI1] = useState(false);
  const [i2prague, seti2prague] = useState(false);
  const [i2pdg, seti2pdg] = useState(false);
  const [i2riga, seti2riga] = useState(false);
  const [i2coree, seti2coree] = useState(false);
  const [i2canada, seti2canada] = useState(false);
  const [i2paris, seti2paris] = useState(false);
  const [p1, setp1] = useState(false);
  const [p2, setp2] = useState(false);
  const [A1, setA1] = useState(false);
  const [A2, setA2] = useState(false);
  const [A3, setA3] = useState(false);
  const [DEFAULT, setDEFAULT] = useState(false);

  function requestCreation() {
    const API = "https://api.liste-gravity.fr/notification/send/group";

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + apiToken,
      },
    };
    let content = {
      notificationId: notif?.id?.toSring(),
      group: "DEFAULT",
    };
    if (i1) {
      content.group = "i1";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (p1) {
      content.group = "p1";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (p2) {
      content.group = "p2";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (A1) {
      content.group = "A1";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (A2) {
      content.group = "A2";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (A3) {
      content.group = "A3";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (i2paris) {
      content.group = "i2-paris";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (i2canada) {
      content.group = "i2-canada";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (i2coree) {
      content.group = "i2-coree";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (i2pdg) {
      content.group = "i2-pdg";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (i2prague) {
      content.group = "i2-prague";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }
    if (i2riga) {
      content.group = "i2-riga";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }

    if (DEFAULT) {
      content.group = "DEFAULT";
      options.body = JSON.stringify(content);
      fetch(API, options);
    }

    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Envoie de la notification {notif?.id}</DialogTitle>
      <DialogContent>
        <DialogContentText>{notif?.title}</DialogContentText>
        <DialogContentText>{notif?.content}</DialogContentText>
        <DialogContentText>
          {notif?.action} {notif?.url}
        </DialogContentText>

        <FormControlLabel
          checked={i1}
          onChange={() => setI1(!i1)}
          control={<Checkbox />}
          label={"i1"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={i2paris}
          onChange={() => seti2paris(!i2paris)}
          control={<Checkbox />}
          label={"i2paris"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={i2canada}
          onChange={() => seti2canada(!i2canada)}
          control={<Checkbox />}
          label={"i2canada"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={i2coree}
          onChange={() => seti2coree(!i2coree)}
          control={<Checkbox />}
          label={"i2coree"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={i2pdg}
          onChange={() => seti2pdg(!i2pdg)}
          control={<Checkbox />}
          label={"i2pdg"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={i2prague}
          onChange={() => seti2prague(!i2prague)}
          control={<Checkbox />}
          label={"i2prague"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={i2riga}
          onChange={() => seti2riga(!i2riga)}
          control={<Checkbox />}
          label={"i2riga"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={p1}
          onChange={() => setp1(!p1)}
          control={<Checkbox />}
          label={"p1"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={p2}
          onChange={() => setp2(!p2)}
          control={<Checkbox />}
          label={"p2"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={A1}
          onChange={() => setA1(!A1)}
          control={<Checkbox />}
          label={"A1"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={A2}
          onChange={() => setA2(!A2)}
          control={<Checkbox />}
          label={"A2"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={A3}
          onChange={() => setA3(!A3)}
          control={<Checkbox />}
          label={"A3"}
          labelPlacement="end"
        />
        <FormControlLabel
          checked={DEFAULT}
          onChange={() => setDEFAULT(!DEFAULT)}
          control={<Checkbox />}
          label={"DEFAULT"}
          labelPlacement="end"
        />
        <DialogContentText>
          Attention à ne pas selectionner default et d'autre groupe, default =
          tout le monde{" "}
        </DialogContentText>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => requestCreation()}
        >
          Envoyer la notification aux groupes selectionné
        </Button>
      </DialogContent>
    </Dialog>
  );
}
export default Notifications;
