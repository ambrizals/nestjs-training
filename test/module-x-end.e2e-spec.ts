import { jestStore } from './writeFile';

describe('End Test', () => {
  it('Ending Test', async () => {
    const deleteData: boolean = jestStore().destroyFile();
    expect(deleteData).toEqual(true);
  });
});
