import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId;
  clerkId: string;
  name: string;
  photo: string;
  role: string;
  phone: string;
  sex: string;
  birthday: string;
  direction?: string;
  email?: string;
}