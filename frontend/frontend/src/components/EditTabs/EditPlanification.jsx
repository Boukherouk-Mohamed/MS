import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Calendar, PenTool, BarChart2, Hash } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPlanification() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [planificationData, setPlanificationData] = useState({
    startTime: null,
    endTime: null,
    description: "",
    status: "",
    VehiculeVIN: "",
  });

  const maintenanceStatusTypes = ["Scheduled", "IN_PROGRESS", "DONE"];

  // Fetch the existing planification details
  useEffect(() => {
    axios
      .get(`http://localhost:8084/planifications/${id}`)
      .then((response) => {
        const data = response.data;
        setPlanificationData({
          startTime: data.tempsDebut,
          endTime: data.tempsFin,
          description: data.description,
          status: data.status,
          VehiculeVIN: data.vehiculeVIN,
          vehicule: data.vehicule,
          client: data.client,
        });
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching planification:", error);
        setError("Failed to fetch the planification details.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const payload = {
    tempsDebut: planificationData.startTime,
    tempsFin: planificationData.endTime,
    status: planificationData.status,
    description: planificationData.description,
    VehiculeVIN: planificationData.VehiculeVIN,
    };

    try {
      const response = await axios.put(
        `http://localhost:8084/planifications/${id}`,
        payload
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 1000); // Redirect to the list view after success
      } else {
        throw new Error(`Failed to update planification with status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to update planification:", error);
      setError("Failed to update the planification. Please try again.");
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <PenTool className="me-3" />
          <h2 className="mb-0">Update Planification Form</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Maintenance Planification Section */}
            <Card className="mb-4">
              <Card.Header className="bg-warning text-white d-flex align-items-center">
                <PenTool className="me-2" />
                Maintenance Planification
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Hash className="me-2" /> Vehicle VIN
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={planificationData.VehiculeVIN}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Calendar className="me-2" /> Vehicle Information
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          planificationData.vehicule
                            ? `${planificationData.vehicule.brand} - ${planificationData.vehicule.model}`
                            : "N/A"
                        }
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <PenTool className="me-2" /> Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={planificationData.description}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Calendar className="me-2" /> Start Time
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={planificationData.startTime || ""}
                        onChange={(e) =>
                          setPlanificationData({
                            ...planificationData,
                            startTime: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Calendar className="me-2" /> End Time
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={planificationData.endTime || ""}
                        onChange={(e) =>
                          setPlanificationData({
                            ...planificationData,
                            endTime: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <BarChart2 className="me-2" /> Maintenance Status
                      </Form.Label>
                      <Form.Select
                        value={planificationData.status}
                        onChange={(e) =>
                          setPlanificationData({
                            ...planificationData,
                            status: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select Status</option>
                        {maintenanceStatusTypes.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        Client Information
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          planificationData.client
                            ? `${planificationData.client.lastName} ${planificationData.client.firstName}`
                            : "N/A"
                        }
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Display success or error messages */}
                {success && <Alert variant="success">Planification updated successfully.</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
              </Card.Body>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button variant="primary" type="submit" className="px-5 py-2">
                Update Planification
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditPlanification;
