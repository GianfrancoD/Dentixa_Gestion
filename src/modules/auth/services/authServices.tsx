import axios from "axios";

export const handleLogout = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data.message);
      localStorage.removeItem("token");
      return response.data.redirect_url;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error logging out:", error.response);
      console.error("Error message:", error);
    }
    return "";
  }
};

// ----------------------------------------------------------------

export const validateRegister = async (
  email: string,
  nombre: string,
  password: string
): Promise<boolean> => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/validate_register`,
      {
        email,
        nombre,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data.user_exists;
  } catch (error) {
    console.error("Error validating email:", error);
    throw new Error("Error validating email.");
  }
};

//  ----------------------------------------------------------------

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/current-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching current user:", error.response);
      console.error("Error message:", error);
    }
  }
};
