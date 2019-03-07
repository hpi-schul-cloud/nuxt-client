import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/components/base.md";
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
import BaseModal from "@components/ui/BaseModal.vue";

storiesOf("Base Components", module)
	.addParameters({
		notes,
	})
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
		data: () => ({ content: "" }),
		template:
			'<BaseInput type="text" label="Vorname" v-model="content" name="firstname" placeholder="Max"/>',
		methods: {},
	}))
	.add("Base Input Date", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<BaseInput value="" type="date" v-model="content" label="Datum" placeholder="21.02.2019" name="date"/>',
		methods: {},
	}))
	.add("Base Select MultiSelect", () => ({
		components: { BaseSelect },
		data: () => ({
			content: [],
			options: multioptions,
		}),
		template:
			'<BaseSelect v-model="content" :options="options" track-by="_id" label="name"/>',
		methods: {},
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template: '<BaseLink href="/" name="test">Link</BaseLink>',
		methods: {},
	}))
	.add("Base Modal", () => ({
		components: { BaseModal, BaseButton },
		data: () => ({ active: false }),
		template: outdent`
			<div>
				<BaseButton @click="active = true">
					Open Modal
				</BaseButton>

				<BaseModal :active.sync="active">
					<div class="modal-header">
						<h3>custom header</h3>
					</div>

					<div class="modal-body">
						Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below.
					</div>

					<div class="modal-footer">
						<BaseButton id="button" class="is-light" @click="active = false">
							OK
						</BaseButton>
					</div>
				</BaseModal>
			</div>
		`,
		methods: {},
	}));
