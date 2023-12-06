import BaseModule from "./base.js"
import chalk from 'chalk';
import fs from 'fs-extra';
import { exec } from 'child_process';

export default class Init extends BaseModule {
    async start() {
        const projectName = this.str;
        if (fs.existsSync(process.cwd() + "/" + projectName)) {
            console.log(chalk.red("Directory Exist"));
            console.log(chalk.red("Delete Directory"));
            fs.removeSync(process.cwd() + "/" + projectName);
            console.log(chalk.green("Delete Directory Success"));
        }
        console.log(chalk.green("Init Template Express In Current Path"));
        fs.copySync(this.dirname + "/../source", process.cwd() + "/" + projectName, {
            filter: (src, dest) => {
                if (src.indexOf("package.json") > -1) {
                    const packageJson = fs.readJSONSync(src);
                    packageJson.name = projectName;
                    fs.writeJSONSync(dest, packageJson, { spaces: 2 });
                    return false;
                }
                if (src.indexOf("README.md") > -1) {
                    const readme = fs.readFileSync(src).toString();
                    fs.writeFileSync(dest, readme.replace(/{{name}}/g, projectName));
                    return false;
                }
                if (src.indexOf("node_modules") > -1) {
                    return false;
                }
                if (src.includes("lock")) {
                    return false;
                }
                return true;
            }
        });
        console.log(chalk.green("Init Template Express Success"));
        console.log(chalk.green(`Run ${this.requiredBin} install`));
        if (!this.options.jest) {
            fs.removeSync(process.cwd() + "/" + projectName + "/src/tests");
            fs.removeSync(process.cwd() + "/" + projectName + "/jest.config.mjs");
            const packageJson = fs.readJSONSync(process.cwd() + "/" + projectName + "/package.json");
            delete packageJson.scripts.test;
            delete packageJson.devDependencies["@types/jest"];
            delete packageJson.devDependencies.jest;
            fs.writeJSONSync(process.cwd() + "/" + projectName + "/package.json", packageJson, { spaces: 2 });
        }
        exec(`${this.requiredBin} install`, { cwd: process.cwd() + "/" + projectName }, (error, _stdout, stderr) => {
            if (error) {
                console.log(chalk.red(`Error ${this.requiredBin} install`));
                console.log(chalk.red(error.message));
                return;
            }
            if (stderr) {
                console.log(chalk.red(`Error ${this.requiredBin} install`));
                console.log(chalk.red(stderr));
                return;
            }
            console.log(chalk.green(`Success ${this.requiredBin} install`));
        });
    }
}