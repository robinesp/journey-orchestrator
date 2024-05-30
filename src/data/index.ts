import { Member, Mission } from "../types";

const pilotA: Member = {
  type: "Pilot",
  experience: 14,
};

const pilotB: Member = {
  type: "Pilot",
  experience: 18,
};

const engineerA: Member = {
  type: "Engineer",
  experience: 3,
  job: "Solar panels",
};

const engineerB: Member = {
  type: "Engineer",
  experience: 4,
  job: "Mechanics",
};

const passengerA: Member = {
  type: "Passenger",
  age: 41,
  wealth: 50000,
};

const passengerB: Member = {
  type: "Passenger",
  age: 35,
  wealth: 100000,
};

const missionA: Mission = {
  id: "89f6e509-ec4a-4f94-9934-b4fcfca9ba64",
  name: "Expedition 2024",
  destination: "Mars Alpha-116",
  departure: new Date("01-01-2024"),
  members: [pilotA, engineerA, passengerA, passengerB],
};

const missionB: Mission = {
  id: "f8ea7d3c-a630-490a-94a8-fe65cc567b64",
  name: "Expedition 2025",
  destination: "Mars Alpha-118",
  departure: new Date("01-01-2025"),
  members: [pilotB, engineerA, engineerB, passengerA],
};

export const missions = [missionA, missionB] as Mission[];
