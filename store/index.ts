import { create } from "zustand";

interface storeProps {
  userInfo: { [key: string]: any } | null;
  userData: { [key: string]: any } | null;
  adminData: { [key: string]: any }[] | null;
  setUserInfo: (fetchedInfo: { [key: string]: any }) => void;
  setUserData: (fetcheduser: { [key: string]: any }) => void;
  setAdminData: (fetchedAdmin: { [key: string]: any }[]) => void;
  //   clickedID: string | null;
  //   setClickedID: (clickID?: string | null) => void;
  //   displayMenu: boolean;
  //   setDisplayMenu: (display: boolean) => void;
  //   itemView: boolean | null;
  //   setItemView: (view: boolean | null) => void;
}

export const useStore = create<storeProps>((set) => ({
  userInfo: null,
  userData: null,
  adminData: null,
  setUserInfo: (fetchedInfo) => set({ userInfo: fetchedInfo }),
  setUserData: (fetchedUser) => set({ userData: fetchedUser }),
  setAdminData: (fetchedAdmin) => set({ adminData: fetchedAdmin }),
  //   clickedID: null,
  //   setClickedID: (clickID?) => set({ clickedID: clickID }),
  //   displayMenu: false,
  //   setDisplayMenu: (display) => set({ displayMenu: display }),
  //   itemView: true,
  //   setItemView: (view) => set({ itemView: view }),
}));
