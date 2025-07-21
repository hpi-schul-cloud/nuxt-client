declare module "katex/dist/contrib/auto-render.js" {
	interface RenderMathInElementOptions {
		delimiters?: Array<{ left: string; right: string; display: boolean }>;
		ignoredTags?: string[];
		ignoredClasses?: string[];
		errorCallback?: (msg: string, err: Error) => void;
	}

	function renderMathInElement(
		element: HTMLElement,
		options?: RenderMathInElementOptions
	): void;

	export default renderMathInElement;
}
