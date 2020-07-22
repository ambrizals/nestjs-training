import { jestStore } from '../config/writeFile';

export const end = () => {
  it('Ending Test', async () => {
    const deleteData: boolean = jestStore().destroyFile();
    expect(deleteData).toEqual(true);
  });
};
