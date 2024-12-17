import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import Contact from "./Contact"; // example component for the contact page
import AddVehicule from "./AddTabs/AddVehicule";

import AddClient from "./AddTabs/AddClient";
import AddPlanification from "./AddTabs/AddPlanification";
import AddNotification from "./AddTabs/AddNotification";
import AddFacture from "./AddTabs/AddFacture";
import EditClient from "./EditTabs/EditClient";
import EditVehicle from "./EditTabs/EditVehicle";
import EditPlanification from "./EditTabs/EditPlanification";
export default () => (
  <>
    <Router>
      <div className="container">
        <div className="content">
          <PageContainer>
            <Routes>
              <Route path="/" element={<Contact />} />
              <Route path="/addClient" element={<AddClient />} />
              <Route path="/addVehicule" element={<AddVehicule />} />
              <Route path="/addPlanification" element={<AddPlanification />} />
              <Route path="/addNotification" element={<AddNotification />} />
              <Route path="/addFacture" element={<AddFacture />} />
              <Route path="/editClient/:cin" element={<EditClient />} />
              <Route path="/editVehicle/:vin" element={<EditVehicle />} />
              <Route path="/editPlanification/:id" element={<EditPlanification />} />

            </Routes>
          </PageContainer>
        </div>
      </div>
    </Router>
  </>
);
