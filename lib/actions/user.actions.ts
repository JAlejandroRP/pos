"use server";

import { revalidatePath } from "next/cache";

import { User } from "../database/models/user.model";
import { connectToDatabase } from "../database/mongodb";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users')

    collection.insertOne(user)

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

// READ
// export async function getUserByClerkId(userClerkId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findOne({ clerkId: userClerkId });

//     if (!user) throw new Error("User not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     handleError(error);
//   }
// }

// export async function getUserByMongoId(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findById(userId);

//     if (!user) throw new Error("User not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // UPDATE
// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase();

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
//       new: true,
//     });

//     console.log(updatedUser);


//     if (!updatedUser) throw new Error("User update failed");

//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // DELETE
// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }

// // USE CREDITS
// export async function updateCredits(userId: string, creditFee: number) {
//   try {
//     console.log('updating', userId, creditFee);

//     await connectToDatabase();

//     const updatedUserCredits = await User.findOneAndUpdate(
//       { _id: userId },
//       { $inc: { creditBalance: creditFee } },
//       { new: true }
//     )

//     if (!updatedUserCredits) throw new Error("User credits update failed");

//     return JSON.parse(JSON.stringify(updatedUserCredits));
//   } catch (error) {
//     handleError(error);
//   }
// }