import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
	name: "audio",
	inline: false,
	group: "block",
	draggable: true,
	selectable: true,

	addAttributes() {
		return {
			src: {
				default: null,
			},
			controls: {
				default: true,
			},
			controlslist: {
				default: "nodownload",
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "audio[src]",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"audio",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
		];
	},

	addCommands() {
		return {
			setAudio:
				(options) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options,
					});
				},
		};
	},
});
