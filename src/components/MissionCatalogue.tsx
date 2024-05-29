import { Button } from "@mui/material";
import { useMissionStore } from "../stores/MissionStore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import "./missionStyles.css";

function MissionCatalogue() {
  const { missions } = useMissionStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "members", headerName: "Members", flex: 1 },
    { field: "destination", headerName: "Destination", flex: 1 },
    { field: "departure", headerName: "Departure", flex: 1 },
  ];
  const rows = missions.map((m) => ({
    ...m,
    members: m.members.length,
    departure: moment(m.departure).format("DD/MM/YYYY"),
  }));

  return (
    <>
      <div className="title-bar">
        <h1>Mission catalogue</h1>
        <Button variant="contained">New mission</Button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </>
  );
}

export default MissionCatalogue;
