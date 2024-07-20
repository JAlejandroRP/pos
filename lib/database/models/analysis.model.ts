import { ObjectId } from "mongodb";

export type Analysis = {
  _id?: ObjectId,
  name: string,
  costPublic: number,
  cost: number,
  type: string,
}