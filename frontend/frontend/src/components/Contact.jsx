import React, { useState } from 'react';
import { Plus, Search, Edit, Trash, Mail, Car, Calendar, FileText, Download } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientsTab from './Tabs/ClientsTab';
import VehiclesTab from './Tabs/VehiclesTab';
import PlanningTab from './Tabs/PlanningTab';
import NotificationsTab from './Tabs/NotificationsTab';
import InvoicesTab from './Tabs/InvoicesTab';
import GarageManagementForm from './AddTabs/Add';
import AddFacture from './AddTabs/AddFacture';
import AddClient from './AddTabs/AddClient';
import AddPlanification from './AddTabs/AddPlanification';
import AddVehicule from './AddTabs/AddVehicule';
import AddNotification from './AddTabs/AddNotification';

// TabButton Component
const TabButton = ({ id, label, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`btn ${active ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
  >
    {label}
  </button>
);



// Main Component
const GarageManagementUI = () => {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div>
      <div className="d-flex mb-3">
        <TabButton id="clients" label="Clients" active={activeTab === 'clients'} onClick={setActiveTab} />
        <TabButton id="vehicles" label="Véhicules" active={activeTab === 'vehicles'} onClick={setActiveTab} />
        <TabButton id="planning" label="Planification" active={activeTab === 'planning'} onClick={setActiveTab} />
        <TabButton id="notifications" label="Notifications" active={activeTab === 'notifications'} onClick={setActiveTab} />
        <TabButton id="invoices" label="Factures" active={activeTab === 'invoices'} onClick={setActiveTab} />
      </div>

      {activeTab === 'clients' && <ClientsTab />}
      {activeTab === 'vehicles' && <VehiclesTab />}
      {activeTab === 'planning' && <PlanningTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'invoices' && <InvoicesTab />}

    </div>
    
  );
};

export default GarageManagementUI;
