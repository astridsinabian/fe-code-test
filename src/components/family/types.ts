import { IPerson } from "../person/types";

export interface IFamilyForm {
  familyName: string;
  familyId: string;
  personId: string;
}

export interface IFamily {
  id: string;
  userId: string;
  name: string;
  familyMembers: IPerson[];
}
