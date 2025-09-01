declare module "@hpi-schul-cloud/ckeditor" {
	import { Editor } from "@ckeditor/ckeditor5-core";

	interface CKEditorConstructor {
		create(...args: unknown[]): Promise<unknown>;
	}

	export class ClassicEditor extends Editor implements CKEditorConstructor {
		static create(...args: unknown[]): Promise<ClassicEditor>;
	}
	export class InlineEditor extends Editor implements CKEditorConstructor {
		static create(...args: unknown[]): Promise<InlineEditor>;
	}
}
