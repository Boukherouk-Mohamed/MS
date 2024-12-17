import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import {
  User,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Hash,
  PenTool,
} from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import Header from "../Header";

function EditClient() {
  const { cin } = useParams(); // Get client CIN from route
  const [clientData, setClientData] = useState({
    cin: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch the client data when the component loads
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/CLIENT-SERVICE/client-service/clients/${cin}`);
        setClientData(response.data);
      } catch (err) {
        console.error("Error fetching client:", err);
        setError("Failed to load client data.");
      }
    };

    fetchClient();
  }, [cin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await axios.post(`http://localhost:8081/client-service/clients/update/${cin}`, clientData);
      setSuccess(true);
      toast.success("Client updated successfully!");
    } catch (err) {
      setError("An error occurred while updating the client.");
      toast.error("Failed to update client. Please try again.");
    }
  };

  return (
    <div>
      <Container className="my-5">
        <Card className="shadow-lg">
          <Card.Header className="bg-primary text-white d-flex align-items-center">
            <Wrench className="me-3" />
            <h2 className="mb-0">Edit Client Form</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Card className="mb-4">
                <Card.Header className="bg-info text-white d-flex align-items-center">
                  <User className="me-2" />
                  Client Information
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <Hash className="me-2" /> Client CIN
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={clientData.cin}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <PenTool className="me-2" /> First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          value={clientData.firstName}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <PenTool className="me-2" /> Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          value={clientData.lastName}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              lastName: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <Mail className="me-2" /> Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email Address"
                          value={clientData.email}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <Phone className="me-2" /> Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Phone Number"
                          value={clientData.phoneNumber}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              phoneNumber: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <MapPin className="me-2" /> Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Full Address"
                          value={clientData.address}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              address: e.target.value,
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
              {success && <p className="text-success"><Alert severity="success">Client updated successfully.</Alert></p>}
              {error && <p className="text-danger"><Alert severity="error">{error}</Alert></p>}

              <div className="text-center">
                <Button variant="primary" type="submit" className="px-5 py-2">
                  Update Client
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EditClient;
