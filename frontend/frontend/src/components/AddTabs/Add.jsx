import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Card, 
  Dropdown 
} from 'react-bootstrap';
import { 
  User, 
  Car, 
  Wrench, 
  Bell, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Fuel, 
  Tag, 
  Hash, 
  PenTool, 
  BarChart2 
} from 'lucide-react';

const GarageManagementForm = () => {
  // State management (similar to previous implementation)
  const [clientData, setClientData] = useState({
    CIN: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: ''
  });

  const [vehicleData, setVehicleData] = useState({
    vin: '',
    registrationNumber: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    mileage: '',
    fuelType: '',
    purchaseDate: null,
    existenceType: '',
    vehicleStatus: ''
  });

  const [maintenanceData, setMaintenanceData] = useState({
    startTime: null,
    endTime: null,
    description: '',
    status: ''
  });

  const [notificationData, setNotificationData] = useState({
    typeNotification: '',
    statusNotif: ''
  });

  // Enum-like lists
  const fuelTypes = ['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID'];
  const vehicleStatusTypes = ['IN_GARAGE', 'OUT_OF_GARAGE', 'UNDER_MAINTENANCE'];
  const maintenanceStatusTypes = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED'];
  const notificationTypes = ['EMAIL', 'SMS', 'PUSH_NOTIFICATION'];
  const notificationStatusTypes = ['SENT', 'PENDING', 'FAILED'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', { 
      client: clientData, 
      vehicle: vehicleData, 
      maintenance: maintenanceData,
      notification: notificationData 
    });
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <Wrench className="me-3" />
          <h2 className="mb-0">Garage Management Form</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Client Information Section */}
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
                        placeholder="Client ID Number"
                        value={clientData.CIN}
                        onChange={(e) => setClientData({...clientData, CIN: e.target.value})}
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
                        onChange={(e) => setClientData({...clientData, firstName: e.target.value})}
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
                        onChange={(e) => setClientData({...clientData, email: e.target.value})}
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
                        onChange={(e) => setClientData({...clientData, phoneNumber: e.target.value})}
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
                        onChange={(e) => setClientData({...clientData, address: e.target.value})}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

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
                        <Tag className="me-2" /> Vehicle VIN
                      </Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="Vehicle Identification Number"
                        value={vehicleData.vin}
                        onChange={(e) => setVehicleData({...vehicleData, vin: e.target.value})}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Fuel className="me-2" /> Fuel Type
                      </Form.Label>
                      <Form.Select
                        value={vehicleData.fuelType}
                        onChange={(e) => setVehicleData({...vehicleData, fuelType: e.target.value})}
                        required
                      >
                        <option value="">Select Fuel Type</option>
                        {fuelTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <BarChart2 className="me-2" /> Vehicle Status
                      </Form.Label>
                      <Form.Select
                        value={vehicleData.vehicleStatus}
                        onChange={(e) => setVehicleData({...vehicleData, vehicleStatus: e.target.value})}
                        required
                      >
                        <option value="">Select Vehicle Status</option>
                        {vehicleStatusTypes.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Maintenance Planification Section */}
            <Card className="mb-4">
              <Card.Header className="bg-warning text-white d-flex align-items-center">
                <Wrench className="me-2" />
                Maintenance Planification
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Calendar className="me-2" /> Start Time
                      </Form.Label>
                      <Form.Control 
                        type="datetime-local"
                        value={maintenanceData.startTime || ''}
                        onChange={(e) => setMaintenanceData({...maintenanceData, startTime: e.target.value})}
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
                        onChange={(e) => setMaintenanceData({...maintenanceData, status: e.target.value})}
                        required
                      >
                        <option value="">Select Status</option>
                        {maintenanceStatusTypes.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Notification Section */}
            <Card className="mb-4">
              <Card.Header className="bg-danger text-white d-flex align-items-center">
                <Bell className="me-2" />
                Notification Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <Mail className="me-2" /> Notification Type
                      </Form.Label>
                      <Form.Select
                        value={notificationData.typeNotification}
                        onChange={(e) => setNotificationData({...notificationData, typeNotification: e.target.value})}
                        required
                      >
                        <option value="">Select Type</option>
                        {notificationTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <BarChart2 className="me-2" /> Notification Status
                      </Form.Label>
                      <Form.Select
                        value={notificationData.statusNotif}
                        onChange={(e) => setNotificationData({...notificationData, statusNotif: e.target.value})}
                        required
                      >
                        <option value="">Select Status</option>
                        {notificationStatusTypes.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button variant="primary" type="submit" className="px-5 py-2">
                Submit Garage Management Details
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      
    </Container>
  );
};

export default GarageManagementForm;