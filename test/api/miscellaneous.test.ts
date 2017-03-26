//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
/* tslint:disable no-unused-variable  */
import * as vscode from 'vscode';
import * as rocketChat from '../../src/extension';
import { api } from '../../src/api/rocket-api';
/* tslint:enable */

// Defines a Mocha test suite to group tests of similar kind together
suite("API Miscellaneous", () => {
  type InfoResult = {
    info: { version: string };
    success: boolean;
  };
  // Defines a Mocha unit test
  test("/info returns information about the Rocket.Chat server", async () => {
    const result: InfoResult = await api.misc.info();
    assert(result.success);
    assert(!!result.info.version);
  });
});
