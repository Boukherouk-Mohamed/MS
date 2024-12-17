import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Car, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const VehiclesTab = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    // Redirect to the update form or open a modal
    // For example:
    window.location.href = `/editVehicle/${vehicle.vin}`;
  };

  // Fetch vehicle data from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8888/GARAGE-SERVICE/vehicule-service/vehicules");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Gestion des Véhicules</h2>
        <Link to={"/addVehicule"}>
          <button className="btn btn-primary d-flex align-items-center">
            <Car className="me-2" /> Nouveau Véhicule
          </button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover w-100">
          <thead className="table-light">
            <tr>
              <th>N° VIN</th>
              <th>Immatriculation</th>
              <th>Marque/Modèle</th>
              <th>Propriétaire</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.vin}>
                  <td>{vehicle.vin}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{`${vehicle.brand} / ${vehicle.model}`}</td>
                  <td>{vehicle.client.firstName} {vehicle.client.lastName}</td> {/* Ensure this field exists in the API data */}
                  <td>
                    <span className={`badge ${vehicle.vehicleStatus === "FONCTIONNELLE" ? "bg-success" : "bg-warning"}`}>
                      {vehicle.vehicleStatus}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-light"
                        onClick={() => handleEdit(vehicle)}>
                        <Edit className="text-muted" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Aucun véhicule trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesTab;
