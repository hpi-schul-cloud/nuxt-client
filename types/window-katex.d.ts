import katex from "katex";

declare global {
	interface Window {
		katex: typeof katex;
	}
}
