import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const InvoicesTab = () => {
  const [factures, setFactures] = useState([]); // State to hold factures data
  const [error, setError] = useState(null); // State to hold any error messages

  // Fetch factures from the API
  const fetchFactures = async () => {
    try {
      const response = await axios.get("http://localhost:8888/FACTURE-SERVICE/mail/factures");
      setFactures(response.data); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching factures:", err);
      setError("Failed to fetch factures. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFactures();
  }, []);

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Gestion des Factures</h2>
        <Link to={"/addFacture"}>
          <button className="btn btn-primary d-flex align-items-center">
            <Plus className="me-2" /> Nouvelle Facture
          </button>
        </Link>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-hover w-100">
          <thead className="table-light">
            <tr>
              <th>Numéro</th>
              <th>Récepteur</th>
              <th>Montant (€)</th>
            </tr>
          </thead>
          <tbody>
            {factures.length > 0 ? (
              factures.map((facture) => (
                <tr key={facture.id}>
                  <td>{facture.numero}</td>
                  <td>{facture.receiver}</td>
                  <td>€{facture.montant.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No factures available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTab;
