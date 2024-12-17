import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Car, Wrench, Fuel, Tag, BarChart2 } from 'lucide-react';

function AddVehicule() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [vehicleData, setVehicleData] = useState({
    vin: '',
    registrationNumber: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    mileage: '',
    fuelType: '',
    purchaseDate: '',
    existenceType: '',
    vehicleStatus: '',
    ownerId: ''
  });

  // Enum options
  const fuelTypes = ['ESSENCE', 'DIESEL', 'ELECTRIC', 'HYBRID'];
  const vehicleStatusTypes = ['FONCTIONNELLE', 'EN_REPARATION', 'NON_FONCTIONNELE'];
  const existenceTypes = ['IN_GARAGE', 'OUT_GARAGE'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post('http://localhost:8082/vehicule-service/vehicules/add', vehicleData);
      setSuccess(true);
      console.log('Vehicle added:', response.data);
      // Clear form after submission
      setVehicleData({
        vin: '',
        registrationNumber: '',
        brand: '',
        model: '',
        year: '',
        color: '',
        mileage: '',
        fuelType: '',
        purchaseDate: '',
        existenceType: '',
        vehicleStatus: '',
        ownerId: ''
      });
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <Wrench className="me-3" />
          <h2 className="mb-0">Add Vehicle Form</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>

            {/* Vehicle Information Section */}
            <Card className="mb-4">
              <Card.Header className="bg-success text-white d-flex align-items-center">
                <Car className="me-2" />
                Vehicle Information
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Vehicle VIN
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Vehicle Identification Number"
                        value={vehicleData.vin}
                        onChange={(e) => setVehicleData({ ...vehicleData, vin: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Owner CIN
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Owner cin"
                        value={vehicleData.ownerId}
                        onChange={(e) => setVehicleData({ ...vehicleData, ownerId: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Registration number
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Vehicle Registration Number"
                        value={vehicleData.registrationNumber}
                        onChange={(e) => setVehicleData({ ...vehicleData, registrationNumber: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
     
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Brand
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Brand"
                        value={vehicleData.brand}
                        onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
     
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Model
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Model"
                        value={vehicleData.model}
                        onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
     
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Year
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Year"
                        value={vehicleData.year}
                        onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Color
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Color"
                        value={vehicleData.color}
                        onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Kilométrage
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="kilométrage"
                        value={vehicleData.mileage}
                        onChange={(e) => setVehicleData({ ...vehicleData, mileage: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Date d'achat (YYYY-MM-DD) 
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Date d'achat"
                        value={vehicleData.purchaseDate}
                        onChange={(e) => setVehicleData({ ...vehicleData, purchaseDate: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Fuel Type
                      </Form.Label>
                      <Form.Select
                        value={vehicleData.fuelType}
                        onChange={(e) => setVehicleData({ ...vehicleData, fuelType: e.target.value })}
                        required
                      >
                        <option value="">Select Fuel Type</option>
                        {fuelTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                         Vehicle Status
                      </Form.Label>
                      <Form.Select
                        value={vehicleData.vehicleStatus}
                        onChange={(e) => setVehicleData({ ...vehicleData, vehicleStatus: e.target.value })}
                        required
                      >
                        <option value="">Select Vehicle Status</option>
                        {vehicleStatusTypes.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        Existence Type
                      </Form.Label>
                      <Form.Select
                        value={vehicleData.existenceType}
                        onChange={(e) => setVehicleData({ ...vehicleData, existenceType: e.target.value })}
                        required
                      >
                        <option value="">Select Existence Type</option>
                        {existenceTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                   {/* Display success or error messages */}
                  {success && <p className="text-success"> <Alert severity="success">Vehicule is added successfully.</Alert>                </p>}
                  {error && <p className="text-danger">{error}</p>}
                </Row>
              </Card.Body>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button variant="primary" type="submit" className="px-5 py-2">
                Add Vehicle
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddVehicule;
