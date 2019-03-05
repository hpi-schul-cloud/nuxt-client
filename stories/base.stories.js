import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import baseDoc from "@docs/components/base.md";

import BaseButton from "@components/ui/BaseButton.vue";
import BaseCard from "@components/ui/BaseCard.vue";
import BaseIcon from "@components/ui/BaseIcon.vue";
import BaseInput from "@components/ui/BaseInput.vue";
import BaseLink from "@components/ui/BaseLink.vue";
import BaseModal from "@components/ui/BaseModal.vue";

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
	.add("Base Link", () => ({
		components: { BaseLink },
		template: '<BaseLink :href="https://www.google.com" :name="test"/>',
		methods: {},
	}))
	.add("Base Modal", () => ({
		components: { BaseModal, BaseButton },
		data: function() {
			return {
				active: false,
			};
		},
		template: `
			<div>
				<BaseButton @click="active = true">
					Open Modal
				</BaseButton>		

				<BaseModal :show-modal="active" @close="active = false">
					<h3 slot="header">custom header</h3>
					<div slot="body">
						Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below.
					</div>
					<div slot="footer">
						<BaseButton class="is-light" @click="active = false">
							OK
						</BaseButton>
					</div>
				</BaseModal>	
			</div>
		`,
		methods: {},
	}));
