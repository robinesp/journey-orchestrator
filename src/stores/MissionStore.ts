import { create } from "zustand";
import { Mission } from "../types";
import { missions } from "../data";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

interface MissionState {
  missions: Mission[];
  getMissionById(id: string): Mission | undefined;
}

interface MissionAction {
  createMission: (mission: Mission) => void;
  editMission: (id: string, mission: Mission) => void;
}

export const useMissionStore = create<MissionState & MissionAction>()(
  persist(
    (set, get) => ({
      missions: missions,
      getMissionById: (id: string) =>
        get().missions.find((mission) => mission.id === id),
      createMission: (mission: Mission) => {
        mission.id = uuidv4();
        set((state) => ({ missions: [...state.missions, mission] }));
      },
      editMission: (id: string, mission: Mission) => {
        // find index of existing mission and update it
        const ix = get()
          .missions.map((e) => e.id)
          .indexOf(id);
        set((state) => {
          state.missions[ix] = mission;
          return { missions: state.missions };
        });
      },
    }),
    { name: "mission-storage" }
  )
);
