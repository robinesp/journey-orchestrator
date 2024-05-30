export type Mission = {
  id: string;
  name: string;
  destination: string;
  departure: Date;
  members: Member[];
};

export const MEMBER_TYPES = ["Pilot", "Engineer", "Passenger"] as const;
export type MemberType = (typeof MEMBER_TYPES)[number];

export const JOB_TYPES = [
  "Navigation",
  "Solar panels",
  "Maintenance",
  "Mechanics",
] as const;
export type Job = (typeof JOB_TYPES)[number];

export type Member = {
  type: MemberType;
  experience?: number;
  job?: Job;
  age?: number;
  wealth?: number;
};
