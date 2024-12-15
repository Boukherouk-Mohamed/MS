import React, { useState, useEffect } from "react";
import { Edit, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// PlanningTab Component
const PlanningTab = () => {
  const [planifications, setPlanifications] = useState([]);
  const [selectedPlanification, setSelectedPlanification] = useState(null);

  const handleEdit = (planification) => {
    setSelectedPlanification(planification);
    // Redirect to the update form or open a modal
    // For example:
    window.location.href = `/editPlanification/${planification.id}`;
  };


  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost:8888/PLANIFICATION-SERVICE/planifications/planifications")
      .then((response) => {
        setPlanifications(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching planifications:", error);
      });
  }, []);

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Planification de l'Atelier</h2>
        <Link to={"/addPlanification"}>
          <button className="btn btn-primary d-flex align-items-center">
            <Calendar className="me-2" /> Nouvelle Intervention
          </button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover w-100">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Véhicule</th>
              <th>Client</th>
              <th>Description</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {planifications.length > 0 ? (
              planifications.map((planification) => (
                <tr key={planification.id}>
                  <td>
                    {new Date(planification.tempsDebut).toLocaleString()} {" -> "}
                    {new Date(planification.tempsFin).toLocaleString()}
                  </td>
                  <td>
                    {planification.vehicule?.brand} - {planification.vehicule?.model} 
                   
                  </td>
                  <td>
                    {planification.client?.lastName} {planification.client?.firstName}
                  </td>
                  <td>{planification.description}</td>
                  <td>
                    <span className={`badge bg-${planification.status === "IN_PROGRESS" ? "warning" : "success"}`}>
                      {planification.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                    <button 
                        className="btn btn-sm btn-light"
                        onClick={() => handleEdit(planification)}>
                        <Edit className="text-muted" />
                      </button>
                      <button className="btn btn-sm btn-light">
                        <FileText className="text-muted" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanningTab;
