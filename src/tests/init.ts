import { exec } from 'child_process';
import util from 'util';
import BaseTest from './base.js';

export default class InitTest extends BaseTest {
    async start() {
        const execP = util.promisify(exec);
        await execP("npx tet init test-npm --npm", { cwd: this.dirname + "/../../playground" })
        await execP("npx tet init test-yarn --yarn", { cwd: this.dirname + "/../../playground" })
        await execP("npx tet init test-pnpm --pnpm", { cwd: this.dirname + "/../../playground" })
    }
}