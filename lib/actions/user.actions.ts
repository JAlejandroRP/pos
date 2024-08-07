"use server";

import { connectToDatabase } from "../database/mongodb";
import { ObjectId } from "mongodb";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { parseClerkApiError } from "../utils";

// CREATE
export async function createClerkUser(
  user: CreateClerkUserParams
) {
  try {
    const newClerkUser = await clerkClient.users.createUser({
      firstName: user.name,
      phoneNumber: ['+52' + user.phone],
      password: process.env.CLERK_DEFAULT_PASSWORD || '@analisis321',
      privateMetadata: { role: 'client' },
      createdAt: new Date(),
    })

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newClerkUser))
    }
  } catch (error: any) {
    console.log(error);
    if (error.clerkError) {
      return {
        sucess: false,
        error: parseClerkApiError(error)
      }
    }
    throw error
  }
}

// CREATE
export async function createMongoDbUser(user: CreateMongoDbUserParams) {
  try {
    user.role = user.email === 'dev.alerp@gmail.com' ? 'admin' : 'client';
    const db = await connectToDatabase();
    const collection = db.collection('users')

    collection.insertOne(user)

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

//READ
export async function getUserByClerkId(userClerkId: string) {
  try {
    const db = await connectToDatabase();

    const user = await db.collection('users').findOne({ clerkId: userClerkId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByMongoId(userId: string) {
  try {
    const db = await connectToDatabase();

    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCustomersMongoDb() {
  try {
    const db = await connectToDatabase();

    const users = await db.collection('users').find({ role: "client" }).toArray();

    if (!users) return []

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

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