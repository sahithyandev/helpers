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
