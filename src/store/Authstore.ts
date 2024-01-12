import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { axiosInstance } from "../axios/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface FormData {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
}

type DevtoolsStore = {
  showDevtools: boolean;
  setShowDevtools: (showDevtools: boolean) => void;
};

interface MyResponseData {
  detail: string;
}

interface AuthStore extends DevtoolsStore {
  loader: boolean;
  user: {
    userId: number | null;
    userEmail: string | null;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (formData: FormData) => Promise<void>;
}

export const useUserAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => {
        return {
          loader: false,  // <-- Initial state for loader is set to false
          user: { userId: null, userEmail: null },
          showDevtools: false, // Initial value for devtools visibility
          setShowDevtools: (showDevtools) => set({ showDevtools }),
          login: async (email, password) => {
            try {
              set({ loader: true });  
              const response = await axiosInstance.post("/accounts/login/", {
                email: email,
                password: password,
              });
              set({
                user: {
                  userEmail: response.data.email,
                  userId: response.data.id,
                },
                loader: false,
              });

              toast.success("Successfully login");
            } catch (err) {
              set({ loader: false });

              if ((err as AxiosError).response?.data) {
                const detail = (err as AxiosError<MyResponseData>)?.response
                  ?.data?.detail;
                if (detail) {
                  toast.error(detail);
                } else {
                  toast.error("Server error");
                }
              }
            }
          },
          logout: async () => {
            try {
              await axiosInstance.post("/accounts/logout/");
              set({ user: { userEmail: null, userId: null } });
            } catch (err) {
              set({ user: { userEmail: null, userId: null }});
            }
          },
          signup: async (formData: FormData) => {
            try {
              set({ loader: true });
              await axiosInstance.post("/accounts/", formData);
              toast.success("Successfully User Registered");
              set({ loader: false });
            } catch (error) {
              set({ loader: false });
              console.log(error);
            }
          },
        };
      },
      {
        name: "user", // key under which the state will be stored
        getStorage: () => localStorage, // use localStorage as the storage engine
      }
    )
  )
);
