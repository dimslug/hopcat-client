import { useQuery } from "react-query";

const useCalendar = async () => {
  const { data, error } = useQuery("calendar", async () => {
    const calendarData = await axios.get("/api/calendar");
    return calendarData.data;
  });

  return { data, error };
};

export default useCalendar;
