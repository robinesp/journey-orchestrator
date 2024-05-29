export type Mission = {
  id: number;
  name: string;
  destination: string;
  departure: Date;
  members: Member[];
};

export type Job = "Navigation" | "Solar panels" | "Maintenance" | "Mechanics";

export type Member = {
  name: string;
};

export type Pilot = Member & {
  experience: string;
};

export type Engineer = Member & {
  experience: string;
  job: Job;
};

export type Passenger = Member & {
  age: number;
  wealth: number;
};
