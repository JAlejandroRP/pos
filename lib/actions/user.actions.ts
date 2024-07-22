"use server";
import { auth } from "@clerk/nextjs/server"
import { connectToDatabase } from "../database/mongodb";
import { InsertOneResult, ObjectId } from "mongodb";
import { parseClerkApiError } from "../utils";
import { clerkClient } from "@clerk/nextjs/server";
import { User } from "../database/models/user.model";
import { revalidatePath } from "next/cache";

const COLLECTION = 'users'

// CREATE
export async function createClerkUser(
  user: User
) {
  try {
    const newClerkUser = await clerkClient.users.createUser({
      firstName: user.name,
      phoneNumber: ['+52' + user.phone],
      password: process.env.CLERK_DEFAULT_PASSWORD || '@Analysis321',
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
export async function createMongoDbUser(user: User) {
  try {
    user.role = user.email === 'dev.alerp@gmail.com' ? 'admin' : 'client';
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION)

    const insertedUser: InsertOneResult = await collection.insertOne(user)

    return {
      success: true,
      data: JSON.parse(JSON.stringify(insertedUser)) as InsertOneResult
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Could not create user'
    }
  }
}

//READ
export async function getUserByClerkId(userClerkId: string) {
  try {
    const db = await connectToDatabase();

    const user = await db.collection(COLLECTION).findOne({ clerkId: userClerkId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByMongoId(userId: string) {
  try {
    const db = await connectToDatabase();

    const user = await db.collection(COLLECTION).findOne({ _id: new ObjectId(userId) });

    if (!user) throw new Error("User not found");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)) as User
    }
  } catch (error) {
    return {
      success: false,
      error: 'Error while getting user from mongo'
    }
  }
}

export async function getPacients(path: string, page: number, resultsPerPage: number, query: string, fields?: object) {
  try {
    if (page < 0) throw new Error('Page cant be less than 0')
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);

    const skip = query ? 0 : (page - 1) * resultsPerPage;

    const projection = fields || {};

    const users = await collection
      .find<User>(
        {
          $and: [
            { name: new RegExp(query, 'i') },
            { isParticular: false }
          ]
        }
      )
      .project(projection)
      .sort({ noIktan: 1 })
      .skip(skip)
      .limit(resultsPerPage)
      .toArray();

    revalidatePath(path);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)) as User[]
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Could not get users'
    }
  }
}

// READ
export async function getParticulars(path: string, page: number, resultsPerPage: number, query: string, fields?: object) {
  try {
    if (page < 0) throw new Error('Page cant be less than 0')
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);

    const skip = query ? 0 : (page - 1) * resultsPerPage;

    const projection = fields || {};

    const users = await collection
      .find<User>(
        {
          $and: [
            { name: new RegExp(query, 'i') },
            { isParticular: true }
          ]
        }
      )
      .project(projection)
      .sort({ noIktan: 1 })
      .skip(skip)
      .limit(resultsPerPage)
      .toArray();

    revalidatePath(path);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)) as User[]
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Could not get users'
    }
  }
}

// READ
export async function getParticularsCount() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);


    const count = await collection.countDocuments({ isParticular: true });

    return {
      success: true,
      data: count
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: 'Error while getting count of documents' + error.toString() || error
    }
  }
}

// READ
export async function getPatientsCount() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);


    const count = await collection.countDocuments({ isParticular: false });

    return {
      success: true,
      data: count
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: 'Error while getting count of documents' + error.toString() || error
    }
  }
}

export async function getAllCustomersMongoDb() {
  try {
    const db = await connectToDatabase();

    const users = await db.collection(COLLECTION).find().toArray();

    if (!users) return []

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export async function getClerkCurrentUser() {
  try {
    const { userId } = auth();
    // console.log(userId);

    if (!userId) return {
      success: false,
      error: 'Error while getting userClerkId'
    };

    const user = await getUserByClerkId(userId);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user))
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'User not found'
    }
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