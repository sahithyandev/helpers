import { Plugin } from "rollup";

import * as logger from "../src/logger";

const executeCommand = (commandString: string) => {
	logger.warn(`Executing "${commandString}"`);

	const { exec } = require("child_process");
	return new Promise((resolve, reject) => {
		exec(commandString, {}, (err, stdout, stderr) => {
			if (err || stderr) reject(new Error(err || stderr));

			resolve(stdout);
		});
	});
};

export default function generateTypes(): Plugin {
	let entries: string[] | { [entryAlias: string]: string } = [];
	let outputDir = "";

	return {
		name: "generate-types",
		outputOptions(options) {
			outputDir = options.dir ||
									options.file.split("/").slice(0, -1).join("/");
			return options;
		},
		buildStart(options) {
			entries = options.input;
		},
		generateBundle() {
			if (Array.isArray(entries)) {
				logger.log("GENERATE_TYPES");
				entries.forEach(entry => {
					executeCommand(`npm exec tsc -- -d --emitDeclarationOnly --declarationDir ${outputDir} ${entry}`);
				});
			}
		}
	};
}