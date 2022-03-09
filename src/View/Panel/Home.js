import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import DoneIcon from "@mui/icons-material/Done";
import "./styleHome.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Histoire" {...a11yProps(0)} />
          <Tab label="Son et Projet peda" {...a11yProps(1)} />
          <Tab label="Utilisateurs" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="HistoireContainer">
          <Box>
            <TextareaAutosize
              aria-label="history textarea"
              placeholder="Histoire de Liste Fr"
              style={{
                width: 500,
                maxWidth: "80%",
                height: 400,
                marginBottom: 30,
              }}
            />
            <Button
              variant="text"
              onClick={() => console.log("Save")}
              endIcon={DoneIcon}
            >
              Sauvegarder
            </Button>
          </Box>
          <TextareaAutosize
            aria-label="history textarea"
            placeholder="Histoire de Lise En"
            style={{
              width: 500,
              maxWidth: "80%",
              height: 400,
              marginBottom: 30,
            }}
          />
          <Button
            variant="text"
            onClick={() => console.log("Save")}
            endIcon={DoneIcon}
          >
            Sauvegarder
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
