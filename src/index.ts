export function debounce
	<FunctionInputType extends Array<unknown>>
	(func: (...args: FunctionInputType) => void, timeout = 300): (...args: FunctionInputType) => void {

	let timer: NodeJS.Timeout;

	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(null, args);
		}, timeout);
	}
}

export function memoize
	<FunctionInputType extends Array<unknown>>
	(func: (...args: FunctionInputType) => void): (...args: FunctionInputType) => void {

	const memory = new Map<unknown, unknown>();

	return (...args) => {
		const argsKey = (() => {
			return args.join("-");
		})();

		if (memory.has(argsKey)) {
			return memory.get(argsKey);
		} else {
			const output = func.apply(args);
			memory.set(argsKey, output);
			return output;
		}
	}
}