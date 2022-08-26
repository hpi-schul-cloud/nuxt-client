import { Mark, mergeAttributes } from "@tiptap/core";

export default Mark.create({
	name: "span",
	inline: true,
	group: "inline",
	draggable: true,
	selectable: true,

	addAttributes() {
		return {
			class: {
				default: null,
			},
			style: {
				default: true,
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "span",
				getAttrs: (element) => {
					if (!element.hasAttribute("class")) {
						return {};
					}

					const styleClass = element.getAttribute("class");

					if (styleClass === "math-tex") {
						return false;
					}

					return {};
				},
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"span",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
		];
	},

	addCommands() {},
});
