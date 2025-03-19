import { create } from "zustand";

interface storeProps {
  btnLoading: boolean;
  loading: boolean;
  userInfo: { [key: string]: any } | null;
  userData: { [key: string]: any } | null;
  adminData: { [key: string]: any }[] | null;
  setUserInfo: (fetchedInfo: { [key: string]: any }) => void;
  setUserData: (fetcheduser: { [key: string]: any }) => void;
  setAdminData: (fetchedAdmin: { [key: string]: any }[]) => void;
  setBtnLoading: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export const useStore = create<storeProps>((set) => ({
  btnLoading: false,
  loading: true,
  userInfo: null,
  userData: null,
  adminData: null,
  setUserInfo: (fetchedInfo) => set({ userInfo: fetchedInfo }),
  setUserData: (fetchedUser) => set({ userData: fetchedUser }),
  setAdminData: (fetchedAdmin) => set({ adminData: fetchedAdmin }),
  setBtnLoading: (value) => set({ btnLoading: value }),
  setLoading: (value) => set({ loading: value }),
  }));
