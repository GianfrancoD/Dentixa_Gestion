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
      return response.data.redirect_url;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error logging out:", error);
      console.error("Error message:", error.response.data);
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
