import { useState, useEffect } from "react";
import axios from "../api/axios";
import EventCard from "../components/EventCard";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [page, setPage] = useState(1);

  // Search filters
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [debouncedSearchName, setDebouncedSearchName] = useState(searchName);
  const [debouncedSearchCategory, setDebouncedSearchCategory] = useState(searchCategory);
  const [debouncedSearchDate, setDebouncedSearchDate] = useState(searchDate);

  const EVENTS_PER_PAGE = 3; // frontend pagination limit

  // Debounce all search inputs
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchName(searchName);
      setDebouncedSearchCategory(searchCategory);
      setDebouncedSearchDate(searchDate);
      setPage(1); // reset page on filter change
    }, 500);

    return () => clearTimeout(handler);
  }, [searchName, searchCategory, searchDate]);

  // Fetch all events once or filter by general backend search (optional)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/events"); // get all events
        setAllEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  // Filter events on frontend by name, category, and date
const filteredEvents = allEvents.filter((event) => {
  const name = event.name || ""; // fallback to empty string
  const category = typeof event.location === "string" ? event.location : ""; // ensure string
  const date = event.date || "";

  const matchesName = name.toLowerCase().includes(debouncedSearchName.toLowerCase());
  const matchesCategory = category.toLowerCase().includes(debouncedSearchCategory.toLowerCase());
  const matchesDate = debouncedSearchDate ? date === debouncedSearchDate : true; // exact match

  return matchesName && matchesCategory && matchesDate;
});


  // Pagination
  const startIndex = (page - 1) * EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  const maxPage = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  return (
    <div className="p-4 space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 w-full"
        />
        
        <input
          type="text"
          placeholder="Search by location..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border p-2 w-full"
        />
 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="col-span-full text-center">No events found.</p>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-gray-300 px-2 py-1 rounded"
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {maxPage}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
          className="bg-gray-300 px-2 py-1 rounded"
          disabled={page === maxPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Events;
