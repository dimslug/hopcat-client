import React, { useState, useEffect } from "react";

const PromotionalEventsCalendar = () => {
  const [promotionalEvents, setPromotionalEvents] = useState([]);

  useEffect(() => {
    const fetchPromotionalEvents = async () => {
      const serverApiUrl =
        "https://api.github.com/repos/dimslug/hopcat-server/contents/promos.json";

      try {
        const response = await fetch(serverApiUrl);
        if (response.ok) {
          const data = await response.json();
          setPromotionalEvents(data);
        } else {
          throw new Error(
            `Error fetching promotional events: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching promotional events:", error);
      }
    };

    fetchPromotionalEvents();
  }, []);

  return (
    <div>
      <h1>Promotional Events</h1>
      <ul>
        {promotionalEvents.map((promotionalEvent) => (
          <li key={promotionalEvent.id}>{promotionalEvent.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionalEventsCalendar;
