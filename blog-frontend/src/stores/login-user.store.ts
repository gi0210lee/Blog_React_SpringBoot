import { IUser } from "types/interface";
import { create } from "zustand";

interface ILoginUserStore {
  loginUser: IUser | null;
  setLoginUser: (loginUser: IUser) => void;
  resetLoginUser: () => void;
}

const useLoginUserStore = create<ILoginUserStore>((set) => ({
  loginUser: null,
  setLoginUser: (loginUser) => set((state) => ({ ...state, loginUser })),
  resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
}));

export default useLoginUserStore;
