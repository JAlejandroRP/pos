import { ObjectId } from "mongodb";

// export interface AnalysisWithId extends Analysis {
//   _id: ObjectId | string,
// }

export type Analysis = {
  _id?: ObjectId,
  name: string,
  tests: string[],
  code: string,
  lab: string,
  noIktan: number,
  deliveryTime: number,
  type: string,
  cost: number,
  // costUrgent: number,
  costPublic: number,
  // costPublicUrgent: number,
  // addUrgentPrice: boolean,
  promo: string,
}