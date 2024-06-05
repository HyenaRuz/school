import { instance } from "../axios.api";

export const getAllEvents = async () => {
  return await instance.get("events/all-events");
};

export const createSingleEvent = async (data) => {
  return await instance.post("events/create-single-event", data);
};

export const createEventsForMonth = async (data) => {
  return await instance.post("events/create-events-for-month", data);
};
export const updateEvent = async (id, data) => {
  return await instance.patch(`events/${id}`, data);
};
