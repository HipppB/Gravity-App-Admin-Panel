import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import DoneIcon from "@mui/icons-material/Done";
import Histoire from "./Home/Histoire";
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

function Home() {
  console.error("Hey");
  const [value, setValue] = useState(0);

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
          <Tab label="Son et Film" {...a11yProps(1)} />
          <Tab label="Projet Péda" {...a11yProps(2)} />
          <Tab label="Utilisateurs" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Histoire />
      </TabPanel>
      <TabPanel value={value} index={1}>
        En cours de création.
      </TabPanel>
      <TabPanel value={value} index={2}>
        En cours de création..
      </TabPanel>
      <TabPanel value={value} index={3}>
        En cours de création...
      </TabPanel>
    </Box>
  );
}

export default Home;
