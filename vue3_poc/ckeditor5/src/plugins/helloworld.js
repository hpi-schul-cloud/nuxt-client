import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

//https://ckeditor.com/docs/ckeditor5/latest/framework/guides/plugins/creating-simple-plugin-timestamp.html

export default class HelloWorld extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add("helloworld", () => {
			// The button will be an instance of ButtonView.
			const button = new ButtonView();

			button.set({
				label: "Hello World",
				withText: true,
			});

			// Execute a callback function when the button is clicked.
			button.on("execute", () => {
				// Change the model using the model writer.
				editor.model.change((writer) => {
					// Insert the text at the user's current position.
					editor.model.insertContent(writer.createText("Hallo Dataport"));
				});
			});

			return button;
		});
	}
}
