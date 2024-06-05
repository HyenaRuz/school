import { useSelector } from "react-redux";

export function useLocalizedMonths() {
  const messages = useSelector((state) => state.locale.messages);

  return {
    January: messages?.January,
    February: messages?.February,
    March: messages?.March,
    April: messages?.April,
    May: messages?.May,
    June: messages?.June,
    July: messages?.July,
    August: messages?.August,
    September: messages?.September,
    October: messages?.October,
    November: messages?.November,
    December: messages?.December,
  };
}

export const MONTHS = {
  January: "January",
  February: "February",
  March: "March",
  April: "April",
  May: "May",
  June: "June",
  July: "July",
  August: "August",
  September: "September",
  October: "October",
  November: "November",
  December: "December",
};
