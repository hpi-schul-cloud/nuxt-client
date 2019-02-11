import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import baseDoc from "../docs/components/base.md";

import BaseButton from "../src/components/ui/BaseButton.vue";
import BaseCard from "../src/components/ui/BaseCard.vue";
import BaseIcon from "../src/components/ui/BaseIcon.vue";
import BaseInput from "../src/components/ui/BaseInput.vue";
import BaseLink from "../src/components/ui/BaseLink.vue";

storiesOf("Base Components", module)
	.addDecorator(withMarkdownNotes(baseDoc))
	.add("Base Button", () => ({
		components: { BaseButton },
		template: "<Button>Hello Button</Button>",
		methods: {},
	}))
	.add("Base Card", () => ({
		components: { BaseCard },
		template: "<Card/>",
		methods: {},
	}))
	.add("Base Icon", () => ({
		components: { BaseIcon },
		template: "<BaseIcon :name='fa-bell'/>",
	}))
	.add("Base Input", () => ({
		components: { BaseInput },
		template: "<BaseInput />",
		methods: {},
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template: "<BaseLink :href='https://www.google.com' :name='test'/>",
		methods: {},
	}));
