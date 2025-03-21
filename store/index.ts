import { create } from "zustand";

interface storeProps {
  loading: boolean;
  disabled: boolean;
  userInfo: { [key: string]: any } | null;
  userData: { [key: string]: any } | null;
  adminData: { [key: string]: any }[] | null;
  setUserInfo: (fetchedInfo: { [key: string]: any } | null) => void;
  setUserData: (fetcheduser: { [key: string]: any } | null) => void;
  setAdminData: (fetchedAdmin: { [key: string]: any }[] | null) => void;
  setLoading: (value: boolean) => void;
  setDisabled: (disabledValue: boolean) => void;
}

export const useStore = create<storeProps>((set) => ({
  loading: true,
  disabled: false,
  userInfo: null,
  userData: null,
  adminData: null,
  setUserInfo: (fetchedInfo) => set({ userInfo: fetchedInfo }),
  setUserData: (fetchedUser) => set({ userData: fetchedUser }),
  setAdminData: (fetchedAdmin) => set({ adminData: fetchedAdmin }),
  setLoading: (value) => set({ loading: value }),
  setDisabled: (disabledValue) => set({ disabled: disabledValue }),
}));
