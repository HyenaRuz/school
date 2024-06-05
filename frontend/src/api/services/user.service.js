import { instance } from "../axios.api";

export const getAllStudents = async (page) => {
  return await instance.get(`users/students?page=${page}&limit=6`);
};

export const getSearchUsers = async (input, role) => {
  return await instance.get(`users/search?keyword=${input}&role=${role}`);
};

export const createConnections = async (userData) => {
  return await instance.post(`/users/connections`, userData);
};

export const allConnections = async () => {
  return await instance.get(`/users/connections`);
};

export const findOneByActivationToken = async (token) => {
  return await instance.get(`/users/findOneByActivationToken/${token}`);
};

export const deleteConnection = async (id) => {
  return await instance.delete(`/users/delete-connection/${id}`);
};

export const updateUser = async (data) => {
  return await instance.patch(`/users/update`, data);
};

export const updateUserEducation = async (data, index) => {
  return await instance.patch(`/users/educations/${index}`, data);
};

export const createUserEducation = async (data) => {
  return await instance.post(`/users/educations`, data);
};

export const findOneById = async (id) => {
  return await instance.get(`/users/user/${id}`);
};
