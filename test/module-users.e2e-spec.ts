import * as puppeteer from 'puppeteer';
import { testConfig } from './config';
import { LoginAuth } from './auth/login';
import { HttpStatus } from '@nestjs/common';

describe('User module test', () => {
  let browser;
  let token: string;

  beforeAll(async () => {
    const login = new LoginAuth();
    token = await login.postLogin();
    browser = await puppeteer.launch();
  });

  it('Access User List', async () => {
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
    const response = await page.goto(testConfig.baseURL + 'users');
    expect(response.status()).toEqual(HttpStatus.OK);
  });

  afterAll(async () => {
    await browser.close();
  });
});
