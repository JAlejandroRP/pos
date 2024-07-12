import { Analisis } from "@/lib/database/models/analisis.model";

declare type AddProductParams = {
  name: string;
  image?: string;
  price: number;
  initial_stock: number;
  category: string;
  details?: string;
}

declare type CreateClerkUserParams = {
  name: string;
  birthday: string;
  sex: string;
  email?: string | null;
  phone: string;
  direction?: string;
}

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

declare type ClerkApiError = {
  status?: number,
  clerkTraceId?: string,
  clerkError?: boolean,
  errors?: [
    {
      code?: string,
      message?: string,
      longMessage?: string,
      meta?: object
    }
  ]
}

declare type Cart = {
  items: Analisis[]
  total: Number,
  subtotal: Number,
  tax: Number
}