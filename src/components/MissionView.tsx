import {
  Alert,
  AlertColor,
  Box,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";
import { useMissionStore } from "../stores/MissionStore";
import { JOB_TYPES, Member, MemberType, Mission } from "../types";
import "./missionStyles.css";
import { useParams } from "react-router";
import { ChangeEvent, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import MemberRow from "./MemberRow";
import { Link, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

const createNewMember = (type: MemberType): Member => {
  switch (type) {
    case "Pilot":
      return {
        type: "Pilot",
        experience: 0,
      };
    case "Engineer":
      return {
        type: "Engineer",
        experience: 0,
        job: JOB_TYPES[0],
      };
    case "Passenger":
      return {
        type: "Passenger",
        age: 0,
        wealth: 0,
      };
  }
};

const emptyMission: Mission = {
  id: "",
  name: "",
  departure: new Date(),
  destination: "",
  members: [],
};

function MissionView() {
  const { getMissionById, createMission, editMission } = useMissionStore();
  const navigate = useNavigate();
  const { id } = useParams();

  // if no ID is passed, create a new mission
  const initMission = id ? getMissionById(id) : emptyMission;
  const [mission, setMission] = useState(initMission);

  const [showValidation, setShowValidation] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("error" as AlertColor);
  const [alertContent, setAlertContent] = useState("");
  const showAlert = (
    message: string,
    type: "error" | "warning" | "success" = "error"
  ) => {
    setAlertContent(message);
    setAlertType(type);
    setAlert(true);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!mission) return;
    const { name, value } = event.target;
    setMission({ ...mission, [name]: value });
  };

  const dateChangeHandler = (value: Dayjs, name: string) => {
    if (!mission) return;
    if (!value) {
      showAlert("The date is required");
      return;
    }
    setMission({ ...mission, [name]: value.toDate() });
  };

  const addNewMember = () => {
    if (!mission) return;
    setMission({
      ...mission,
      members: [...mission.members, createNewMember("Pilot")],
    });
  };

  const saveMission = () => {
    if (!mission) return;
    setShowValidation(true);

    // check required fields for mission and member attributes
    if (
      !mission.name ||
      !mission.departure ||
      !mission.destination ||
      mission.members.some((m) =>
        Object.keys(m).some((k) => m[k as keyof Member] === undefined)
      )
    ) {
      showAlert("Fill in all required fields");
      return;
    }

    // exactly one pilot
    if (
      mission.members.filter((member) => member.type === "Pilot").length !== 1
    ) {
      showAlert("A mission must have exactly one pilot");
      return;
    }

    // all pilot have at least 10y experience
    const pilot = mission.members.find((member) => member.type === "Pilot");
    if (!pilot?.experience || pilot?.experience < 10) {
      showAlert("The pilot must have at least 10 years of experience");
      return;
    }

    // all engineers have different jobs
    const engs = mission.members.filter((member) => member.type === "Engineer");
    const uniqueJobs = [
      ...new Set(engs.filter((e) => e.job).map((e) => e.job)),
    ];
    if (uniqueJobs.length !== engs.length) {
      showAlert("All engineers must have different jobs");
      return;
    }

    // at least one passenger
    if (
      mission.members.filter((member) => member.type === "Passenger").length < 1
    ) {
      showAlert("A mission must have at least one passenger");
      return;
    }

    try {
      id ? editMission(id, mission) : createMission(mission);
      navigate("/");
    } catch (err) {
      showAlert((err as Error).message);
    }
  };

  return (
    <>
      {mission ? (
        <div>
          <div className="title-bar">
            <h1>{id ? "Edit mission" : "Create new mission"}</h1>
          </div>
          <Box component="form" autoComplete="off">
            <div className="mission-details">
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                value={mission.name}
                onChange={changeHandler}
                error={showValidation && !mission.name}
                helperText={
                  showValidation && !mission.name ? "Required field" : ""
                }
              />
              <TextField
                required
                id="destination"
                name="destination"
                label="Destination"
                value={mission.destination}
                onChange={changeHandler}
                error={showValidation && !mission.destination}
                helperText={
                  showValidation && !mission.destination ? "Required field" : ""
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Departure"
                  format="DD-MM-YYYY"
                  value={dayjs(mission.departure)}
                  onChange={(d) => dateChangeHandler(d as Dayjs, "departure")}
                />
              </LocalizationProvider>
            </div>
            <div className="mission-members">
              <h3>Members</h3>
              {mission.members.map((m, ix) => (
                <MemberRow
                  key={ix}
                  member={m}
                  ix={ix}
                  mission={mission}
                  setMission={setMission}
                  showValidation={showValidation}
                  createNewMember={createNewMember}
                />
              ))}
              <Button
                startIcon={<Add />}
                onClick={addNewMember}
                data-cy="add-member"
              >
                Add member
              </Button>
            </div>
          </Box>
          <div className="button-bar">
            <Button variant="outlined" component={Link} to="/" data-cy="cancel">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={saveMission}
              data-cy="save-mission"
            >
              Save mission
            </Button>
          </div>
          {alert ? (
            <Snackbar
              open={alert}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={5000}
              onClose={() => setAlert(false)}
            >
              <Alert
                onClose={() => setAlert(false)}
                severity={alertType}
                sx={{ width: "100%" }}
              >
                {alertContent}
              </Alert>
            </Snackbar>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>Mission not found</div>
      )}
    </>
  );
}

export default MissionView;
