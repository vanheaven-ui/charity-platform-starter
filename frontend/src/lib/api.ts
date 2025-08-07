import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export interface User {
  id: number;
  email: string;
  role: "Donor" | "Admin" | "Volunteer" | "Partner" | "Beneficiary" | "Supplier" | "Member";
  name?: string;
  profileImage?: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
  role: "Donor" | "Admin" | "Volunteer";
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
}

export interface ProjectData {
  title: string;
  description: string;
  goal: number;
}

export interface Donation {
  id: number;
  amount: number;
  projectId: number;
  donorId: number;
}

export interface DonationData {
  amount: number;
  projectId: number;
}

export interface DonationByProject {
  projectTitle: string;
  totalDonations: number;
}

export interface MonthlyDonation {
  month: string;
  totalAmount: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface Volunteer {
  id: number;
  name: string;
  email: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export const verifyFirebaseToken = async (
  idToken: string
): Promise<string | null> => {
  try {
    const response = await axios.post<{ token: string }>(`${API_URL}/auth/google`, {
      token: idToken,
    });
    const { token } = response.data;
    return token;
  } catch (error) {
    console.error("Backend token verification error:", error);
    return null;
  }
};

export const registerWithFirebaseToken = async (
  idToken: string
): Promise<User | null> => {
  try {
    const response = await axios.post<{ user: User }>(`${API_URL}/google/callback`, {
      token: idToken,
      role: "Donor",
    });
    const { user } = response.data;
    return user;
  } catch (error) {
    console.error("Backend token registration error:", error);
    return null;
  }
};

export const registerUser = async (userData: RegisterUserData): Promise<User> => {
  const response = await axios.post<User>(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, loginData);
  return response.data;
};

export const getProfile = async (token: string): Promise<User> => {
  const response = await axios.get<User>(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProjects = async (search?: string): Promise<Project[]> => {
  const response = await axios.get<Project[]>(`${API_URL}/projects`, {
    params: { search },
  });
  return response.data;
};

export const createProject = async (projectData: ProjectData, token: string): Promise<Project> => {
  const response = await axios.post<Project>(`${API_URL}/projects`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProject = async (
  projectId: number,
  projectData: ProjectData,
  token: string
): Promise<Project> => {
  const response = await axios.put<Project>(
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

export const deleteProject = async (projectId: number, token: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createDonation = async (donationData: DonationData, token: string): Promise<Donation> => {
  const response = await axios.post<Donation>(`${API_URL}/donations`, donationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMyDonations = async (token: string): Promise<Donation[]> => {
  const response = await axios.get<Donation[]>(`${API_URL}/donations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (updateData: UpdateProfileData, token: string): Promise<User> => {
  const response = await axios.put<User>(`${API_URL}/profile`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getDonationsByProject = async (token: string): Promise<DonationByProject[]> => {
  const response = await axios.get<DonationByProject[]>(
    `${API_URL}/dashboard/donations-by-project`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getMonthlyDonations = async (token: string): Promise<MonthlyDonation[]> => {
  const response = await axios.get<MonthlyDonation[]>(`${API_URL}/dashboard/monthly-donations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllEvents = async (search?: string): Promise<Event[]> => {
  const response = await axios.get<Event[]>(`${API_URL}/events`, {
    params: { search },
  });
  return response.data;
};

export const getEventById = async (eventId: number): Promise<Event> => {
  const response = await axios.get<Event>(`${API_URL}/events/${eventId}`);
  return response.data;
};

export const signUpForEvent = async (eventId: number, token: string): Promise<{ message: string }> => {
  const response = await axios.post<{ message: string }>(
    `${API_URL}/events/${eventId}/signup`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createEvent = async (eventData: EventData, token: string): Promise<Event> => {
  const response = await axios.post<Event>(`${API_URL}/events`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateEvent = async (
  eventId: number,
  eventData: EventData,
  token: string
): Promise<Event> => {
  const response = await axios.put<Event>(`${API_URL}/events/${eventId}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteEvent = async (eventId: number, token: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getVolunteersForEvent = async (eventId: number, token: string): Promise<Volunteer[]> => {
  const response = await axios.get<Volunteer[]>(`${API_URL}/events/${eventId}/volunteers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSignedUpEvents = async (token: string): Promise<Event[]> => {
  const response = await axios.get<Event[]>(`${API_URL}/users/signed-up-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
