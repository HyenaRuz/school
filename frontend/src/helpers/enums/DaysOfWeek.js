import { useSelector } from "react-redux";

export function useLocalizedDaysOfWeek() {
  const messages = useSelector((state) => state.locale.messages);

  return {
    Monday: messages?.Monday,
    Tuesday: messages?.Tuesday,
    Wednesday: messages?.Wednesday,
    Thursday: messages?.Thursday,
    Friday: messages?.Friday,
    Saturday: messages?.Saturday,
    Sunday: messages?.Sunday,
  };
}

export const DaysOfWeek = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};
