import { transformValues } from "./functions";

const RESET_COLOR = "\x1b[0m";

type FG_COLOR = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan";

const FG_COLOR_CODES: Record<FG_COLOR, string> = {
	red: "91",
	green: "92",
	yellow: "93",
	blue: "94",
	magenta: "95",
	cyan: "96",
};

const colors = transformValues(FG_COLOR_CODES, (colorCode) => {
	return (...msg: string[]): string => {
		return [`\x1b[${colorCode}m`, msg.join(" "), RESET_COLOR].join("");
	};
});

export default colors;
