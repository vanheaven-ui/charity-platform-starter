import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (loginData: any) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
}
