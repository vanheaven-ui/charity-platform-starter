import axios from "axios";

// This checks for the environment variable. In Next.js,
// client-side variables must be prefixed with `NEXT_PUBLIC_`.
// `process.env` is the correct way to access them.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

/**
 * Verifies a Firebase ID token with your backend.
 * @param idToken The Firebase ID token to verify.
 * @returns The backend-generated token, or null if verification fails.
 */
export const verifyFirebaseToken = async (
  idToken: string
): Promise<string | null> => {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, {
      token: idToken,
    });

    const { token } = response.data;
    return token;
  } catch (error) {
    console.error("Backend token verification error:", error);
    return null;
  }
};

/**
 * Registers a new user with a Firebase ID token.
 * This is used for social login (e.g., Google Sign-In) to create a user account on your backend.
 * @param idToken The Firebase ID token from the client.
 * @returns The user data from the backend, or null if registration fails.
 */
export const registerWithFirebaseToken = async (
  idToken: string
): Promise<any | null> => {
  try {
    // We've updated the URL to use the consistent API_URL variable
    const response = await axios.post(`${API_URL}/google/callback`, {
      token: idToken,
      role: "Donor", // Pass the desired role to the backend
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Backend token registration error:", error);
    return null;
  }
};

/**
 * Registers a new user.
 * @param userData The user data for registration.
 */
export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

/**
 * Logs a user in and returns a token.
 * @param loginData The user login credentials.
 */
export const loginUser = async (loginData: any) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

/**
 * Fetches the current user's profile.
 * @param token The user's authentication token.
 */
export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Fetches a list of projects.
 * @param search An optional search query.
 */
export const getProjects = async (search?: string) => {
  const response = await axios.get(`${API_URL}/projects`, {
    params: { search },
  });
  return response.data;
};

/**
 * Creates a new project.
 * @param projectData The data for the new project.
 * @param token The user's authentication token.
 */
export const createProject = async (projectData: any, token: string) => {
  const response = await axios.post(`${API_URL}/projects`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Updates an existing project.
 * @param projectId The ID of the project to update.
 * @param projectData The updated project data.
 * @param token The user's authentication token.
 */
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

/**
 * Deletes a project.
 * @param projectId The ID of the project to delete.
 * @param token The user's authentication token.
 */
export const deleteProject = async (projectId: number, token: string) => {
  const response = await axios.delete(`${API_URL}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Creates a new donation.
 * @param donationData The data for the new donation.
 * @param token The user's authentication token.
 */
export const createDonation = async (donationData: any, token: string) => {
  const response = await axios.post(`${API_URL}/donations`, donationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Fetches the user's donations.
 * @param token The user's authentication token.
 */
export const getMyDonations = async (token: string) => {
  const response = await axios.get(`${API_URL}/donations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Updates the user's profile.
 * @param updateData The data to update the profile with.
 * @param token The user's authentication token.
 */
export const updateProfile = async (updateData: any, token: string) => {
  const response = await axios.put(`${API_URL}/profile`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Fetches donations grouped by project.
 * @param token The user's authentication token.
 */
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

/**
 * Fetches monthly donation data.
 * @param token The user's authentication token.
 */
export const getMonthlyDonations = async (token: string) => {
  const response = await axios.get(`${API_URL}/dashboard/monthly-donations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Fetches all events.
 * @param search An optional search query.
 */
export const getAllEvents = async (search?: string) => {
  const response = await axios.get(`${API_URL}/events`, {
    params: { search },
  });
  return response.data;
};

/**
 * Fetches a single event by ID.
 * @param eventId The ID of the event.
 */
export const getEventById = async (eventId: number) => {
  const response = await axios.get(`${API_URL}/events/${eventId}`);
  return response.data;
};

/**
 * Signs up a user for an event.
 * @param eventId The ID of the event to sign up for.
 * @param token The user's authentication token.
 */
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

/**
 * Creates a new event.
 * @param eventData The data for the new event.
 * @param token The user's authentication token.
 */
export const createEvent = async (eventData: any, token: string) => {
  const response = await axios.post(`${API_URL}/events`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Updates an existing event.
 * @param eventId The ID of the event to update.
 * @param eventData The updated event data.
 * @param token The user's authentication token.
 */
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

/**
 * Deletes an event.
 * @param eventId The ID of the event to delete.
 * @param token The user's authentication token.
 */
export const deleteEvent = async (eventId: number, token: string) => {
  const response = await axios.delete(`${API_URL}/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Fetches a list of volunteers for an event.
 * @param eventId The ID of the event.
 * @param token The user's authentication token.
 */
export const getVolunteersForEvent = async (eventId: number, token: string) => {
  const response = await axios.get(`${API_URL}/events/${eventId}/volunteers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Fetches events the user has signed up for.
 * @param token The user's authentication token.
 */
export const getSignedUpEvents = async (token: string) => {
  const response = await axios.get(`${API_URL}/users/signed-up-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
