import * as puppeteer from 'puppeteer';
import { testConfig } from './config';
import { LoginAuth } from './auth/login';
import { HttpStatus } from '@nestjs/common';
import { usersSchema } from './schema/module-users';

describe('User module test', () => {
  let browser;
  let token: string;
  let currentPayload: any;

  beforeAll(async () => {
    const login = new LoginAuth();
    token = await login.postLogin();
    browser = await puppeteer.launch();
  });

  it('Unauthorized Access Test', async () => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest: any) => {
      interceptedRequest.continue({
        method: 'GET',
        headers: {
          ...interceptedRequest.headers(),
        },
      });
    });
    const response = await page.goto(testConfig.baseURL + 'users');
    expect(response.status()).toEqual(HttpStatus.UNAUTHORIZED);
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
    await page.close();
  });

  it('Creating New User', async () => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (interceptedRequest: any) => {
      interceptedRequest.continue({
        method: 'POST',
        postData: usersSchema().createData,
        headers: {
          ...interceptedRequest.headers(),
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });
    const res = await page.goto(testConfig.baseURL + 'users');
    const dataRes = await res.json();
    currentPayload = await dataRes.response.payload;
    expect(dataRes.statusCode).toEqual(HttpStatus.OK);
    expect(currentPayload).not.toBeNull();
  });

  it('Updating User Data', async () => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest: any) => {
      interceptedRequest.continue({
        method: 'PUT',
        postData: usersSchema().updateData,
        headers: {
          ...interceptedRequest.headers(),
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });
    const res = await page.goto(
      testConfig.baseURL + 'users/' + currentPayload.id,
    );
    const dataRes = await res.json();
    expect(dataRes.statusCode).toEqual(HttpStatus.OK);
  });

  it('Updating User Status', async () => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest: any) => {
      interceptedRequest.continue({
        method: 'PUT',
        headers: {
          ...interceptedRequest.headers(),
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });
    const res = await page.goto(
      testConfig.baseURL + 'users/' + currentPayload.id + '/status',
    );
    const dataRes = await res.json();
    expect(dataRes.statusCode).toEqual(HttpStatus.OK);
  });

  it('Remove User', async () => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest: any) => {
      interceptedRequest.continue({
        method: 'DELETE',
        headers: {
          ...interceptedRequest.headers(),
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });
    const res = await page.goto(
      testConfig.baseURL + 'users/' + currentPayload.id,
    );
    const dataRes = await res.json();
    expect(dataRes.statusCode).toEqual(HttpStatus.OK);
  });

  afterAll(async () => {
    await browser.close();
  });
});
