import {
  IconButton,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { JOB_TYPES, MEMBER_TYPES, Member, MemberType, Mission } from "../types";
import "./missionStyles.css";
import { ChangeEvent } from "react";
import { Delete } from "@mui/icons-material";

function MemberRow({
  member,
  ix,
  mission,
  setMission,
  showValidation,
  createNewMember,
}: {
  member: Member;
  ix: number;
  mission: Mission;
  setMission: (mission: Mission) => void;
  showValidation: boolean;
  createNewMember: (type: MemberType) => Member;
}) {
  const memberChangeHandler = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    if (!mission) return;
    const { name, value } = event.target;
    // if the member type changed reset all fields
    if (name === "type") {
      mission.members[ix] = createNewMember(value as MemberType);
    } else {
      // @ts-expect-error suppress type error for unkown type assignment
      mission.members[ix][name] = value === "" ? undefined : value;
    }
    setMission({ ...mission });
  };

  const memberDeleteHandler = () => {
    if (!mission) return;
    mission.members.splice(ix, 1);
    setMission({ ...mission });
  };

  switch (member.type) {
    case "Pilot":
      return (
        <div className="member" key={ix}>
          <TextField
            select
            required
            value={member.type}
            label="Type"
            name="type"
            onChange={memberChangeHandler}
          >
            {MEMBER_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            type="number"
            id="experience"
            name="experience"
            label="Experience"
            value={member.experience}
            onChange={memberChangeHandler}
            error={showValidation && member.experience === undefined}
            helperText={
              showValidation && member.experience === undefined
                ? "Required field"
                : ""
            }
          />
          <div className="filler" />
          <IconButton onClick={memberDeleteHandler}>
            <Delete />
          </IconButton>
        </div>
      );
    case "Engineer":
      return (
        <div className="member" key={ix}>
          <TextField
            select
            value={member.type}
            label="Type"
            name="type"
            onChange={memberChangeHandler}
          >
            {MEMBER_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            type="number"
            id="experience"
            name="experience"
            label="Experience"
            value={member.experience}
            onChange={memberChangeHandler}
            error={showValidation && member.experience === undefined}
            helperText={
              showValidation && member.experience === undefined
                ? "Required field"
                : ""
            }
          />
          <TextField
            required
            select
            value={member.job}
            label="Job"
            name="job"
            onChange={memberChangeHandler}
            error={showValidation && member.job === undefined}
            helperText={
              showValidation && member.job === undefined ? "Required field" : ""
            }
          >
            {JOB_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <IconButton onClick={memberDeleteHandler}>
            <Delete />
          </IconButton>
        </div>
      );
    case "Passenger":
      return (
        <div className="member" key={ix}>
          <TextField
            required
            select
            value={member.type}
            label="Type"
            name="type"
            onChange={memberChangeHandler}
          >
            {MEMBER_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            type="number"
            id="age"
            name="age"
            label="Age"
            value={member.age}
            onChange={memberChangeHandler}
            error={showValidation && member.age === undefined}
            helperText={
              showValidation && member.age === undefined ? "Required field" : ""
            }
          />
          <TextField
            required
            type="number"
            id="wealth"
            name="wealth"
            label="Wealth"
            value={member.wealth}
            onChange={memberChangeHandler}
            error={showValidation && member.wealth === undefined}
            helperText={
              showValidation && member.wealth === undefined
                ? "Required field"
                : ""
            }
          />
          <IconButton onClick={memberDeleteHandler}>
            <Delete />
          </IconButton>
        </div>
      );
    default:
      return null;
  }
}

export default MemberRow;
