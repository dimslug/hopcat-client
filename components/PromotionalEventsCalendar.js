import React from "react";
import FullCalendar from "@fullcalendar/react";

const PromotionalEventsCalendar = () => {
  const [promotionalEvents, setPromotionalEvents] = useState([]);

  useEffect(() => {
    const fetchPromotionalEvents = async () => {
      const response = await fetch(
        "https://api.github.com/repos/dimslug/hopcat-server/contents/promos.json"
      );
      const data = await response.json();
      setPromotionalEvents(data);
    };

    fetchPromotionalEvents();
  }, []);

  return <FullCalendar events={promotionalEvents} />;
};

export default PromotionalEventsCalendar;
