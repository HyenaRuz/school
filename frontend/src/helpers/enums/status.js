import { useSelector } from "react-redux";

export function useLocalizedStatus() {
  const messages = useSelector((state) => state.locale.messages);

  return {
    cancelled: messages.Cancelled,
    planned: messages.Planned,
    conducted: messages.Conducted,
    rescheduled: messages.Rescheduled,
    missed: messages.Missed,
  };
}

export const Status = {
  Cancelled: "cancelled",
  Planned: "planned",
  Conducted: "conducted",
  Rescheduled: "rescheduled",
  Missed: "missed",
};
