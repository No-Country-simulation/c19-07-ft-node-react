import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Box } from "@mui/material";

export const TeacherCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);

  const events = [
    {
        start: dayjs('2024-12-18T12:00:00').toDate(),
        end:dayjs('2024-12-18T13:00:00').toDate(),
        title: "parents meeting"
    },
    {
        start: dayjs('2024-07-18T12:00:00').toDate(),
        end:dayjs('2024-07-18T13:00:00').toDate(),
        title: "parents meeting"
    },
  ]

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
        width: "100%",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        style={{
          backgroundColor: "#f9bc60",
          height: "95vh",
          width: "150vh",
        }}
      />
    </Box>
  );
};
