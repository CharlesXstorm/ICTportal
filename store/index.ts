import { create } from "zustand";

interface storeProps {
  loading: boolean;
  userInfo: { [key: string]: any } | null;
  userData: { [key: string]: any } | null;
  adminData: { [key: string]: any }[] | null;
  setUserInfo: (fetchedInfo: { [key: string]: any }) => void;
  setUserData: (fetcheduser: { [key: string]: any }) => void;
  setAdminData: (fetchedAdmin: { [key: string]: any }[]) => void;
  setLoading: (value: boolean) => void;
}

export const useStore = create<storeProps>((set) => ({
  loading: true,
  userInfo: null,
  userData: null,
  adminData: null,
  setUserInfo: (fetchedInfo) => set({ userInfo: fetchedInfo }),
  setUserData: (fetchedUser) => set({ userData: fetchedUser }),
  setAdminData: (fetchedAdmin) => set({ adminData: fetchedAdmin }),
  setLoading: (value) => set({ loading: value }),
  }));
