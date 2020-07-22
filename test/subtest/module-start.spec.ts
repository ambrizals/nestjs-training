import { jestStore } from '../config/writeFile';
import { LoginAuth } from '../auth/login';
import * as puppeteer from 'puppeteer';
import { testConfig } from '../config';
import { HttpStatus } from '@nestjs/common';

const mock = [];

export const start = () => {
  let token: string;
  let browser: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('Initialize Test', async () => {
    const data = await jestStore().writeFile();
    expect(JSON.parse(data)).toEqual(mock);
  });

  it('Create authentication token', async () => {
    const login = new LoginAuth();
    token = await login.postLogin();
    jestStore().pushData({ token });
  });

  it('Check authentication has stored', async () => {
    const data = jestStore().readData(0, 'token');
    expect(data).toEqual(token);
  });

  it('Check authentication token is valid on server', async () => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest: any) => {
      interceptedRequest.continue({
        method: 'GET',
        headers: {
          ...interceptedRequest.headers(),
          Authorization: 'Bearer ' + token,
        },
      });
    });
    const response = await page.goto(testConfig.baseURL + 'auth/profile');
    expect(response.status()).toEqual(HttpStatus.OK);
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });
};
