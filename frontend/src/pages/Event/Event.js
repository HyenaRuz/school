import React, { useEffect, useState } from "react";
import MyCalendar from "../../components/Calendar/MyCalendar";
// import Loader from "../../components/Loader/Loader.js";
import { getAllEvents } from "../../api/services/events.service.js";
import { allConnections } from "../../api/services/user.service.js";
import { useSelector } from "react-redux";

function Event() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(null);
  const [students, setStudents] = useState(null);

  const userRole = useSelector((state) => state.user.role);

  const fetcEvents = async () => {
    setLoading(true);
    try {
      const [{ data: events }, { data: connections }] = await Promise.all([
        getAllEvents(),
        allConnections(),
      ]);

      setEvents(events);
      setStudents(connections);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message:", err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcEvents();
  }, []);

  return (
    <main>
      <MyCalendar
        events={events}
        students={students}
        refetch={fetcEvents}
        role={userRole}
      />
      {/* {loading ? (
        <Loader />
      ) : (
      )} */}
    </main>
  );
}
export default Event;
