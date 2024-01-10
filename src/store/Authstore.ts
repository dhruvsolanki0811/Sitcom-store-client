import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { axiosInstance } from "../axios/axios";
import { toast } from "react-toastify";
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
          loader: false,
          user: { userId: null, userEmail: null },
          showDevtools: false, // Initial value for devtools visibility
          setShowDevtools: (showDevtools) => set({ showDevtools }),
          login: async (email, password) => {
            set({ loader: true });
            try {
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
              if((err as any).response.data){
                toast.error((err as any).response.data.detail)
              }
              
            }
          },
          logout: async () => {
            set({ loader: true });
            try {
              const resp=await axiosInstance.post("/accounts/logout/");
              set({ user: { userEmail: null, userId: null }, loader: false });
              console.log(resp)
            } catch (err) {
              set({ loader: false });
              set({ user: { userEmail: null, userId: null }, loader: false });
              console.log(err);
              if(err && (err as any)?.response &&(err as any).response.data){
                toast.error((err as any).response.data)
              }
            }
          },
          signup: async (formData: FormData) => {
            set({ loader: true });
            try {
              await axiosInstance.post('/accounts/',formData)
              toast.success("Successfully User Registered");
            } catch (error) {
              set({ loader: false});
              console.log(error)
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
