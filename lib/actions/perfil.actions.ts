"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongodb";
import { Collection, ObjectId } from "mongodb";
import { AnalysisStatus } from "../database/models/analysisStatus.model";
import { Perfil } from "../database/models/perfil.model";
import { User } from "../database/models/user.model";

const COLLECTION = 'perfils'

// CREATE
export async function insertPerfil(perfil: Perfil, pathname: string) {
  try {
    const db = await connectToDatabase();
    const status: Collection<Perfil> = db.collection(COLLECTION)

    // createIndex(status, 'noIktan');

    const insertResponse = await status.updateOne(
      {
        _id: perfil._id || new ObjectId()
      },
      {
        "$set": {
          name: perfil.name,
          user: perfil.user,
          analysis: perfil.analysis,
          customCost: perfil.customCost,
          total: perfil.total,
          // user: perfil.user,
          // status: perfil.status,
          // pdfUrl: perfil.pdfUrl,
          // creationDate: perfil.creationDate,
          // completedDate: perfil.completedDate,
          // isUrgent: perfil.isUrgent,
          // isParticular: perfil.isParticular
        }
      }, { upsert: true })
    // console.log(insertResponse);



    revalidatePath(pathname)
    return {
      success: true,
      data: JSON.parse(JSON.stringify({ ...insertResponse, _id: insertResponse.upsertedId })) as Perfil
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

async function createIndex(collection: Collection<AnalysisStatus>, field: string) {
  try {
    const indexSpec = { [field]: 1 };
    const options = { unique: true };
    await collection.createIndex(indexSpec, options)
  } catch (error) {
    console.log(error);
  }
}

// // CREATE BULK
// export async function insertAnalysisBulk(newAnalysis: Analysis[], pathname: string) {
//   try {
//     const db = await connectToDatabase();
//     const Analysis: Collection<Analysis> = db.collection('Analysis')

//     await createIndex(Analysis, 'noIktan');

//     const insertOptions = { ordered: true };

//     const insertBulkResponse = await Analysis.insertMany(newAnalysis, insertOptions)
//     revalidatePath(pathname)
//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(insertBulkResponse))
//     }
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       error: error.errorResponse.message
//     }
//   }
// }


// READ
export async function getPerfilById(id: string) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);
    const perfil = await collection.findOne<Perfil>(new ObjectId(id));

    if (!perfil) throw new Error('Not found.')

    return {
      success: true,
      data: JSON.parse(JSON.stringify(perfil)) as Perfil
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: 'Error while getting document' + error.toString() || error
    }
  }
}

// READ
export async function getPerfilsCount() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);


    const count = await collection.countDocuments();

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
// // READ
// export async function getAllParticulars(path: string, page: number, resultsPerPage: number, query: string, fields?: object): Promise<AnalysisStatus[] | []> {
//   try {
//     if (page < 0) throw new Error('Page cant be less than 0')
//     const db = await connectToDatabase();
//     const collection = db.collection('analysisStatus');

//     const skip = query ? 0 : (page - 1) * resultsPerPage;

//     const projection = fields || {};

//     const Analysis = await collection
//       .find<AnalysisStatus>(
//         {
//           $and: [
//             // { 'user.name': new RegExp(query, 'i') },
//             { isParticular: { $eq: true } },
//           ]
//         }
//       )
//       .project(projection)
//       .sort({ creationDate: 1 })
//       .skip(skip)
//       .limit(resultsPerPage)
//       .toArray();

//     revalidatePath(path);

//     return JSON.parse(JSON.stringify(Analysis));
//   } catch (error) {
//     console.log(error);
//     return []
//   }
// }

// READ
export async function getAllPerfils(path: string, page: number, resultsPerPage: number, query: string, fields?: object): Promise<Perfil[] | []> {
  try {
    if (page < 0) throw new Error('Page cant be less than 0')
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);

    const skip = query ? 0 : (page - 1) * resultsPerPage;

    const projection = fields || {};

    const perfils = await collection
      .find<Perfil>(
        {
          $and: [
            { 'name': new RegExp(query, 'i') },
          ]
        }
      )
      .project(projection)
      .sort({ creationDate: 1 })
      .skip(skip)
      .limit(resultsPerPage)
      .toArray();

    revalidatePath(path);

    return JSON.parse(JSON.stringify(perfils));
  } catch (error) {
    console.log(error);
    return []
  }
}

// DELETE
export async function deletePerfil(id: ObjectId, pathname: string) {
  try {
    // console.log('deleting...', ids);

    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);
    // const idsToDelete = stringToObjectId(ids);

    // const deleteResponse = await collection.deleteMany({ _id: { $in: idsToDelete } })
    const deleteResponse = await collection.deleteOne({ _id: new ObjectId(id) })
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

// function stringToObjectId(ids: string[]) {
//   return ids.map(id => new ObjectId(id))
// }