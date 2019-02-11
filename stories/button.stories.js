/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import buttonDoc from "../docs/storybook/myButton.md";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import MyButton from "./MyButton";

storiesOf("Example with Button", module)
	.addDecorator(withMarkdownNotes(buttonDoc))
	.add("with text", () => ({
		components: { MyButton },
		template: '<my-button @click="action">Hello Button</my-button>',
		methods: { action: action("clicked") },
	}))
	.add("with some emoji", () => ({
		components: { MyButton },
		template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
		methods: { action: action("clicked") },
	}));

/* eslint-enable react/react-in-jsx-scope */
