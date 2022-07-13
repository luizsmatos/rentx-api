/* eslint-disable no-useless-return */
import fs from 'fs';

export async function deleteFile(filename: string): Promise<void> {
  try {
    await fs.promises.stat(filename);
    await fs.promises.unlink(filename);
    return;
  } catch (error) {
    return;
  }
}
