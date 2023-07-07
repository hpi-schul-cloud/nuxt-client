<template>
	<div ref="dialog" data-testid="dialog" class="v-application base-dialog">
		<base-modal :active="active" @update:active="clickOutside">
			<template #body>
				<modal-body-info :title="message">
					<template #icon>
						<base-icon
							v-if="icon"
							:source="iconSource"
							:icon="icon"
							:color="currentIconColor"
						/>
					</template>
				</modal-body-info>
			</template>
			<template #footerRight>
				<v-btn
					depressed
					:text="!invertedDesign"
					:dark="invertedDesign"
					:color="!invertedDesign ? 'secondary' : 'success'"
					data-testid="btn-dialog-cancel"
					@click="cancel"
				>
					{{ cancelText }}
				</v-btn>
				<v-btn
					depressed
					:color="invertedDesign ? 'secondary' : 'success'"
					:text="invertedDesign"
					:dark="!invertedDesign"
					data-testid="btn-dialog-confirm"
					@click="confirm"
				>
					{{ confirmText }}
				</v-btn>
			</template>
		</base-modal>
	</div>
</template>

<script>
import BaseModal from "../BaseModal";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo";

export default {
	components: {
		BaseModal,
		ModalBodyInfo,
	},
	props: {
		active: {
			type: Boolean,
		},
		message: {
			type: String,
			default: "",
		},
		icon: {
			type: String,
			default: "",
		},
		iconSource: {
			type: String,
			default: "material",
		},
		iconColor: {
			type: String,
			default: undefined,
		},
		actionDesign: {
			type: String,
			default: "primary",
		},
		confirmText: {
			type: String,
			default: "Bestätigen",
		},
		cancelText: {
			type: String,
			default: "Abbrechen",
		},
		onClickOutside: {
			type: Function,
			default: () => ({}),
		},
		onCancel: {
			type: Function,
			default: () => ({}),
		},
		onConfirm: {
			type: Function,
			default: () => ({}),
		},
		invertedDesign: {
			type: Boolean,
		},
	},
	data() {
		return {};
	},
	computed: {
		currentIconColor() {
			return this.iconColor
				? this.iconColor
				: `var(--v-${this.actionDesign}-base)`;
		},
	},
	methods: {
		/**
		 * If it's a prompt Dialog, validate the input.
		 * Call the onConfirm prop (function) and close the Dialog.
		 */
		confirm() {
			this.onConfirm(this.prompt);
			this.close();
		},
		cancel() {
			this.onCancel(this.prompt);
			this.close();
		},
		clickOutside() {
			this.onClickOutside(this.prompt);
			this.close();
		},

		/**
		 * Close the Dialog.
		 */
		close() {
			this.$emit("update:active", false);
		},
	},
};
</script>

<style lang="scss">
.base-dialog .icon {
	margin-bottom: 24px;
	.v-icon.v-icon {
		font-size: var(--sidebar-item-height);

		svg {
			width: 1em;
			height: 1em;
		}
	}
}
</style>
