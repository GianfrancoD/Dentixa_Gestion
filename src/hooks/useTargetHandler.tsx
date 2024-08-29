import { useCallback, useState } from "react";
import useHttpRequest from "./useHttpRequest";

interface ValidationRules {
  required?: boolean;
  isRequired?: boolean;
  requiredMessage?: string;
  pattern?: RegExp;
  patternMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  maxLength?: number;
  maxLengthMessage?: string;
  matches?: string;
  matchMessage?: string;
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
  checked?: boolean;
  checkedMessage?: string;
  selected?: boolean;
  selectedMessage?: string;
}

interface Target {
  [key: string]: string | number | boolean;
}

interface StorageOptions {
  storageType?: "local" | "session";
  storageKey?: string;
}

interface SecurityOptions {
  enableCSRF: boolean;
  rateLimit: number;
}

interface ImportMetaEnv {
  VITE_API_URL?: string;
  REACT_APP_API_URL?: string;
  NEXT_PUBLIC_API_URL?: string;
  [key: string]: string | undefined;
}

const validateRules = async (
  name: string,
  value: string | number | boolean,
  rules: ValidationRules,
  target: Target
): Promise<string | null> => {
  return new Promise((resolve) => {
    resolve(
      rules.required
        ? (rules.isRequired && typeof value !== "string") ||
          !value.toString().trim()
          ? rules.requiredMessage || `${name} es obligatorio 🚨`
          : !rules.isRequired && typeof value === "string" && !value.trim()
          ? null
          : rules.pattern && !rules.pattern.test(value.toString())
          ? rules.patternMessage || `${name} no es válido ❌`
          : rules.minLength && value.toString().length < rules.minLength
          ? rules.minLengthMessage ||
            `${name} debe tener al menos ${rules.minLength} caracteres`
          : rules.maxLength && value.toString().length > rules.maxLength
          ? rules.maxLengthMessage ||
            `${name} no puede exceder ${rules.maxLength} caracteres`
          : rules.matches &&
            value.toString() !== target[rules.matches]?.toString()
          ? rules.matchMessage || `${name} no coincide`
          : rules.min && Number(value) < rules.min
          ? rules.minMessage || `${name} debe ser al menos ${rules.min}`
          : rules.max && Number(value) > rules.max
          ? rules.maxMessage || `${name} no puede ser mayor que ${rules.max}`
          : rules.checked && !value
          ? rules.checkedMessage || `Debes aceptar ${name}`
          : rules.selected && !value
          ? rules.selectedMessage || `Debes seleccionar ${name}`
          : ""
        : ""
    );
  });
};

const sanitizeInput = (value: string | number | boolean): string => {
  if (typeof value !== "string") return value.toString();

  const strippedValue = value.replace(/<script.*?>.*?<\/script>/gi, "");
  const cleanValue = strippedValue.replace(/<\/?[^>]+(>|$)/g, "");
  const sanitizeValue = cleanValue
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  return sanitizeValue;
};

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

const useTargetHandler = <T extends Target>(
  initialValues: T = {} as T,
  validationRules: Record<string, ValidationRules> = {},
  Storage: StorageOptions = { storageType: undefined, storageKey: "formData" },
  security: SecurityOptions = { enableCSRF: false, rateLimit: 1000 }
): [
  Target,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (
    callback: (data: T) => void
  ) => (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  Record<string, { message: string }>,
  {
    apiCall: (
      endpoint: string,
      id?: number,
      data?: Record<string, string | number | boolean>,
      method?: "get" | "post" | "put" | "delete",
      http?:
        | "application/json"
        | "application/x-www-form-urlencoded"
        | "multipart/form-data"
        | "text/plain"
        | "application/xml",
      params?: Record<string, string | number | boolean>
    ) => Promise<void>;
    apiResponse: typeof apiResponse | null;
    userFound: boolean;
    error: string | null;
    params: Record<string, string | number | boolean>;
  },
  string | undefined
] => {
  const { enableCSRF, rateLimit } = security;
  const { storageType, storageKey } = Storage;

  const { apiCall, apiResponse, userFound, error, params } =
    useHttpRequest(enableCSRF);
  const storage =
    storageType === "local"
      ? localStorage
      : storageType === "session"
      ? sessionStorage
      : null;

  const [target, setTarget] = useState<T>(() => {
    const store = storage ? storage.getItem(storageKey || "formData") : null;
    return store ? JSON.parse(store) : initialValues;
  });

  const [errors, setErrors] = useState<Record<string, { message: string }>>({});
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleTarget = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (!name) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : sanitizeInput(value),
    }));
  }, []);

  const handleSubmit = useCallback(
    (callback: (data: T) => void) =>
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const currentTime = Date.now();
        if (currentTime - lastSubmitTime < rateLimit) {
          console.log("Demasiadas solicitudes. Por favor, espera.");
          return;
        }
        setLastSubmitTime(currentTime);

        const newError = Object.entries(target).reduce(
          (acc, [key, value]) =>
            typeof value === "string" &&
            value.trim() === "" &&
            !key.includes("terms")
              ? { ...acc, [key]: { message: `${key} no puede estar vacío` } }
              : acc,
          {} as Record<string, { message: string }>
        );

        await Promise.all(
          Object.entries(target).map(async ([key, value]) => {
            const rules = validationRules[key] || {};
            const sanitizeValue =
              typeof value === "string" && sanitizeInput(value);
            const error = await validateRules(
              key,
              sanitizeValue,
              rules,
              target
            );
            if (error) {
              newError[key] = { message: error };
            }
          })
        );

        if (Object.keys(newError).length > 0) {
          setErrors(newError);
          console.log("Errores encontrados:", newError);
        } else {
          console.log("Enviar datos:", target);
          if (storage) {
            storage.setItem(storageKey || "formData", JSON.stringify(target));
          }
          setTarget(initialValues);
          setErrors({});
          callback(target);
        }
      },
    [
      target,
      validationRules,
      lastSubmitTime,
      initialValues,
      rateLimit,
      storage,
      storageKey,
    ]
  );

  return [
    target,
    handleTarget,
    handleSubmit,
    errors,
    { apiCall, apiResponse, userFound, error, params },
    apiUrl,
  ];
};

export default useTargetHandler;
