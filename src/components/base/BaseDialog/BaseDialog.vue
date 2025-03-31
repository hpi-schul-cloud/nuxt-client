<template>
	<div ref="dialog" data-testid="dialog" class="v-application base-dialog">
		<base-modal v-model:active="isActive">
			<template #body>
				<modal-body-info :title="message">
					<template #icon>
						<v-icon
							v-if="icon"
							:color="currentIconColor"
							class="pb-6"
							size="85"
							>{{ icon }}</v-icon
						>
					</template>
				</modal-body-info>
			</template>
			<template #footerRight>
				<v-btn
					variant="text"
					data-testid="btn-dialog-cancel"
					class="mr-3"
					@click="cancel"
				>
					{{ cancelText }}
				</v-btn>
				<v-btn
					variant="flat"
					color="primary"
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
		iconColor: {
			type: String,
			default: undefined,
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
	},
	emits: ["update:active"],
	data() {
		return {};
	},
	computed: {
		currentIconColor() {
			return this.iconColor ? this.iconColor : "rgba(var(--v-theme-primary))";
		},
		isActive: {
			get() {
				return this.active;
			},
			set(value) {
				if (!value) {
					this.clickOutside();
				}
			},
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
