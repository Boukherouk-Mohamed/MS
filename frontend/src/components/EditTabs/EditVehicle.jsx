import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Edit, Car, Hash, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditVehicle = () => {
  const { vin } = useParams(); // Fetch VIN from route parameters
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState({
    vin: "",
    registrationNumber: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    mileage: "",
    fuelType: "",
    purchaseDate: "",
    vehicleStatus: "",
    client: {}, // Owner information
  });

  const [error, setError] = useState(null);

  // Fetch vehicle data on component load
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/vehicule-service/vehicules/${vin}`
        );
        setVehicleData(response.data);
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        setError("Failed to load vehicle data.");
      }
    };

    fetchVehicle();
  }, [vin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(
        `http://localhost:8082/vehicule-service/vehicules/update/${vin}`,
        {
          registrationNumber: vehicleData.registrationNumber,
          brand: vehicleData.brand,
          model: vehicleData.model,
          year: vehicleData.year,
          ownerId: vehicleData.ownerId,
          color: vehicleData.color,
          mileage: vehicleData.mileage,
          fuelType: vehicleData.fuelType,
          purchaseDate: vehicleData.purchaseDate,
          vehicleStatus: vehicleData.vehicleStatus,
        }
      );

      toast.success("Vehicle updated successfully!");
      navigate("/"); // Redirect after update
    } catch (err) {
      setError("An error occurred while updating the vehicle.");
      toast.error("Failed to update vehicle. Please try again.");
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <Edit className="me-3" />
          <h2 className="mb-0">Edit Vehicle</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Card className="mb-4">
              <Card.Header className="bg-info text-white d-flex align-items-center">
                <Car className="me-2" />
                Vehicle Information
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Hash className="me-2" /> VIN
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={vehicleData.vin}
                        disabled // VIN cannot be edited
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <MapPin className="me-2" /> Owner
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={`${vehicleData.client.firstName || ""} ${
                          vehicleData.client.lastName || ""
                        }`}
                        disabled // Owner cannot be edited
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Registration Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={vehicleData.registrationNumber}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            registrationNumber: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        value={vehicleData.brand}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            brand: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        value={vehicleData.model}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            model: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        type="number"
                        value={vehicleData.year}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            year: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="text"
                        value={vehicleData.color}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            color: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mileage</Form.Label>
                      <Form.Control
                        type="number"
                        value={vehicleData.mileage}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            mileage: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fuel Type</Form.Label>
                      <Form.Control
                        type="text"
                        value={vehicleData.fuelType}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            fuelType: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Purchase Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={vehicleData.purchaseDate}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            purchaseDate: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={vehicleData.vehicleStatus}
                        onChange={(e) =>
                          setVehicleData({
                            ...vehicleData,
                            vehicleStatus: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="FONCTIONNELLE">FONCTIONNELLE</option>
                        <option value="EN_REPARATION">EN_REPARATION</option>
                        <option value="NON_FONCTIONNELE">NON_FONCTIONNELE</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Display error message if any */}
            {error && <p className="text-danger">{error}</p>}

            <div className="text-center">
              <Button variant="primary" type="submit" className="px-5 py-2">
                Update Vehicle
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditVehicle;
