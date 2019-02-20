import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import baseDoc from "@docs/components/base.md";

import BaseButton from "@components/ui/BaseButton.vue";
import BaseCard from "@components/ui/BaseCard.vue";
import BaseIcon from "@components/ui/BaseIcon.vue";
import BaseInput from "@components/ui/BaseInput.vue";
import BaseLink from "@components/ui/BaseLink.vue";
import BaseSelect from "@components/ui/BaseSelect.vue";

export const multioptions = [
	{ _id: 1, name: "Option 1" },
	{ _id: 2, name: "Option 2" },
	{ _id: 3, name: "Option 3" },
];

storiesOf("Base Components", module)
	.addDecorator(withMarkdownNotes(baseDoc))
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
	.add("Base Input", () => ({
		components: { BaseInput },
		template:
			'<BaseInput type="text" label="Vorname" v-model="abc" name="firstname"/>',
		methods: {},
	}))
	.add("Base Input Date", () => ({
		components: { BaseInput },
		template: "<BaseInput type='date' label='Datum'/>",
		methods: {},
	}))
	.add("Base Select MultiSelect", () => ({
		components: { BaseSelect },
		template: "<BaseSelect :options='options' track-by='_id' label='name'/>",
		data: () => ({
			options: multioptions,
		}),
		methods: {},
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template: '<BaseLink :href="https://www.google.com" :name="test"/>',
		methods: {},
	}));
