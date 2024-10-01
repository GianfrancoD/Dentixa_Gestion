export interface User {
  id: number;
  nombre: string;
  email: string;
  is_active: boolean;
}

export interface Appointment {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  servicio: string;
  fecha: string;
}
