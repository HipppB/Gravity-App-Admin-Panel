import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../View/Login/Login";
import { useAuthentification } from "../Context/AuthContext";
import Layout from "../View/Panel/Layout";
import Home from "../View/Panel/Home";
import Restaurants from "../View/Panel/Restaurants";
import Calendar from "../View/Panel/Calendar";
import Sponsors from "../View/Panel/Sponsors";
import Events from "../View/Panel/Events";
function MainRouters(props) {
  const { isAuthentificated } = useAuthentification();
  return (
    <BrowserRouter>
      {!isAuthentificated ? (
        <Routes>
          <Route path="/*" element={<Login />} />

          {/* <Route index element={<Home />} />
           <Route path="teams" element={<Teams />}>
             <Route path=":teamId" element={<Team />} />
             <Route path="new" element={<NewTeamForm />} />
             <Route index element={<LeagueStandings />} />
           </Route>
         </Route> */}
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Restaurants" element={<Restaurants />} />
            <Route path="Events" element={<Events />} />
            <Route path="Calendar" element={<Calendar />} />
          </Route>

          {/* <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/Sponsors" element={<Sponsors />} />
            
          </Route>
          <Route path="/Restaurants" element={<Restaurants />} /> */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default MainRouters;
