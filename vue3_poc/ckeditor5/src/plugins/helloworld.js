import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import Image from "@ckeditor/ckeditor5-image/src/image.js";

//https://ckeditor.com/docs/ckeditor5/latest/framework/guides/plugins/creating-simple-plugin-timestamp.html

export default class HelloWorld extends Plugin {
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		editor.ui.componentFactory.add("helloworld", () => {
			// The button will be an instance of ButtonView.
			const button = new ButtonView();

			button.set({
				label: "Hello World",
				withText: true,
			});

			// Execute a callback function when the button is clicked.
			button.on("execute", () => {
				const imageUrl = prompt(
					"Image URL",
					"http://127.0.0.1:4000/helloworld.png"
				);

				// Change the model using the model writer.
				editor.model.change((writer) => {
					// Insert the text at the user's current position.
					editor.model.insertContent(writer.createText(imageUrl));

					const imageUtils = editor.plugins.get("ImageUtils");
					imageUtils.insertImage({ src: imageUrl });
				});
			});

			return button;
		});
	}
}
