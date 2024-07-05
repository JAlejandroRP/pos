"use server";

import { revalidatePath } from "next/cache";

import { User } from "../database/models/user.model";
import { Analisis, AnalisisWithId } from "../database/models/analisis.model";
import { connectToDatabase } from "../database/mongodb";
import { ObjectId } from "mongodb";

// CREATE
export async function insertAnalisis(analisis: Analisis) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analisis')

    const insertResponse = await collection.insertOne(analisis)

    return JSON.parse(JSON.stringify(insertResponse));
  } catch (error) {
    console.log(error);
  }
}

// CREATE BULK
export async function insertAnalisisBulk(analisis: Analisis[]) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analisis')

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    const insertBulkResponse = await collection.insertMany(analisis, options)

    return {
      success: true,
      data: JSON.parse(JSON.stringify(insertBulkResponse))
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error
    }
  }
}

// READ
export async function getAllAnalisis(path: string): Promise<AnalisisWithId[] | []> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analisis');

    const analisis = await collection.find<AnalisisWithId>({}).toArray();
    console.log(analisis);


    revalidatePath(path);

    return JSON.parse(JSON.stringify(analisis));
  } catch (error) {
    console.log(error);
    return []
  }
}

// DELETE
export async function deleteAnalisis(ids: string[]) {
  try {
    console.log('deleting...', ids);
    
    const db = await connectToDatabase();
    const collection = db.collection('analisis');
    const idsToDelete = stringToObjectId(ids);

    const deleteResponse = await collection.deleteMany({ _id: { $in: idsToDelete } })
    console.log(deleteResponse);
    
    return {
      success: true,
      data: deleteResponse
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error
    }
  }
}

function stringToObjectId (ids:string[]) {
  return ids.map(id => new ObjectId(id))
}