import { createWorker } from 'tesseract.js';

const readText = async (imgUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    createWorker('eng')
      .then((worker) => {
        worker.recognize(imgUrl).then(({ data: { text } }) => {
          resolve(text);
        }).catch((error) => {
          reject(error);
        }).finally(() => {
          worker.terminate();
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default readText;
