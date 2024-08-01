'use server'
import { google } from 'googleapis';
import { Readable } from "node:stream"
import { AnalysisStatus } from '../database/models/analysisStatus.model';

const SCOPES = ['https://www.googleapis.com/auth/drive']
// https://www.googleapis.com/auth/gmail.send'];
// https://www.googleapis.com/auth/gmail.send


const api = JSON.parse(process.env.NEXT_PUBLIC_GDRIVE_CLIENT_JSON!)
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

async function authGmail() {
  try {
    const clientId = process.env.GMAIL_CLIENT_ID || ''
    const clientSecret = process.env.GMAIL_CLIENT_SECRET || ''
    const apiKey = process.env.GMAIL_API_KEY || ''
    const auth = new google.auth.OAuth2({
      clientId,
      clientSecret,
      redirectUri: 'http://localhost:3000'
    })

    const authUrl = auth.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    console.log('Authorize this app by visiting this url:', authUrl);

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

export const deleteFile = async (fileId: string) => {
  const client: any = await auth()
  const driveService = google.drive({ version: "v3", auth: client });

  const response = await driveService.files.delete({ fileId: fileId })
}

export const getFile = async (fileId: string) => {
  try {
    const client: any = await auth();
    const driveService = google.drive({ version: "v3", auth: client });

    const response = await driveService.files.get({
      fileId,
      alt: 'media',
    }, {
      responseType: 'stream'
    });



    if (!response.data) {
      // Handle missing file or error gracefully
      throw new Error('File not found or error occurred');
    }

    const chunks: Uint8Array[] = []; // Array to store file chunks

    // Use a promise to wait for the stream to end
    let blob
    await new Promise((resolve, reject) => {
      response.data.on('data', (chunk) => {
        chunks.push(chunk);
      });

      response.data.on('error', (error) => {
        reject(new Error(`Error reading file: ${error.message}`));
      });

      response.data.on('end', () => {
        // Combine chunks into a single buffer
        const buffer = Buffer.concat(chunks);

        // Append the buffer to FormData using a meaningful filename
        blob = new Blob([buffer], { type: 'application/pdf' }); // Adjust type as needed
        resolve(blob);
      });
    });
    //  console.log('formdata server', formData);

    // return formData as FormData;
    // console.log('data server',response.data.read().toString('base64'));

    // console.log(response.data._read);
    // const fl = new FileReader()

    return await (blob! as Blob).text();
    return;
    // return JSON.parse(JSON.stringify(formData));
  } catch (error) {
    // Handle errors during authentication, Google Drive operations, etc.
    console.error('Error fetching file:', error);
    return null; // Or throw a custom error for better handling upstream
  }
};


export const listFiles = async (): Promise<string[]> => {
  const client: any = await auth()
  const driveService = google.drive({ version: "v3", auth: client });
  const response = await driveService.files.list({ fields: '' })
  console.log(response.data);

  if (response.data.files) {
    return response.data.files.map(file => String(file.id))
  }
  return []
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

export const sentEmail = async () => {
  console.log('sending email..');
  const client: any = await auth()
  const gmailService = google.gmail({ version: "v1", auth: client });

  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = '🤘 Hello 🤘';
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    'From: Justin Beckwith <beckwith@google.com>',
    'To: madafakar988@gmail.com',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    'This is a message just to say hello.',
    'So... <b>Hello!</b>  🤘❤️😎',
  ];
  const message = messageParts.join('\n');

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmailService.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });

  console.log(res);

}

