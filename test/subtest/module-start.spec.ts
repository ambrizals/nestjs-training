import { jestStore } from '../config/writeFile';
import { LoginAuth } from '../auth/login';

const mock = [];

export const start = () => {
  let token: string;
  it('Initialize Test', async () => {
    const data = await jestStore().writeFile();
    expect(JSON.parse(data)).toEqual(mock);
  });

  it('Create authentication token', async () => {
    const login = new LoginAuth();
    token = await login.postLogin();
    jestStore().pushData({ token });
  });

  it('Check authentication valid', async () => {
    const data = jestStore().readData(0, 'token');
    expect(data).toEqual(token);
  });
};
