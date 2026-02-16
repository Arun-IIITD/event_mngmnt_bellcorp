import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    organizer: "",
    location: "",
    dateTime: "",
    description: "",
    seatsAvailable: "",
    category: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/events", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate("/events"); // redirect to events list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Event Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required/>
        <input name="organizer" placeholder="Organizer" value={form.organizer} onChange={handleChange} className="border p-2 rounded" required/>
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2 rounded" required/>
        <input type="datetime-local" name="dateTime" value={form.dateTime} onChange={handleChange} className="border p-2 rounded" required/>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="seatsAvailable" placeholder="Seats Available" value={form.seatsAvailable} onChange={handleChange} className="border p-2 rounded" required/>
        <input name="category" placeholder="Category (comma separated)" value={form.category} onChange={handleChange} className="border p-2 rounded" />

        <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
