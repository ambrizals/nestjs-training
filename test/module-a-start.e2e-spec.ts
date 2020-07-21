import { jestStore } from './writeFile';

const mock = [
  {
    status: 'ready',
  },
];

describe('Start Test', () => {
  it('Initialize Test', async () => {
    const data = await jestStore().writeFile();
    expect(JSON.parse(data)).toEqual(mock);
  });
});
