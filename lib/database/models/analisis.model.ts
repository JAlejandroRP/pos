import { ObjectId } from "mongodb";

// export interface AnalisisWithId extends Analisis {
//   _id: ObjectId | string,
// }

export type Analisis = {
  _id?: ObjectId,
  name: string,
  tests: string[],
  code: string,
  lab: string,
  noIktan: number,
  deliveryTime: number,
  type: string,
  cost: number,
  costUrgent: number,
  costPublic: number,
  costPublicUrgent: number,
  addUrgentPrice: boolean,
  promo: string,
}