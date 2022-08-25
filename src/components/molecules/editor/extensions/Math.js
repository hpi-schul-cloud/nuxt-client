import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";

import MathComponent from "./FormulaComponent.vue";

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
				tag: "span",
				getAttrs: (element) => {
					if (!element.hasAttribute("class")) {
						return false;
					}

					const styleClass = element.getAttribute("class");

					if (styleClass !== "math-tex") {
						return false;
					}

					return {};
				},
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["span", HTMLAttributes];
	},

	addNodeView() {
		return VueNodeViewRenderer(MathComponent);
	},
});
