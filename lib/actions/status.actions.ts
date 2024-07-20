"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongodb";
import { Collection, ObjectId } from "mongodb";
import { AnalysisStatus } from "../database/models/analysisStatus.model";

// CREATE
export async function insertAnalysisStatus(newStatus: AnalysisStatus, pathname: string) {
  try {
    const db = await connectToDatabase();
    const status: Collection<AnalysisStatus> = db.collection('analysisStatus')

    // createIndex(status, 'noIktan');

    const insertResponse = await status.updateOne(
      {
        _id: newStatus._id || new ObjectId()
      },
      {
        "$set": {
          analysis: newStatus.analysis,
          perfils: newStatus.perfils,
          user: newStatus.user,
          status: newStatus.status,
          pdfUrl: newStatus.pdfUrl,
          creationDate: newStatus.creationDate,
          completedDate: newStatus.completedDate,
          isUrgent: newStatus.isUrgent,
        }
      }, { upsert: true })
    // console.log(insertResponse);

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

// // READ
// export async function getPerfilsCount() {
//   try {
//     const db = await connectToDatabase();
//     const collection = db.collection('Analysis');


//     const Analysis = await collection.countDocuments({
//       tests: { $exists: true, $ne: [] }
//     });

//     return {
//       success: true,
//       data: Analysis
//     }
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       error: 'Error while getting count of documents' + error.toString() || error
//     }
//   }
// }
// READ
export async function getAnalysisStatusById(id: string) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analysisStatus');
    const analysisStatus = await collection.findOne<AnalysisStatus>(new ObjectId(id));

    if(!analysisStatus) throw new Error('Not found.')

    return {
      success: true,
      data: JSON.parse(JSON.stringify(analysisStatus))
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
export async function getCount() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('analysisStatus');


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
export async function getAllAnalysisStatus(path: string, page: number, resultsPerPage: number, query: string, fields?: object): Promise<AnalysisStatus[] | []> {
  try {
    if (page < 0) throw new Error('Page cant be less than 0')
    const db = await connectToDatabase();
    const collection = db.collection('analysisStatus');

    const skip = query ? 0 : (page - 1) * resultsPerPage;

    const projection = fields || {};

    const Analysis = await collection
      .find<AnalysisStatus>(
        {
          $or: [
            { 'user.name': new RegExp(query, 'i') }
          ]
        }
      )
      .project(projection)
      .sort({ creationDate: 1 })
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

// // DELETE
// export async function deleteAnalysis(ids: string[], pathname: string) {
//   try {
//     console.log('deleting...', ids);

//     const db = await connectToDatabase();
//     const collection = db.collection('Analysis');
//     const idsToDelete = stringToObjectId(ids);

//     const deleteResponse = await collection.deleteMany({ _id: { $in: idsToDelete } })
//     console.log(deleteResponse);

//     revalidatePath(pathname)

//     return {
//       success: true,
//       data: deleteResponse
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//       error: error
//     }
//   }
// }

// function stringToObjectId(ids: string[]) {
//   return ids.map(id => new ObjectId(id))
// }