import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import EventIcon from "@mui/icons-material/Event";
import PaidIcon from "@mui/icons-material/Paid";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate, Outlet } from "react-router-dom";

import "./style.css";
function Layout(props) {
  let navigate = useNavigate();

  return (
    <div className="container">
      <h1 style={{ marginBottom: 30 }}>Panel d'administration</h1>
      <div className="topBar">
        <Button
          variant="text"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="text"
          startIcon={<LocalDiningIcon />}
          onClick={() => navigate("/Restaurants")}
        >
          Restaurants
        </Button>
        <Button
          variant="text"
          startIcon={<EventIcon />}
          onClick={() => navigate("/Calendar")}
        >
          Calendrier
        </Button>
        <Button
          variant="text"
          startIcon={<PaidIcon />}
          onClick={() => navigate("/Sponsors")}
        >
          40k Ou rien
        </Button>
        <Button
          variant="text"
          startIcon={<EmojiEventsIcon />}
          onClick={() => navigate("/Challenges")}
        >
          Challenges
        </Button>
      </div>
      <Outlet />
      {/* <p style={{ position: "absolute", bottom: 0, color: "red" }}>
        N'oubliez pas de toujours tester sur l'app la bonne modification d'un
        changement (Les changements sont quasi instantanés)
      </p> */}
    </div>
  );
}

export default Layout;
