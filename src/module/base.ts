import hasbin from 'hasbin';
import { exec } from 'child_process';
import chalk from 'chalk';
export default class BaseModule {
    str: any;
    options: any;
    dirname: string;
    requiredBin: string = "";
    constructor(str: any, options: any, dirname: string) {
        this.str = str;
        this.options = options;
        this.dirname = dirname;
    }
    async compatibility(bin: string[], requiredBin: string) {
        this.requiredBin = requiredBin;
        if (hasbin.all.sync(bin)) {
            await this.start();
        } else {
            console.log(chalk.green("Enable corepack"));
            exec("corepack enable", async (error, _stdout, stderr) => {
                if (error) {
                    console.log(chalk.red("Error corepack enable"));
                    console.log(chalk.red(error.message));
                    return;
                }
                if (stderr) {
                    console.log(chalk.red("Error corepack enable"));
                    console.log(chalk.red(stderr));
                    return;
                }
                console.log(chalk.green("Success corepack enable"));
                await this.start();
            });
        }
    }
    async start() {
        throw new Error("Method not implemented.");
    }
}