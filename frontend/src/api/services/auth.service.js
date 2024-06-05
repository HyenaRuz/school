import { instance } from "../axios.api";

export const registration = async (userData) => {
  const { data } = await instance.post("auth/signup", userData);
  return data;
};

export const registrationStudent = async (userData, token) => {
  const { data } = await instance.post(`auth/signupStudent/${token}`, userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await instance.post("auth/signin", userData);
  return data;
};

export const getProfile = async () => {
  const { data } = await instance.get("auth/profile");
  return data;
};
