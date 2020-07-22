// This file is created to stored response from client to json file on _results.
// This file is needed on test

import * as fs from 'fs';

const helpers = () => ({
  readFileSync: async (): Promise<any> => {
    try {
      const data: any = fs.readFileSync(
        __dirname + '\\..\\_results\\data.json',
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.resolve(null);
    }
  },
});

export const jestStore = () => ({
  writeFile: (): any => {
    const data = [];

    const readyData = JSON.stringify(data);
    fs.writeFileSync(__dirname + '\\..\\_results\\data.json', readyData);
    const rawData: any = fs.readFileSync(
      __dirname + '\\..\\_results\\data.json',
    );
    return rawData;
  },
  destroyFile: (): boolean => {
    fs.unlinkSync(__dirname + '\\..\\_results\\data.json');
    return true;
  },

  readData: (testIndex: number, keys?: string): any => {
    const data: any = fs.readFileSync(__dirname + '\\..\\_results\\data.json');
    const dataParse = JSON.parse(data);

    if (keys) {
      return dataParse[testIndex][keys];
    } else {
      return dataParse[testIndex];
    }
  },

  pushData: async (data: any): Promise<any> => {
    let listData: any = [];
    const oldData: any = await helpers().readFileSync();
    if (oldData) {
      listData = JSON.parse(oldData);
      await listData.push(data);
    } else {
      await listData.push(data);
    }
    fs.writeFileSync(
      __dirname + '\\..\\_results\\data.json',
      JSON.stringify(listData),
    );
  },
});
