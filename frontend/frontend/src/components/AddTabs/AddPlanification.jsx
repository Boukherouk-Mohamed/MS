import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Calendar, PenTool, BarChart2, Hash } from "lucide-react";
import axios from "axios";

function AddPlanification() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [maintenanceData, setMaintenanceData] = useState({
    startTime: null,
    endTime: null,
    description: "",
    status: "",
    VehiculeVIN: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const maintenanceStatusTypes = ["SCHEDULED", "IN_PROGRESS", "COMPLETED"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const payload = {
      tempsDebut: maintenanceData.startTime,
      tempsFin: maintenanceData.endTime,
      description: maintenanceData.description,
      status: maintenanceData.status,
      vehiculeVIN: maintenanceData.VehiculeVIN,
    };

    console.log(payload)

    try {
      const response = await fetch(
        "http://localhost:8084/planifications/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setSuccess(true);
      console.log("Planification added successfully!");
    } catch (error) {
      console.error("Failed to add planification:", error);
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <PenTool className="me-3" />
          <h2 className="mb-0">Add Planification Form</h2>
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
                        placeholder="Enter Vehicle VIN"
                        value={maintenanceData.VehiculeVIN}
                        onChange={(e) =>
                          setMaintenanceData({
                            ...maintenanceData,
                            VehiculeVIN: e.target.value,
                          })
                        }
                        required
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
                        value={maintenanceData.startTime || ""}
                        onChange={(e) =>
                          setMaintenanceData({
                            ...maintenanceData,
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
                        value={maintenanceData.endTime || ""}
                        onChange={(e) =>
                          setMaintenanceData({
                            ...maintenanceData,
                            endTime: e.target.value,
                          })
                        }
                        required
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
                        placeholder="Enter maintenance description"
                        value={maintenanceData.description}
                        onChange={(e) =>
                          setMaintenanceData({
                            ...maintenanceData,
                            description: e.target.value,
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
                        value={maintenanceData.status}
                        onChange={(e) =>
                          setMaintenanceData({
                            ...maintenanceData,
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
                </Row>
                 {/* Display success or error messages */}
                 {success && <p className="text-success"> <Alert severity="success">The planification is added successfully.</Alert>                </p>}
                  {error && <p className="text-danger">{error}</p>}
              </Card.Body>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button variant="primary" type="submit" className="px-5 py-2">
                Add Planification
              </Button>
            </div>

            {/* Submission Status */}
            {submissionStatus && (
              <div className="text-center mt-3">
                <p>{submissionStatus}</p>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddPlanification;
