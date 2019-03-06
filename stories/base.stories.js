import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import baseDoc from "@docs/components/base.md";

import BaseButton from "@components/ui/BaseButton.vue";
import BaseCard from "@components/ui/BaseCard.vue";
import BaseIcon from "@components/ui/BaseIcon.vue";
import BaseInput from "@components/ui/BaseInput.vue";
import BaseLink from "@components/ui/BaseLink.vue";

storiesOf("Base Components", module)
	.addDecorator(withMarkdownNotes(baseDoc)) // FIX causes "# <story/>" to appear
	.add("Base Button", () => ({
		components: { BaseButton },
		template: "<BaseButton>Hello Button</BaseButton>",
		methods: {},
	}))
	.add("Base Card", () => ({
		components: { BaseCard },
		template: "<BaseCard>Card</BaseCard>",
		methods: {},
	}))
	.add("Base Icon", () => ({
		components: { BaseIcon },
		template: '<BaseIcon icon="trash"/>',
	}))
	.add(
		"Base Input",
		() => ({
			components: { BaseInput },
			data: () => ({ content: "" }),
			template:
				'<BaseInput type="text" label="Vorname" v-model="content" name="firstname"/>',
			methods: {},
		}),
		{ info: {} }
	)
	.add("Base Link", () => ({
		components: { BaseLink },
		template: '<BaseLink href="/" name="test">Link</BaseLink>',
		methods: {},
	}));
