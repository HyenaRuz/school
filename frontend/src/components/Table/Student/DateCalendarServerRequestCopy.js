import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { isSameDay } from "date-fns";
import { Status } from "../../../helpers/enums/status";

function ServerDay(props) {
  const { events = [], day, outsideCurrentMonth, ...other } = props;

  const getStatusColor = (status) => {
    switch (status) {
      case Status.Cancelled:
        return "#FB7D5B"; // Красный цвет для отмененного события
      case Status.Planned:
        return "#4d44b5"; // Зеленый цвет для запланированного события
      case Status.Conducted:
        return "#4CBC9A"; // Синий цвет для проведенного события
      case Status.Rescheduled:
        return "#FCC43E"; // Желтый цвет для перенесенного события
      case Status.Missed:
        return "#FF4550"; // Серый цвет для пропущенного события
      default:
        return "#FFFF"; // По умолчанию серый цвет
    }
  };
  // const isSelected = useMemo(() => {
  //   return (
  //     !props.outsideCurrentMonth &&
  //     events.some((event) => isSameDay(event.date, new Date(day)))
  //   );
  // }, [events]);

  const event = events.find((event) => isSameDay(event.date, new Date(day)));
  const eventStatus = event ? event.status : null;
  const badgeColor = getStatusColor(eventStatus);

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      sx={{
        backgroundColor: badgeColor,
        backgroundSize: "90%",
        borderRadius: "50%",
        margin: "0",
        border: "solid 2px #ffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{ color: badgeColor === "#FFFF" ? "#303972" : "#ffff" }}
      />
    </Badge>
  );
}

const theme = createTheme({
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          width: "auto",
        },
      },
    },

    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          color: "#303972",
          margin: "0",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          color: "#303972",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "30px",
          height: "30px",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        label: {
          fontSize: "1.4rem",
          color: "#303972",
        },
      },
    },
  },
});

export default function DateCalendarServerRequestCopy({ user }) {
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState();

  useEffect(() => {
    setEvents(user?.events);
  }, [user]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DateCalendar
          value={selectedDate}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              events: events,
            },
          }}
          showDaysOutsideCurrentMonth
          onChange={(date) => {
            // eslint-disable-next-line no-unused-vars
            const { $d, $D } = date;
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
