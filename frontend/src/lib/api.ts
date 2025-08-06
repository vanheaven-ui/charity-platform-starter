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

export const getProjects = async (search?: string) => {
  const response = await axios.get(`${API_URL}/projects`, {
    params: { search },
  });
  return response.data;
};

export const createProject = async (projectdata: any, token: string) => {
  const response = await axios.post(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProject = async (
  projectId: number,
  projectData: any,
  token: string
) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteProject = async (projectId: number, token: string) => {
  const response = await axios.delete(`${API_URL}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createDonation = async (donationData: any, token: string) => {
  const response = await axios.post(`${API_URL}/donations`, donationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMyDonations = async (token: string) => {
  const response = await axios.get(`${API_URL}/donations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (updateData: any, token: string) => {
  const response = await axios.put(`${API_URL}/profile`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getDonationsByProject = async (token: string) => {
  const response = await axios.get(
    `${API_URL}/dashboard/donations-by-project`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getMonthlyDonations = async (token: string) => {
  const response = await axios.get(`${API_URL}/dashboard/monthly-donations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllEvents = async (search?: string) => {
  const response = await axios.get(`${API_URL}/events`, {
    params: { search },
  });
  return response.data;
};

export const getEventById = async (eventId: number) => {
  const response = await axios.get(`${API_URL}/events/${eventId}`);
  return response.data;
};

export const signUpForEvent = async (eventId: number, token: string) => {
  const response = await axios.post(
    `${API_URL}/events/${eventId}/signup`,
    {}, // No body needed for this POST request
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createEvent = async (eventData: any, token: string) => {
  const response = await axios.post(`${API_URL}/events`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateEvent = async (
  eventId: number,
  eventData: any,
  token: string
) => {
  const response = await axios.put(`${API_URL}/events/${eventId}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteEvent = async (eventId: number, token: string) => {
  const response = await axios.delete(`${API_URL}/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getVolunteersForEvent = async (eventId: number, token: string) => {
  const response = await axios.get(`${API_URL}/events/${eventId}/volunteers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
