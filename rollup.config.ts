import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

import generateTypes from "./plugins/generate-types";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "lib/index.js",
			format: "cjs",
			plugins: [generateTypes()],
		},
		{
			file: "lib/index.es.js",
			format: "esm",
		},
	],
	plugins: [typescript()],
} as RollupOptions;
