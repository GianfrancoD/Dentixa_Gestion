import axios from "axios";
import { useCallback, useState } from "react";

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

interface ImportMetaEnv {
  VITE_API_URL?: string;
  REACT_APP_API_URL?: string;
  NEXT_PUBLIC_API_URL?: string;
  [key: string]: string | undefined;
}

const getEnvVar = (varName: string): string | undefined => {
  if (typeof window !== "undefined" && import.meta.env) {
    return (import.meta.env as ImportMetaEnv)[varName];
  } else {
    return process.env[varName];
  }
};

const apiUrl =
  getEnvVar("VITE_API_URL") ||
  getEnvVar("REACT_APP_API_URL") ||
  getEnvVar("NEXT_PUBLIC_API_URL");

interface ApiResponse {
  message: string;
  [key: string]: string | number | boolean;
}

type Method = "get" | "post" | "put" | "delete";
interface UseHttpRequestResult {
  apiCall: (
    endpoint: string,
    id?: number,
    data?: Record<string, string | number | boolean>,
    method?: Method,
    http?:
      | "application/json"
      | "application/x-www-form-urlencoded"
      | "multipart/form-data"
      | "text/plain"
      | "application/xml",
    params?: Record<string, string | number | boolean>
  ) => Promise<ApiResponse | null>;
  apiResponse: ApiResponse | null;
  userFound: boolean;
  error: string | null;
  params: Record<string, string | number | boolean>;
}

const validate = (endpoint: string, method: Method, http: string) => {
  if (!endpoint) {
    throw new Error(
      "El endpoint es requerido o no está creado en useHttpRequest"
    );
  }
  if (!["get", "post", "put", "delete"].includes(method)) {
    throw new Error(
      "Método no válido o no está creado en useHttpRequest, debe ser 'get', 'post', 'put' o 'delete'"
    );
  }
  if (
    ![
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
      "application/xml",
    ].includes(http)
  ) {
    throw new Error("El tipo de contenido en useHttpRequest es requerido");
  }
};

const useHttpRequest = (enableCSRF = false): UseHttpRequestResult => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [userFound, setUserFound] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCsrfToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrfToken="))
      ?.split("=")[1];
  };

  const apiCall = useCallback(
    async (
      endpoint: string,
      id?: number,
      data?: Record<string, string | number | boolean>,
      method: Method = "get",
      http: string = "application/json",
      params?: Record<string, string | number | boolean>
    ): Promise<void> => {
      validate(endpoint, method, http);
      console.log(
        "Llamando a la API:",
        endpoint,
        id,
        data,
        method,
        http,
        params
      );
      let url = `${apiUrl}/${endpoint}${id ? `/${id}` : ""}`;
      if (params) {
        const queryParams = new URLSearchParams(
          Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString();
        url += `?${queryParams}`;
      }
      if (endpoint === "csrf-token") {
        try {
          const csrfToken = enableCSRF ? getCsrfToken() : null;
          const response = await axios[method](url, data, {
            headers: {
              "X-CSRF-Token": csrfToken,
              "content-type": http,
              mode: "no-cache",
              Accept: "application/json",
            },
          });
          console.log("Respuesta de la API:", response.data);
          setApiResponse(response.data.message || response.data);
          setUserFound(true);
          return response.data;
        } catch (error) {
          const tempError: ApiError = error as ApiError;
          console.error("Error en la llamada a la API:", error);
          setUserFound(true);
          setApiResponse({
            message:
              tempError.response?.data?.message ||
              "Error al crear el usuario ⚠️",
          });
          setError(tempError.response?.data?.message || "Error desconocido");
          return null;
        }
      }
    },
    [enableCSRF]
  );

  return { apiCall, apiResponse, userFound, error, params: {} };
};

export default useHttpRequest;
