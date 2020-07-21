import * as puppeteer from 'puppeteer';
import { testConfig } from '../config';
import { authSchema } from './schema';

export class LoginAuth {
  async postLogin(): Promise<string> {
    const login = await puppeteer.launch();
    const loginPage = await login.newPage();
    await loginPage.setRequestInterception(true);
    loginPage.on('request', (interceptedRequest: any) => {
      interceptedRequest.continue({
        method: 'POST',
        // postData: "foo=FOO&bar=BAR",
        postData: authSchema(),
        headers: {
          ...interceptedRequest.headers(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });

    // Navigate, trigger the intercept, and resolve the response
    const response = await loginPage.goto(testConfig.baseURL + 'auth');
    const responseBody: any = await response.json();
    await login.close();
    return responseBody.response.payload;
  }
}
