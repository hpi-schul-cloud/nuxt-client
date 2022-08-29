import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";

import MathNodeView from "../components/MathNodeView";

export default Node.create({
	name: "math",
	group: "inline",
	inline: true,

	addAttributes() {
		return {
			class: {
				default: null,
			},
			formula: {
				default: "",
				parseHTML: (element) => {
					return element.innerHTML;
				},
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "span[class='math-tex']",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["span", HTMLAttributes];
	},

	addNodeView() {
		return VueNodeViewRenderer(MathNodeView);
	},

	addCommands() {
		return {
			addMath:
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
