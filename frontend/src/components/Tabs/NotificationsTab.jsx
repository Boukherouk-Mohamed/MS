import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planifications, setPlanifications] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8084/planifications/planifications")
      .then((response) => {
        setPlanifications(response.data);
        console.log("this is main :",response.data)
      })
      .catch((error) => {
        console.error("Error fetching planifications:", error);
      });
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:8888/NOTIFICATION-SERVICE/notification-service/notifications");
        setNotifications(response.data);
        console.log("Notifications : ",response.data)
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleSendEmail = async (notification) => {
    try {
      const payload = {
        email: {
          to: notification.email,
          subject: "Notification Email",
          body: `Hello,\n\n${notification.description}`,
        },
        travailMaintenance: {
          id: notification.id,
        },
      };
  
      console.log("Payload:", payload);
  
      // Use POST request
      await axios.post("http://localhost:8888/NOTIFICATION-SERVICE/notification-service/send-email", payload, {
        headers: { "Content-Type": "application/json" },});
      alert("Email sent successfully!");
  
      // Optionally update the notification status in the UI
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id ? { ...n, notificationStatus: "Sent" } : n
        )
      );
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };
  

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-3">Notifications</h2>
        <Link to={"/addNotification"}>
          <button className="btn btn-primary d-flex align-items-center">
            <FileText className="me-2" /> Nouvelle Notification
          </button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover w-100">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Client Email</th>
              <th>Statut de planification</th>
              <th>Statut de Notification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">Loading...</td>
              </tr>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.date}</td>
                  <td>{notification.description}</td>
                  <td>{notification.email}</td>
                  <td>
                    <span className={`badge ${notification.planificationStatus === "COMPLETED" ? "bg-success" : "bg-warning"}`}>
                      {notification.planificationStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${notification.notificationStatus === "Sent" ? "bg-success" : "bg-warning"}`}>
                      {notification.notificationStatus}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-light"
                        onClick={() => handleSendEmail(notification)}
                      >
                        <Mail className="text-muted" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No notifications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsTab;
