import { Model } from 'mongoose';

type Address = {
  country: string;
  district: string;
  street: string;
};

type Education = {
  educationLevel: string;
  degreeTitle: string;
  institute: string;
  startDate: string;
  endDate?: string;
  currentlyStudying: boolean;
};

type Experience = {
  designation: string;
  company: string;
  decryption: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
};
export type IUser = {
  studentId?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: string;
  gender?: string;
  presentAddress?: Address;
  permanentAddress?: Address;
  education?: Education;
  skills?: string;
  experience?: Experience;
  isVerified: boolean;
  loggedInDevice?: string | null;
  photoUrl?: string;
  _id?: string;
  accessToken?: string;
  userStatus: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _doc?: any;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
