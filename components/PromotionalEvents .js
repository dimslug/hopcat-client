import React, { useState, useEffect } from "react";

const PromotionalEvents = () => {
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

  return (
    <ul>
      {promotionalEvents.map((promotionalEvent) => (
        <li key={promotionalEvent.id}>{promotionalEvent.name}</li>
      ))}
    </ul>
  );
};

export default PromotionalEvents;
