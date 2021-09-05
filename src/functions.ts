/**
 * General debounce function.
 *
 * Delays invoking a function until after `timeout` milliseconds have elapsed since the last time the debounced function called
 */
export function debounce<FunctionInputType extends Array<unknown>>(
	func: (...args: FunctionInputType) => void,
	timeout = 300
): (...args: FunctionInputType) => void {
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
export function memoize<FunctionInputType extends Array<unknown>>(
	func: (...args: FunctionInputType) => void
): (...args: FunctionInputType) => void {
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
export function transformKeys<
	OldKeyType extends string = string,
	NewKeyType extends string = string,
	ValueType = unknown
>(
	obj: Record<OldKeyType, ValueType>,
	transformFunction: (key: OldKeyType) => NewKeyType
): Record<NewKeyType, ValueType> {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => {
			return [transformFunction(key as OldKeyType), value];
		})
	) as Record<NewKeyType, ValueType>;
}

/**
 * Same as {@link transformKeys} but for values
 */
export function transformValues<
	OldValueType = unknown,
	NewValueType = unknown,
	KeyType extends string = string
>(
	obj: Record<KeyType, OldValueType>,
	transformFunction: (value: OldValueType) => NewValueType
): Record<KeyType, NewValueType> {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => {
			return [key as KeyType, transformFunction(value as OldValueType)];
		})
	) as Record<KeyType, NewValueType>;
}

/**
 * Takes a list of functions as arguments, and returns a function which combines those functions. The output of each function will be passed down to the next, and the last function's output will be returned.
 *
 * Note that the output is an Array
 *
 * @example pipe(x => x + 1, y => y ** 2)(10) ===> [121] // (10 + 1) ** 2
 */
export function pipe<
	InputType extends Array<unknown> = unknown[],
	OutputType extends Array<unknown> = unknown[]
>(...fnArr: ((...args) => unknown)[]) {
	return (...args: InputType) => {
		return fnArr.reduce((prevResult: InputType | unknown[], currentFn) => {
			return [currentFn.apply(null, prevResult)];
		}, args) as unknown as OutputType;
	};
}
