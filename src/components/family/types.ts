import { IPerson } from "../person/types";

export interface IFamily {
  id: string;
  userId: string;
  name: string;
  familyMembers: IPerson[];
}
