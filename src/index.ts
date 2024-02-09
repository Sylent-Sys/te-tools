#!/usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Init from './module/init.js';
const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
program.name("Template Express")
    .description("Tools to init my template")
    .version("1.0.0");
program.command('init')
    .description("Init Template Express In Current Path")
    .argument("<string>", "Project Name")
    .option("-nvt, --no-vitest", 'init without vitest')
    .option("--npm", 'init with npm')
    .option("--pnpm", 'init with pnpm')
    .option("--yarn", 'init with yarn')
    .action(async (str, options) => {
        const requiredBin = options.npm ? "npm" : options.pnpm ? "pnpm" : options.yarn ? "yarn" : "pnpm";
        await new Init(str, options, __dirname).compatibility(["pnpm", "npm", "yarn"], requiredBin);
    });
program.parse();