import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  // Fetch user's registered events
  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("/users/me/events", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRegistrations(res.data);
      setLoading(false);
    } catch (err) {
      setStatus("Failed to fetch events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Auto-clear status messages
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleCancel = async (eventId) => {
    try {
      await axios.delete(`/events/${eventId}/cancel`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setStatus("Registration cancelled");
      // Remove cancelled event from state
      setRegistrations((prev) => prev.filter((r) => r.event?._id !== eventId));
    } catch (err) {
      setStatus(err.response?.data?.message || "Cancellation failed");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  const now = new Date();
  const upcoming = registrations.filter(
    (r) => r.event && new Date(r.event.dateTime) > now
  );
  const past = registrations.filter(
    (r) => r.event && new Date(r.event.dateTime) <= now
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Create Event Button */}
      <div className="flex justify-end mb-4">
        <Link
          to="/create-event"
          className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
        >
          + Create Event
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Hi {user.name}</h1>


      {status && <p className="text-blue-500 mb-4">{status}</p>}

      {/* Upcoming Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
        {upcoming.length === 0 && <p>No upcoming events.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcoming.map(
            (r) =>
              r.event && (
                <div
                  key={r.event._id}
                  className="border p-4 rounded shadow hover:shadow-lg"
                >
                  <h3 className="font-bold text-xl">{r.event.name}</h3>
                  <p>{new Date(r.event.dateTime).toLocaleString()}</p>
                  <p>{r.event.location}</p>
                  <div className="mt-2 flex gap-2">
                    <Link
                      to={`/events/${r.event._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleCancel(r.event._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Past Events</h2>
        {past.length === 0 && <p>No past events.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {past.map(
            (r) =>
              r.event && (
                <div
                  key={r.event._id}
                  className="border p-4 rounded shadow hover:shadow-lg"
                >
                  <h3 className="font-bold text-xl">{r.event.name}</h3>
                  <p>{new Date(r.event.dateTime).toLocaleString()}</p>
                  <p>{r.event.location}</p>
                  <Link
                    to={`/events/${r.event._id}`}
                    className="mt-2 inline-block px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Details
                  </Link>
                </div>
              )
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
