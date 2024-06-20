declare type AddProductParams = {
  name: string;
  image?: string;
  price: number;
  initial_stock: number;
  category: string;
  details?: string;
}

// ====== USER PARAMS
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  role?: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};