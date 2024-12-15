import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Edit, Trash, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ClientsTab = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const handleEdit = (client) => {
    setSelectedClient(client);
    // Redirect to the update form or open a modal
    // For example:
    window.location.href = `/editClient/${client.cin}`;
  };

  // Fetch clients data from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8888/CLIENT-SERVICE/client-service/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    `${client.lastName} ${client.firstName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Gestion des Clients</h2>
        <Link to={"/addClient"}>
          <button className="btn btn-primary d-flex align-items-center">
            <Plus className="me-2" /> Nouveau Client
          </button>
        </Link>
      </div>

      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Rechercher un client..."
          className="form-control me-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary d-flex align-items-center">
          <Search className="me-2" /> Rechercher
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover w-100">
          <thead className="table-light">
            <tr>
              <th>CIN</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.cin}>
                  <td>{client.cin}</td>
                  <td>{client.lastName}</td>
                  <td>{client.firstName}</td>
                  <td>{client.phoneNumber}</td>
                  <td>{client.email}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-light"
                        onClick={() => handleEdit(client)}>
                        <Edit className="text-muted" />
                      </button>

                      <button className="btn btn-sm btn-light">
                        <Trash className="text-muted" />
                      </button>
                      <button className="btn btn-sm btn-light">
                        <Mail className="text-muted" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTab;
