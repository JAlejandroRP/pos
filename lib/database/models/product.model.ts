import { ObjectId } from "mongodb";

export type Product = {
  _id: ObjectId,
  image: string,
  name: string,
  price: number,
  stock: number,
  category: string,
  details: number,
}