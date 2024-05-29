import { Mission } from "../types";

const pilotA = {
  name: "John Doe",
  experience: 14,
};

const pilotB = {
  name: "Jane Smith",
  experience: 18,
};

const engineerA = {
  name: "Joe Spencer",
  experience: 3,
  job: "Solar panels",
};

const engineerB = {
  name: "Kristin Smith",
  experience: 4,
  job: "Mechanics",
};

const passengerA = {
  name: "Joel Randall",
  age: 41,
  wealth: 50000,
};

const passengerB = {
  name: "Sue Jordan",
  age: 35,
  wealth: 100000,
};

const missionA = {
  name: "Expedition 2024",
  departure: new Date("01-01-2024"),
  members: [pilotA, engineerA, passengerA, passengerB]
};

const missionB = {
  name: "Expedition 2025",
  departure: new Date("01-01-2025"),
  members: [pilotB, engineerA, engineerB, passengerA,],
};

export const missions = [missionA, missionB] as Mission[];