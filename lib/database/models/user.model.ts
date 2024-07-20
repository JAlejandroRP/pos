import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId;
  clerkId?: string;
  sex: string;
  name: string;
  role: string;
  birthday: string;
  photo?: string;
  phone?: string;
  direction?: string;
  email?: string;
  isParticular: boolean;
}