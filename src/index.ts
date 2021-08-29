/**
 * General debounce function.
 *
 * Delays invoking a function until after `timeout` milliseconds have elapsed since the last time the debounced function called
 */
export function debounce<FunctionInputType extends Array<unknown>>
(func: (...args: FunctionInputType) => void, timeout = 300): (...args: FunctionInputType) => void {

	let timer: NodeJS.Timeout;

	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(null, args);
		}, timeout);
	};
}

/**
 * General memoize function.
 *
 * Returns a memoized version of the given function
 *
 * See https://en.wikipedia.org/wiki/Memoization to learn more
 */
export function memoize<FunctionInputType extends Array<unknown>>
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
	};
}

/**
 * Applies a function to all keys in the given object and returns the new object
 */
export function transformKeys<ObjectValueType = unknown>(obj: Record<string, ObjectValueType>, transformFunction: (key: string) => string): Record<string, ObjectValueType> {

	return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
		return [transformFunction(key), value];
	}));
}

/**
 * Same as {@link transformKeys} but for values
 */
export function transformValues<OldValueType = unknown, NewValueType = unknown>(obj: Record<string, OldValueType>, transformFunction: (value: OldValueType) => NewValueType): Record<string, NewValueType> {
	return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
		return [key, transformFunction(value)];
	}));
}

export * as logger from "./logger";