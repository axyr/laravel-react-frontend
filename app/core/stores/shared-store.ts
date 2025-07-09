import Cookies from 'js-cookie'
import { create } from 'zustand'

export interface SharedData {
    name: string;
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}

export const useSharedStore = create<SharedData>((set) => ({
    name:  import.meta.env.VITE_APP_NAME,
    sidebarOpen: Cookies.get('sidebar_state') === 'true',
    setSidebarOpen: (value) => set({ sidebarOpen: value }),
}));