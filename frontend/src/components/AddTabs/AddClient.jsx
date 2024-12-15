import React, { useState } from "react";
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


function AddClient() {
  const [clientData, setClientData] = useState({
    cin: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios.post("http://localhost:8081/client-service/clients/add", clientData);
      setSuccess(true);
      console.log("Client added:", response.data);

      // Show success toast notification
      toast.success("Client saved successfully!");

      // Clear the form after successful submission
      setClientData({
        CIN: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNumber: ''
      });
    } catch (err) {
      setError("An error occurred while adding the client.");
      console.error("Error:", err);

      // Show error toast notification
      toast.error("Failed to save client. Please try again.");
    }
  };

  return (
    <div>
      <Container className="my-5">
        <Card className="shadow-lg">
          <Card.Header className="bg-primary text-white d-flex align-items-center">
            <Wrench className="me-3" />
            <h2 className="mb-0">Add Client Form</h2>
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
                          <Hash className="me-2" /> Client cin
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Client ID Number"
                          value={clientData.cin}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              cin: e.target.value,
                            })
                          }
                          required
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
              {success && <p className="text-success"> <Alert severity="success">Client is added successfully.</Alert>                </p>}
              {error && <p className="text-danger">{error}</p>}

              <div className="text-center">
                <Button variant="primary" type="submit" className="px-5 py-2">
                  Add Client
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddClient;
