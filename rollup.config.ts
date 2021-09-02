import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

import generateTypes from "./plugins/generate-types";

export default [
	{
		file: "lib/index.js",
		format: "cjs",
	},
	{
		file: "lib/index.es.js",
		format: "esm",
	},
].map(
	(config) =>
		({
			input: "src/index.ts",
			output: {
				file: config.file,
				format: config.format,
			},
			plugins: [typescript(), config.format === "cjs" ? generateTypes() : null],
		} as RollupOptions)
);
