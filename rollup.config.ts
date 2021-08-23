import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/index.ts",
	output: {
		file: "lib/index.js",
		format: "esm"
	},
	plugins: [
		typescript()
	]
} as RollupOptions