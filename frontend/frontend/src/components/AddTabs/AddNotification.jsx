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

function AddNotification() {
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
    <div>
            <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex align-items-center">
          <Wrench className="me-3" />
          <h2 className="mb-0">Add Notification Form</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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
                Add Notification
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
  )
}

export default AddNotification