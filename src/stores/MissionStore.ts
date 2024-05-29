import { create } from "zustand";
import { Mission } from "../types";
import { missions } from "../data";

interface MissionState {
  missions: Mission[];
  addMission: (mission: Mission) => void;
}

export const useMissionStore = create<MissionState>((set) => ({
  missions: missions,
  addMission: (mission: Mission) =>
    set((state) => ({ missions: [...state.missions, mission] })),
}));
