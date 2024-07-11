"use server";

import { revalidatePath } from "next/cache";
import { Analisis, AnalisisWithId } from "../database/models/analisis.model";
import { connectToDatabase } from "../database/mongodb";
import { Collection, ObjectId } from "mongodb";

// CREATE
export async function insertAnalisis(newAnalisis: Analisis, pathname: string) {
  try {
    const db = await connectToDatabase();
    const analisis: Collection<Analisis> = db.collection('analisis')

    createIndex(analisis, 'noIktan');
    const insertResponse = await analisis.insertOne(newAnalisis)
    console.log(insertResponse);

    revalidatePath(pathname)

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
    const indexSpec = { [field]: 1 };
    const options = { unique: true };
    await collection.createIndex(indexSpec, options)
  } catch (error) {
    console.log(error);
  }
}

// CREATE BULK
export async function insertAnalisisBulk(newAnalisis: Analisis[], pathname: string) {
  try {
    const db = await connectToDatabase();
    const analisis: Collection<Analisis> = db.collection('analisis')

    await createIndex(analisis, 'noIktan');

    const insertOptions = { ordered: true };

    const insertBulkResponse = await analisis.insertMany(newAnalisis, insertOptions)
    revalidatePath(pathname)
    return {
      success: true,
      data: JSON.parse(JSON.stringify(insertBulkResponse))
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.errorResponse.message
    }
  }
}

// READ
export async function getAnalisisCount() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analisis');


    const analisis = await collection.countDocuments();

    return {
      success: true,
      data: analisis
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
export async function getAllAnalisisById(path: string, id: string, fields?: object): Promise<
  {
    success: boolean,
    data?: AnalisisWithId,
    error?: string
  }> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analisis');

    const analisis = await collection
      .findOne<AnalisisWithId>({ _id: new ObjectId(id) })

    revalidatePath(path);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(analisis))
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Error while getting analisis with id ' + id
    }
  }
}

// READ
export async function getAllAnalisis(path: string, page: number, resultsPerPage: number, query: string, fields?: object): Promise<AnalisisWithId[] | []> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analisis');

    const skip = query ? 0 : page * resultsPerPage;

    const projection = fields || {};

    const analisis = await collection
      .find<AnalisisWithId>(
        { name: new RegExp(query, 'i') }
      )
      .project(projection)
      .sort({ noIktan: 1 })
      .skip(skip)
      .limit(resultsPerPage)
      .toArray();
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