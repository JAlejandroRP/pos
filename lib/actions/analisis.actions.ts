"use server";

import { revalidatePath } from "next/cache";

import { User } from "../database/models/user.model";
import { Analisis, AnalisisWithId } from "../database/models/analisis.model";
import { connectToDatabase } from "../database/mongodb";
import { Collection, ObjectId } from "mongodb";

async function createUniqueIndex(field: string, collection: Collection<Document>) {
  try {

    const indexSpec = { field: 1 };
    const options = { unique: true };

    // Crea el índice único
    const result = await collection.createIndex(indexSpec, options);
  } catch (error) {
    console.log(error);
  }
}

// CREATE
export async function insertAnalisis(newAnalisis: Analisis) {
  try {
    const db = await connectToDatabase();
    const analisis:Collection<Analisis> = db.collection('analisis')

    createIndex(analisis, 'noIktan');
    // console.log('indice?');
    // console.log(await analisis.indexExists('noIktan'))
    // console.log(await analisis.listIndexes().toArray());

    // if (!(await analisis.indexExists('noIktan'))) {
    // const indexSpec = { 'noIktan': 1 };
    // const options = { unique: true };
    // const result = await analisis.createIndex(indexSpec, options);
    // }


    const insertResponse = await analisis.insertOne(newAnalisis)
    console.log(insertResponse);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(insertResponse))
    }
  } catch (error: any) {
    // console.log(Object.keys(error));
    // console.log(error.errorResponse.errmsg);
    return {
      success: false,
      error: error.errorResponse.errmsg
    }
  }
}

async function createIndex(collection: Collection<Analisis>, field: string) {
  try {
    const indexSpec = { field: 1 };
    const options = { unique: true };
    await collection.createIndex(indexSpec, options)
  } catch (error) {
    console.log(error);
  }
}

// CREATE BULK
export async function insertAnalisisBulk(newAnalisis: Analisis[]) {
  try {
    const db = await connectToDatabase();
    const analisis = db.collection('analisis')

    if (!(await analisis.indexExists('noIktan'))) {
      const indexSpec = { 'noIktan': 1 };
      const options = { unique: true };
      const result = await analisis.createIndex(indexSpec, options);
    }
    // this option prevents additional documents from being inserted if one fails
    const insertOptions = { ordered: true };

    const insertBulkResponse = await analisis.insertMany(newAnalisis, insertOptions)

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
export async function deleteAnalisis(ids: string[], pathname: string) {
  try {
    console.log('deleting...', ids);

    const db = await connectToDatabase();
    const collection = db.collection('analisis');
    const idsToDelete = stringToObjectId(ids);

    const deleteResponse = await collection.deleteMany({ _id: { $in: idsToDelete } })
    console.log(deleteResponse);

    revalidatePath(pathname)

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

function stringToObjectId(ids: string[]) {
  return ids.map(id => new ObjectId(id))
}