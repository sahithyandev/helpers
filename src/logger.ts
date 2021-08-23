/**
 * Color-coded loggers 
 */

const RESET_COLOR = "\x1b[0m";
const colorCodeStrings = (colorCodes: Record<string, number>): Record<string, string> => {
	return Object.fromEntries(
		Object.entries(colorCodes).map(([colorName, colorCode]) => {
			return [colorName, `\x1b[${colorCode}m`]
		})
	);
}

const FG_COLOR_CODES = colorCodeStrings({
	red: 91,
	yellow: 93,
	cyan: 96
});

export function error(message: any, ...optionalParams: any[]) {
	console.error(FG_COLOR_CODES.red, message, ...optionalParams, RESET_COLOR);
}

export function warn(message: any, ...optionalParams: any[]) {
	console.warn(FG_COLOR_CODES.yellow, message, ...optionalParams, RESET_COLOR);
}

export function log(message: any, ...optionalParams: any[]) {
	console.log(FG_COLOR_CODES.cyan, message, ...optionalParams, RESET_COLOR);
}