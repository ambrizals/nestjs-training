import { start } from './subtest/module-start.spec';
import { users } from './subtest/module-users.spec';
import { end } from './subtest/module-end.spec';

describe('Start Test', start);
describe('Users Test', users);
describe('End Test', end);
