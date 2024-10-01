import { User, Appointment } from "../../dashboard/helpers/helperDashboard";
import axios from "axios";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `${import.meta.env.VITE_API_URL}/appoint/registrados`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axios.get<Appointment[]>(
      `${import.meta.env.VITE_API_URL}/appoint/registrado_cita`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const fetchNuevosClientes = async (): Promise<{
  nuevos_clientes: number;
}> => {
  try {
    const response = await axios.get<{ nuevos_clientes: number }>(
      `${import.meta.env.VITE_API_URL}/appoint/nuevos_clientes`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching nuevos clientes:", error);
    throw error;
  }
};
