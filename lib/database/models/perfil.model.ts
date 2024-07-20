import { ObjectId } from "mongodb";
import { Analysis } from "./analysis.model";
import { User } from "./user.model";

export type Perfil = {
  _id?: ObjectId,
  user: User,
  name: string,
  analysis: Analysis[],
  customCost?: number,
  total: number,
}