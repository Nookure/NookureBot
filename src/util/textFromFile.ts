import https from 'https';
import { Attachment } from 'discord.js';

const readFile = async (attachment: Attachment): Promise<string> => {
  return new Promise((resolve, reject) => {
    const url = attachment.url;
    https
      .get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

export default readFile;
