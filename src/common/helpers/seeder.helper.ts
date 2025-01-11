import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'papaparse';

async function parseCsvToJSON(file: Buffer): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const csvString = file.toString();
    parse(csvString, {
      header: true,
      complete: (result) => {
        const parsedData = result.data.map((row) => ({
          ...row,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
        }));
        resolve(parsedData);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export async function readFileSeedertoJSON(fileName: string) {
  const csvFilePath = join(process.cwd(), '/src/seeder', fileName);
  try {
    const fileBuffer = await readFile(csvFilePath);
    return await parseCsvToJSON(fileBuffer);
  } catch (error) {
    console.error('Error reading file or parsing CSV:', error);
    throw error;
  }
}
