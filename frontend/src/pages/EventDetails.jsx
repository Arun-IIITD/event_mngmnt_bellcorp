import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // registration status message

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`/events/${id}`);
      setEvent(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load event");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await axios.post(
        `/register/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setStatus("Registered successfully!");
      setEvent({ ...event, seatsAvailable: event.seatsAvailable - 1 });
    } catch (err) {
      setStatus(err.response?.data?.message || "Registration failed");
    }
  };

  const handleCancel = async () => {
    try {
      await axios.delete(`/events/${id}/cancel`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStatus("Registration cancelled");
      setEvent({ ...event, seatsAvailable: event.seatsAvailable + 1 });
    } catch (err) {
      setStatus(err.response?.data?.message || "Cancellation failed");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p className="mb-1">
        <span className="font-semibold">Organizer:</span> {event.organizer}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Location:</span> {event.location}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Date & Time:</span>{" "}
        {new Date(event.dateTime).toLocaleString()}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Category:</span>{" "}
        {event.category.join(", ")}
      </p>
      <p className="mb-3">{event.description}</p>
      <p className="mb-3">
        <span className="font-semibold">Seats Available:</span>{" "}
        {event.seatsAvailable}
      </p>

      {user && (
        <div className="flex gap-2">
          <button
            onClick={handleRegister}
            disabled={event.seatsAvailable <= 0}
            className={`px-4 py-2 rounded text-white ${
              event.seatsAvailable > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Register
          </button>

          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Cancel
          </button>
        </div>
      )}

      {status && <p className="mt-3 text-blue-500">{status}</p>}
    </div>
  );
};

export default EventDetails;
