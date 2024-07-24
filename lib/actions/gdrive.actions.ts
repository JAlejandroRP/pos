'use server'
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth'
import { Readable, Stream } from "node:stream"

// const {authenticate} = require('@google-cloud/local-auth');

import fs from 'fs';
import path from 'path';
import { AnalysisStatus } from '../database/models/analysisStatus.model';

// Ruta al archivo JSON de la clave de la cuenta de servicio
const CREDENTIALS_PATH = '/home/alerp/git/personal/pos/credentials.json'
const TOKEN_PATH = '/home/alerp/git/personal/pos/api.json'
const apikeys = require('/home/alerp/git/personal/pos/api.json')
const SCOPES = ['https://www.googleapis.com/auth/drive']



/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function auth() {
  try {
    const credentials = JSON.parse(JSON.stringify(api));
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: SCOPES,
      projectId: credentials.project_id,
    });
    return auth;

  } catch (err) {
    return null;
  }
}

const uploadFile = async ({
  client, content, fileName }: {
    client: any, content: any, fileName: string
  }) => {
  const fileMetadata = {
    name: fileName,
    parents: ["1-C_64AdRyXCpcZp7fiExxWMxcLFPgDrw"],
  };

  const driveService = google.drive({ version: "v3", auth: client });

  // const listfiles = await driveService.files.list({
  //   q: `'${fileMetadata.parents}' in parents and trashed=false`
  // })

  // console.log(listfiles.data);
  console.log('uploading, ', typeof content)
  console.log(typeof content)

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType: "application/pdf",
      body: content
    },
    fields: "id",
  });
  console.log("res : ", response.data);
  return { docId: response.data.id, success: true }

}

export const listFiles = async () => {
  const client: any = await auth()
  const driveService = google.drive({ version: "v3", auth: client });

  const response = await driveService.files.list()

  console.log(response.data);
  

}

const createFolder = async (client: any) => {
  const driveService = google.drive({ version: "v3", auth: client });

}

export const uploadPdf = async (fileName: string, content: FormData) => {
  const client: any = await auth()
  const fileBuffer: any = content.get('file')

  const fileMetadata = {
    name: fileName,
    parents: ["1-C_64AdRyXCpcZp7fiExxWMxcLFPgDrw"],
  };

  const driveService = google.drive({ version: "v3", auth: client });
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType: "application/pdf",
      body: Readable.from(fileBuffer.stream())
    },
    fields: "id",
  });
  console.log("res : ", response.data);
  return { docId: response.data.id, success: true }
}

export const uploadAnalysisStatus = async (status: AnalysisStatus, content: (string | Readable)) => {
  const client: any = await auth()

  await uploadFile({
    client,
    content,
    fileName: `${status._id}.pdf`
  })
}