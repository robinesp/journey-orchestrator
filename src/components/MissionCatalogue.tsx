import { useMissionStore } from "../stores/MissionStore";

function MissionCatalogue() {
  const { missions } = useMissionStore();
  return <>{JSON.stringify(missions)}</>;
}

export default MissionCatalogue;
