export interface IPersonForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  family: string;
}

export interface IPerson {
  id: string;
  userId: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export interface IPersonFamilyForm {
  familyName: string;
  familyId?: number;
  personId?: number;
}
