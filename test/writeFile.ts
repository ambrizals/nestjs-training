// This file is created to stored response from client to json file on _results.
// This file is needed on test

import * as fs from 'fs';

export const jestStore = () => ({
  writeFile: (): any => {
    const data = [
      {
        status: 'ready',
      },
    ];

    const readyData = JSON.stringify(data);
    fs.writeFileSync(__dirname + '\\_results\\data.json', readyData);
    const rawData: any = fs.readFileSync(__dirname + '\\_results\\data.json');
    return rawData;
  },
  destroyFile: (): boolean => {
    fs.unlinkSync(__dirname + '\\_results\\data.json');
    return true;
  },

  readFile: (testIndex: number, keys?: string) => {
    const data: any = fs.readFileSync(__dirname + '\\_results\\data.json');
    const dataParse = JSON.parse(data);

    if (keys) {
      return dataParse[testIndex][keys];
    } else {
      return dataParse[testIndex];
    }
  },
});
