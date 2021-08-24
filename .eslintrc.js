module.exports = {
	env: {
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint"
	],
	rules: {
		indent: [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-trailing-spaces": "error",
		"prefer-spread": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off"
	}
};