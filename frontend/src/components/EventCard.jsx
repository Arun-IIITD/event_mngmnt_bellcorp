import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition">
      <h2 className="font-bold text-xl">{event.name}</h2>
      <p>{event.organizer}</p>
      <p>{new Date(event.dateTime).toLocaleString()}</p>
      <p>{event.location}</p>
      <p>Seats Available: {event.seatsAvailable}</p>
      <Link
        to={`/events/${event._id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-2 py-1 rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
