import Vue, { VNode } from "vue";

declare global {
	namespace JSX {
		interface Element extends VNode {}
		interface ElementClass extends Vue {}
		interface IntrinsicElements {
			[elem: string]: any;
		}
	}

	/**
	 * See: https://stackoverflow.com/questions/69485778/new-typescript-version-does-not-include-window-navigator-mssaveblob?noredirect=1&lq=1
	 */
	interface Navigator {
		msSaveBlob: (blob: Blob, fileName: string) => boolean;
	}
}
