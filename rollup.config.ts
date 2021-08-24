import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

import generateTypes from "./plugins/generate-types";

export default {
	input: "src/index.ts",
	output: {
		dir: "lib",
		format: "cjs"
	},
	plugins: [
		typescript(),
		generateTypes()
	]
} as RollupOptions;