import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { User, Wrench, Hash, PenTool } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFacture() {
  const [factureData, setFactureData] = useState({
    client: "",
    receiver: "",
    numero: "",
    montant: "",
    statut: "En attente", // Default status
  });

  const [clients, setClients] = useState([]); // State to hold client data
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch clients from the API
  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8888/FACTURE-SERVICE/mail/clients");

      setClients(response.data); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to fetch clients. Please try again.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Monitor changes to `clients`
  useEffect(() => {
    console.log(" clients state: ", clients); // Logs the updated clients state
  }, [clients]);

  const sendEmail = async () => {
    try {
      console.log(factureData);
      await axios.post("http://localhost:8888/FACTURE-SERVICE/mail/send-facture", factureData);

      // Show success toast notification
      toast.success("Facture emailed successfully!");
      setFactureData({
        client: "",
        receiver: "",
        numero: "",
        montant: "",
        statut: "En attente",
      });
    } catch (err) {
      console.error("Error sending email:", err);
      toast.error("Failed to send facture email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      
      await sendEmail();
      setSuccess(true);
      // Clear the form after successful submission
      setFactureData({
        client: "",
        receiver: "",
        numero: "",
        montant: "",
        statut: "En attente",
      });
    } catch (err) {
      setError("An error occurred while adding the facture.");
      console.error("Error:", err);

      // Show error toast notification
      toast.error("Failed to save facture. Please try again.");
    }
  };

  return (
    <div>
      <Container className="my-5">
        <Card className="shadow-lg">
          <Card.Header className="bg-primary text-white d-flex align-items-center">
            <Wrench className="me-3" />
            <h2 className="mb-0">Add Facture Form</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Card className="mb-4">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <Hash className="me-2" /> Numéro
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Facture Number"
                          value={factureData.numero}
                          onChange={(e) =>
                            setFactureData({
                              ...factureData,
                              numero: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <User className="me-2" /> Client
                        </Form.Label>
                        <Form.Select
                          value={factureData.client}
                          onChange={(e) => {
                            const selectedClientId =e.target.value;
                            console.log(
                              "Selected Client ID:",
                              selectedClientId
                            ); // Debug: Log the selected client ID
                            const selectedClient = clients.find(
                              (client) => client.cin === selectedClientId
                            ); // Find the client object
                            console.log("Selected Client email :", selectedClient.email); // Debug: Log the selected client's data

                            if (selectedClient) {
                              setFactureData({
                                ...factureData,
                                client: selectedClientId, // Update client ID in state
                                receiver: selectedClient.email, // Update receiver email
                              });
                            } else {
                              console.error(
                                "Client not found for ID:",
                                selectedClientId
                              ); // Debugging edge case
                            }
                          }}
                          required
                        >
                          <option value="" disabled>
                            Select a Client
                          </option>
                          {clients.map((client) => (
                            <option key={client.cin} value={client.cin}>
                              {client.firstName} {client.lastName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <PenTool className="me-2" /> Montant (€)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Montant"
                          value={factureData.montant}
                          onChange={(e) =>
                            setFactureData({
                              ...factureData,
                              montant: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Display success or error messages */}
              {success && (
                <p className="text-success">
                  <Alert severity="success">
                    Facture added and emailed successfully.
                  </Alert>
                </p>
              )}
              {error && <p className="text-danger">{error}</p>}

              <div className="text-center">
                <Button variant="primary" type="submit" className="px-5 py-2">
                  Add Facture
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default AddFacture;
