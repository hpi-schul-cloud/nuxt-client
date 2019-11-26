<template>
	<div ref="dialog" data-testid="dialog">
		<base-modal :active.sync="isActive">
			<template v-slot:body>
				<modal-body-info :text="message">
					<template v-slot:icon>
						<base-icon
							v-if="icon"
							slot="icon"
							:source="iconSource"
							:icon="icon"
							:style="`color: ${currentIconColor}`"
						/>
					</template>
				</modal-body-info>
			</template>
			<template v-slot:footerRight>
				<base-button design="text" @click="cancel">
					{{ cancelText }}
				</base-button>
				<base-button :design="actionDesign" @click="confirm">
					{{ confirmText }}
				</base-button>
			</template>
		</base-modal>
	</div>
</template>

<script>
import BaseModal from "../BaseModal";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";

export default {
	components: {
		BaseModal,
		ModalBodyInfo,
	},
	props: {
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
		onCancel: {
			type: Function,
			default: () => {},
		},
		onConfirm: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			isActive: false,
		};
	},
	computed: {
		currentIconColor() {
			return this.iconColor
				? this.iconColor
				: `var(--color-${this.actionDesign})`;
		},
	},
	watch: {
		isActive(to, from) {
			if (from && !to) {
				this.onCancel();
			}
		},
	},
	beforeMount() {
		// Insert the Dialog component in body tag
		this.$nextTick(() => {
			document.body.appendChild(this.$el);
		});
	},
	mounted() {
		this.isActive = true;
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

		/**
		 * Close the Dialog.
		 */
		close() {
			this.isActive = false;
			// Timeout for the animation complete before destroying
			this.$destroy();
			if (typeof this.$el.remove !== "undefined") {
				this.$el.remove();
			} else if (typeof el.parentNode !== "undefined") {
				this.$el.parentNode.removeChild(el);
			}
		},
	},
};
</script>
