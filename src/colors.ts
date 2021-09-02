import { transformValues } from "./functions";

const RESET_COLOR = "\x1b[0m";

const FG_COLOR_CODES = {
	red: "91",
	yellow: "93",
	cyan: "96",
};

const colors = transformValues(FG_COLOR_CODES, colorCode => {
	return (...msg: string[]): string => {
		return [`\x1b[${colorCode}m`, msg.join(" "), RESET_COLOR].join("");
	};
});

export default colors;