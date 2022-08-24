import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
	name: "video",
	inline: true,
	group: "inline",
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
				tag: "video[src]",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"video",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
		];
	},

	addCommands() {
		return {
			setVideo:
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
