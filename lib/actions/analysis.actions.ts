"use server";

import { revalidatePath } from "next/cache";
import { Analysis } from "../database/models/analysis.model";
import { connectToDatabase } from "../database/mongodb";
import { Collection, ObjectId } from "mongodb";

const COLLECTION = 'analisis'

// CREATE
export async function insertAnalysis(newAnalysis: Analysis, pathname: string) {
  try {
    const db = await connectToDatabase();
    const Analysis: Collection<Analysis> = db.collection(COLLECTION)

    createIndex(Analysis, 'noIktan');

    const insertResponse = await Analysis.updateOne(
      {
        noIktan: newAnalysis.noIktan
      },
      {
        "$set": {
          name: newAnalysis.name,
          tests: newAnalysis.tests,
          code: newAnalysis.code,
          lab: newAnalysis.lab,
          noIktan: newAnalysis.noIktan,
          deliveryTime: newAnalysis.deliveryTime,
          type: newAnalysis.type,
          cost: newAnalysis.cost,
          // costUrgent: newAnalysis.costUrgent,
          costPublic: newAnalysis.costPublic,
          // costPublicUrgent: newAnalysis.costPublicUrgent,
          // addUrgentPrice: newAnalysis.addUrgentPrice,
          promo: newAnalysis.promo,
        }
      }, { upsert: true })
    console.log(insertResponse);

    revalidatePath(pathname)
    return {
      success: true,
      data: JSON.parse(JSON.stringify(insertResponse))
    }
  } catch (error: any) {
    console.log(Object.keys(error));
    console.log(error);
    return {
      success: false,
      error: error.errorResponse.errmsg
    }
  }
}

async function createIndex(collection: Collection<Analysis>, field: string) {
  try {
    const indexSpec = { [field]: 1 };
    const options = { unique: true };
    await collection.createIndex(indexSpec, options)
  } catch (error) {
    console.log(error);
  }
}

// CREATE BULK
export async function insertAnalysisBulk(newAnalysis: Analysis[], pathname: string) {
  try {
    const db = await connectToDatabase();
    const Analysis: Collection<Analysis> = db.collection(COLLECTION)

    await createIndex(Analysis, 'noIktan');

    const insertOptions = { ordered: true };

    const insertBulkResponse = await Analysis.insertMany(newAnalysis, insertOptions)
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
export async function getPerfilsCount() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);


    const Analysis = await collection.countDocuments({
      tests: { $exists: true, $ne: [] }
    });

    return {
      success: true,
      data: Analysis
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
export async function getAnalysisCount() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);


    const Analysis = await collection.countDocuments();

    return {
      success: true,
      data: Analysis
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
export async function getAllAnalysisById(path: string, id: string, fields?: object): Promise<
  {
    success: boolean,
    data?: Analysis,
    error?: string
  }> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);

    const Analysis = await collection
      .findOne<Analysis>({ _id: new ObjectId(id) })

    revalidatePath(path);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(Analysis))
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Error while getting Analysis with id ' + id
    }
  }
}

// READ
export async function getAllPerfils(path: string, page: number, resultsPerPage: number, query: string, fields?: object): Promise<Analysis[] | []> {
  try {
    if (page < 0) throw new Error('Page cant be less than 0')
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);

    const skip = query ? 0 : (page - 1) * resultsPerPage;

    const projection = fields || {};

    const Analysis = await collection
      .find<Analysis>(
        {
          name: new RegExp(query, 'i'),
          tests: { $exists: true, $ne: [] }
        }
      )
      .project(projection)
      .sort({ noIktan: 1 })
      .skip(skip)
      .limit(resultsPerPage)
      .toArray();
    revalidatePath(path);

    return JSON.parse(JSON.stringify(Analysis));
  } catch (error) {
    console.log(error);
    return []
  }
}

// READ
export async function getAllAnalysis(path: string, page: number, resultsPerPage: number, query: string, fields?: object): Promise<Analysis[] | []> {
  try {
    if (page < 0) throw new Error('Page cant be less than 0')
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);

    const skip = query ? 0 : (page - 1) * resultsPerPage;

    const projection = fields || {};

    const analysis = await collection
      .find<Analysis>(
        {
          $or: [
            { name: new RegExp(query, 'i') },
            { code: new RegExp(query, 'i') }
          ]
        }
      )
      .project(projection)
      .sort({ noIktan: 1 })
      .skip(skip)
      .limit(resultsPerPage)
      .toArray();
    revalidatePath(path);

    return JSON.parse(JSON.stringify(analysis));
  } catch (error) {
    console.log(error);
    return []
  }
}

// DELETE
export async function deleteAnalysis(ids: string[], pathname: string) {
  try {
    console.log('deleting...', ids);

    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);
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