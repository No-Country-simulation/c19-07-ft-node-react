import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Box } from "@mui/material";

export const TeacherCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);

  const events = [
    {
      start: dayjs("2024-12-18T12:00:00").toDate(),
      end: dayjs("2024-12-18T13:00:00").toDate(),
      title: "parents meeting",
    },
    {
      start: dayjs("2024-07-17T12:00:00").toDate(),
      end: dayjs("2024-07-19T13:00:00").toDate(),
      title: "hollydays",
    },
    {
      start: dayjs("2024-07-11T16:00:00").toDate(),
      end: dayjs("2024-07-11T16:30:00").toDate(),
      title: "day off",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto", 
        width: "100%",
        padding:"3vh",
        backgroundColor: "#F9F9F9",
        borderWidth: "3px",
        borderRadius:"10px",
        borderStyle: "solid",
        borderColor: "#f9bc60",
      }}
    >
      <Calendar
        style={{
          height: "95vh",
          width: "150vh",
        }}
        localizer={localizer}
        events={events}
        views={["month", "day"]}
        min={dayjs("2023-07-11T08:00:00").toDate()}
        max={dayjs("2023-07-11T16:00:00").toDate()}
      />
    </Box>
  );
};
